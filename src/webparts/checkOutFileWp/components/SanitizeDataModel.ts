export type SanitizeDataItem = {
  OData__ModerationStatus: 0 | 1 | 2 | 3; // 0 = Approved, 1 = Rejected, 2 = Pending, 3 = Draft
  Title: string;
  FileRef: string;
  FileLeafRef: string;
  File_x0020_Type: string;
  ID: number;
  ContactPerson: {
    EMail: string;
    Title: string;
  };
};
export type SanitizeDataItemArray = SanitizeDataItem[];
