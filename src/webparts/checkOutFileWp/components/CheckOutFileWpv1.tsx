import * as React from "react";

import { ICheckOutFileWpProps } from "./ICheckOutFileWpProps";
import { getSP } from "../../../PnpConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/files";
import { SPFI } from "@pnp/sp";
const CheckOutFileWpv1: React.FC<ICheckOutFileWpProps> = ({
  libraryName,
  userEmail,
}) => {
  const LOG_SOURCE = "CheckOutFileWp";
  const sp: SPFI = getSP();

  const getFilesAndCheckout = async () => {
    try {
      const files = await sp.web.lists
        .getByTitle(libraryName)
        .items.select(
          "Title",
          "OData__ModerationStatus",
          "FileLeafRef",
          "FileRef",
          "File_x0020_Type",
          "ID",
          "ContactPerson/EMail"
        )
        .expand("ContactPerson")
        .filter(
          `OData__ModerationStatus eq 1 and ContactPerson/EMail eq '${userEmail}'`
        )();

      console.info(`${LOG_SOURCE} - Files to checkout: ${files}`);

      // Batch checkout requests (POST)
      if (files.length > 0) {
        const [batchedWeb, executeBatch] = sp.web.batched();
        files.forEach((item) => {
          batchedWeb.getFileByServerRelativePath(item.FileRef).checkout();
        });
        await executeBatch();
        console.info(`${LOG_SOURCE} - Files checked out successfully`);
        window.location.reload();
      }
    } catch (error) {
      console.error(`${LOG_SOURCE} - Error checking out files: ${error}`);
    }
  };

  React.useEffect(() => {
    getFilesAndCheckout();
  }, []);

  return <></>;
};

export default CheckOutFileWpv1;
