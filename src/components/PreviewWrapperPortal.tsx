import * as React from "react";
import * as ReactDOM from "react-dom";
import { Renderable } from "@storybook/react";
import Iframe from "./Iframe";

const previewIframeId = "storybook-preview-iframe";

export interface PreviewWrapperPortalProps {
  render: (iframe: Renderable) => any;
  isEnabled: boolean;
  width: number;
  height: number;
}

export interface PreviewWrapperPortalState {
  previewWrapperDiv: HTMLDivElement | null;
  iframeSrc: string;
}

class PreviewWrapperPortal extends React.Component<
  PreviewWrapperPortalProps,
  PreviewWrapperPortalState
> {
  state = { previewWrapperDiv: null, iframeSrc: "" };

  async componentDidMount() {
    const previewWrapperDiv = await this.findPreviewWrapperDiv();
    const iframeSrc = this.getIframeSrc();
    await this.removeOriginalIframeElement(previewWrapperDiv);

    this.setState({ previewWrapperDiv, iframeSrc });
  }

  private findPreviewWrapperDiv = (): Promise<HTMLDivElement> =>
    new Promise(resolve => {
      // Find the div element in the Storybook preview area that wraps the
      // component preview iframe. We set an interval to allow time for Storybook
      // to complete its initial render.
      const interval = window.setInterval(() => {
        const previewIframe = document.getElementById(previewIframeId);
        if (previewIframe !== null && previewIframe.parentElement !== null) {
          clearInterval(interval);

          resolve(previewIframe.parentElement as HTMLDivElement);
        }
      }, 10);
    });

  private getIframeSrc = (): string =>
    (document.getElementById(previewIframeId) as HTMLIFrameElement)!.src;

  private removeOriginalIframeElement = (
    previewWrapperDiv: HTMLDivElement,
  ): Promise<{}> =>
    new Promise(resolve => {
      setTimeout(() => {
        const originalIframe = document.getElementById(previewIframeId)!;
        previewWrapperDiv.removeChild(originalIframe);
        resolve();
      }, 1);
    });

  render() {
    if (this.state.previewWrapperDiv === null) return null;

    return ReactDOM.createPortal(
      this.props.render(
        <Iframe
          src={this.state.iframeSrc}
          isEnabled={this.props.isEnabled}
          width={this.props.width}
          height={this.props.height}
        />,
      ),
      this.state.previewWrapperDiv!,
    );
  }
}

export default PreviewWrapperPortal;
