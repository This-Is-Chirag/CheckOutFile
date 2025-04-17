import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICheckOutFileWpProps {
  userDisplayName: string;
  context: WebPartContext;
  userEmail: string;
  libraryName: string;
}
