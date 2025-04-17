import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
export interface ICheckOutFileWpWebPartProps {
    description: string;
}
export default class CheckOutFileWpWebPart extends BaseClientSideWebPart<ICheckOutFileWpWebPartProps> {
    private libraryName;
    render(): void;
    onInit(): Promise<void>;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=CheckOutFileWpWebPart.d.ts.map