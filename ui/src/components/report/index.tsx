import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import "./style.scss";
import ToolBar from "../toolbar";

interface ReportProps {
  name: string;
}

export enum Mode {
  VIEW = "VIEW",
  EXPERIMENT = "EXPERIMENT",
}

const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
  input !== null && input.tagName === "IFRAME";

const enhance2InputBox = (iframe: Document) => {
  const elements = iframe.getElementsByClassName("variable");
  for (let i = 0; i < elements.length; i++) {
    const originalInput = elements[i];
    originalInput.insertAdjacentElement(
      "beforebegin",
      createEnhancedInputBox(originalInput, iframe),
    );
    originalInput.className = `${originalInput.className} enhanced`;
  }
};

const createEnhancedInputBox = (originalInput: Element, iframe: Document) => {
  const newInputBox = iframe.createElement("input");
  newInputBox.defaultValue = originalInput.innerHTML;
  newInputBox.className = "enhance";
  return newInputBox;
};

const Report: FC<ReportProps> = ({ name }) => {
  const [mode, setMode] = useState(Mode.VIEW);
  const src =
    mode === Mode.VIEW
      ? `${process.env.SERVER_HOST}/reports/${name}`
      : `${process.env.SERVER_HOST}/specs/${name}`;

  useEffect(() => {
    setMode(Mode.VIEW);
  }, [name]);

  console.log(mode, name, src);

  useEffect(() => {
    const iframe = document.getElementById("report-iframe");
    if (mode === Mode.EXPERIMENT && isIFrame(iframe) && iframe.contentWindow) {
      const iFrameDocument = iframe.contentWindow.document;
      enhance2InputBox(iFrameDocument);
    }
  }, [mode]);

  return (
    <>
      <ToolBar mode={mode} setMode={setMode} />
      <div className="report-wrapper">
        <iframe className="report" id="report-iframe" src={src} />
      </div>
    </>
  );
};

export default hot(Report);
