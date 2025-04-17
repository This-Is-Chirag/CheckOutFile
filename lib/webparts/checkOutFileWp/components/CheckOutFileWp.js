var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import { HttpClient, } from "@microsoft/sp-http";
// import { Guid } from "@microsoft/sp-core-library";
var CheckOutFileWp = function (_a) {
    var context = _a.context, libraryName = _a.libraryName, userEmail = _a.userEmail;
    var getRequestDigestValue = function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var url, httpClientOptions, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(context.pageContext.web.absoluteUrl, "/_api/contextinfo");
                    httpClientOptions = {
                        method: "POST",
                        headers: new Headers({
                            Accept: "application/json;odata=nometadata",
                        }),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, context.httpClient.post(url, HttpClient.configurations.v1, httpClientOptions)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data.FormDigestValue]; // This is the Request Digest value
                case 4:
                    console.error("Failed to retrieve Request Digest value:", response.statusText);
                    throw new Error("Failed to retrieve Request Digest value");
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Error fetching Request Digest value:", error_1);
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var checkOutFiles = function (items) { return __awaiter(void 0, void 0, void 0, function () {
        var requestDigestValue, _i, items_1, item, fileRef, url, httpClientOptions, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRequestDigestValue(context)];
                case 1:
                    requestDigestValue = _a.sent();
                    _i = 0, items_1 = items;
                    _a.label = 2;
                case 2:
                    if (!(_i < items_1.length)) return [3 /*break*/, 7];
                    item = items_1[_i];
                    fileRef = item.FileRef;
                    url = "".concat(context.pageContext.web.absoluteUrl, "/_api/web/GetFileByServerRelativeUrl('").concat(fileRef, "')/CheckOut()");
                    httpClientOptions = {
                        headers: new Headers({
                            Accept: "application/json;odata=nometadata",
                            "X-RequestDigest": requestDigestValue,
                        }),
                        method: "POST",
                    };
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, context.httpClient.post(url, HttpClient.configurations.v1, httpClientOptions)];
                case 4:
                    response = _a.sent();
                    if (response.ok) {
                        console.log("File checked out successfully: ".concat(fileRef));
                    }
                    else {
                        console.error("Failed to check out file: ".concat(fileRef), response.statusText);
                        throw new Error("Failed to check out file: ".concat(fileRef));
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error("Error checking out file:", error_2);
                    throw error_2;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    }); };
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
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var url, httpClientOptions, response, data, items, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(context.pageContext.web.absoluteUrl, "/_api/web/lists/getbytitle('").concat(libraryName, "')/items?$select=OData__ModerationStatus,Title,FileRef,FileLeafRef,File_x0020_Type,ID,ContactPerson/EMail,ContactPerson/Title&$expand=ContactPerson&$filter=ContactPerson/EMail eq '").concat(userEmail, "' and OData__ModerationStatus eq 1&$top=1000");
                    httpClientOptions = {
                        headers: new Headers({
                            Accept: "application/json;odata=nometadata",
                        }),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, context.httpClient.get(url, HttpClient.configurations.v1, httpClientOptions)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error("Error fetching data: ", response.statusText);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    items = data.value;
                    checkOutFiles(items);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error fetching data: ", error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        fetchData();
    }, []);
    return React.createElement("div", null);
};
export default CheckOutFileWp;
//# sourceMappingURL=CheckOutFileWp.js.map