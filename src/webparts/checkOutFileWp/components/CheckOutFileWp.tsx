import * as React from "react";
import type { ICheckOutFileWpProps } from "./ICheckOutFileWpProps";
import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";

import { SanitizeDataItemArray } from "./SanitizeDataModel";

// import { Guid } from "@microsoft/sp-core-library";

const CheckOutFileWp: React.FC<ICheckOutFileWpProps> = ({
  context,
  libraryName,
  userEmail,
}) => {
  const getRequestDigestValue = async (context: any): Promise<string> => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/contextinfo`;

    const httpClientOptions: IHttpClientOptions = {
      method: "POST",
      headers: new Headers({
        Accept: "application/json;odata=nometadata",
      }),
    };

    try {
      const response: HttpClientResponse = await context.httpClient.post(
        url,
        HttpClient.configurations.v1,
        httpClientOptions
      );

      if (response.ok) {
        const data = await response.json();
        return data.FormDigestValue; // This is the Request Digest value
      } else {
        console.error(
          "Failed to retrieve Request Digest value:",
          response.statusText
        );
        throw new Error("Failed to retrieve Request Digest value");
      }
    } catch (error) {
      console.error("Error fetching Request Digest value:", error);
      throw error;
    }
  };

  const checkOutFiles = async (items: SanitizeDataItemArray) => {
    const requestDigestValue = await getRequestDigestValue(context);

    for (const item of items) {
      const fileRef = item.FileRef;
      const url = `${context.pageContext.web.absoluteUrl}/_api/web/GetFileByServerRelativeUrl('${fileRef}')/CheckOut()`;

      const httpClientOptions: IHttpClientOptions = {
        headers: new Headers({
          Accept: "application/json;odata=nometadata",
          "X-RequestDigest": requestDigestValue,
        }),
        method: "POST",
      };

      try {
        const response: HttpClientResponse = await context.httpClient.post(
          url,
          HttpClient.configurations.v1,
          httpClientOptions
        );

        if (response.ok) {
          console.log(`File checked out successfully: ${fileRef}`);
        } else {
          console.error(`Failed to check out file: ${fileRef}`, response.statusText);
          throw new Error(`Failed to check out file: ${fileRef}`);
        }
      } catch (error) {
        console.error("Error checking out file:", error);
        throw error;
      }
    }
  };

  // const checkOutFilesbatch = async (items: SanitizeDataItemArray) => {
  //   const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/$batch`;
  //   const requestDigestValue = await getRequestDigestValue(context);
  //   const batchBoundary = `batch_${Guid.newGuid()}`;
  //   const CRLF = "\r\n";
  
  //   const batchBody = items
  //     .map((item) => {
  //       const fileRef = item.FileRef;
  //       return [
  //         `--${batchBoundary}`,
  //         "Content-Type: application/http",
  //         "Content-Transfer-Encoding: binary",
  //         "",
  //         `POST /_api/web/GetFileByServerRelativeUrl('${fileRef}')/CheckOut() HTTP/1.1`,
  //         "Content-Type: application/json;odata=nometadata",
  //         "Accept: application/json;odata=nometadata",
  //         `X-RequestDigest: ${requestDigestValue}`,
  //         "",
  //         ""
  //       ].join(CRLF);
  //     })
  //     .join("") + `--${batchBoundary}--`;
  
  //   const httpClientOptions: IHttpClientOptions = {
  //     headers: new Headers({
  //       "Content-Type": `multipart/mixed;boundary=${batchBoundary}`,
  //       Accept: "application/json;odata=nometadata",
  //       "X-RequestDigest": requestDigestValue
  //     }),
  //     body: batchBody,
  //     method: "POST"
  //   };
  
  //   try {
  //     console.log("Batch Body:", batchBody); // For debugging
  //     const response: HttpClientResponse = await context.httpClient.post(
  //       batchUrl,
  //       HttpClient.configurations.v1,
  //       httpClientOptions
  //     );
  //     const responseText = await response.text();
  //     if (response.ok) {
  //       console.log("Batch response:", responseText);
  //     } else {
  //       console.error("Failed to batch check out files:", responseText);
  //     }
  //   } catch (error) {
  //     console.error("Error in batch request:", error);
  //   }
  // };

  const fetchData = async () => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=OData__ModerationStatus,Title,FileRef,FileLeafRef,File_x0020_Type,ID,ContactPerson/EMail,ContactPerson/Title&$expand=ContactPerson&$filter=ContactPerson/EMail eq '${userEmail}' and OData__ModerationStatus eq 1&$top=1000`;

    //0 = Approved, 1 = Rejected, 2 = Pending, 3 = Draft

    const httpClientOptions: IHttpClientOptions = {
      headers: new Headers({
        Accept: "application/json;odata=nometadata",
      }),
    };

    try {
      const response: HttpClientResponse = await context.httpClient.get(
        url,
        HttpClient.configurations.v1,
        httpClientOptions
      );
      if (!response.ok) {
        console.error("Error fetching data: ", response.statusText);
        return;
      }
      const data = await response.json();
      const items: SanitizeDataItemArray = data.value;
      checkOutFiles(items);
      // testSingleCheckOut(items[0].FileRef); // checking out a single file
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return <div></div>;
};

export default CheckOutFileWp;
