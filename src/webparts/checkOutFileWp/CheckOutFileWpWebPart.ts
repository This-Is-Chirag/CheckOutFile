import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "CheckOutFileWpWebPartStrings";
import CheckOutFileWp from "./components/CheckOutFileWp";
import { ICheckOutFileWpProps } from "./components/ICheckOutFileWpProps";

export interface ICheckOutFileWpWebPartProps {
  description: string;
}

export default class CheckOutFileWpWebPart extends BaseClientSideWebPart<ICheckOutFileWpWebPartProps> {
  private libraryName: string = "Master Project Assets - Sandbox";
  public render(): void {
    const element: React.ReactElement<ICheckOutFileWpProps> =
      React.createElement(CheckOutFileWp, {
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        userEmail: this.context.pageContext.user.email,
        libraryName: this.libraryName,
      });

    ReactDom.render(element, this.domElement);
  }

  public async onInit(): Promise<void> {}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
