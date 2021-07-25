import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import "./style.scss";
import ToolBar from "../toolbar";
import httpClient from "../../utils/httpClient";

interface ReportProps {
  name: string;
}

export enum Mode {
  VIEW = "VIEW",
  EXPERIMENT = "EXPERIMENT",
}

const enhance2InputBox = (myDocument: Document) => {
  const elements = myDocument.getElementsByClassName(
    "variable",
  ) as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < elements.length; i++) {
    const originalInput = elements[i];
    originalInput.insertAdjacentElement(
      "beforebegin",
      createEnhancedInputBox(originalInput, myDocument),
    );
    originalInput.style.display = "none";
  }
};

const createEnhancedInputBox = (
  originalInput: Element,
  myDocument: Document,
) => {
  const newInputBox = myDocument.createElement("input");
  newInputBox.defaultValue = originalInput.innerHTML;
  return newInputBox;
};

const Report: FC<ReportProps> = ({ name }) => {
  const [mode, setMode] = useState(Mode.VIEW);
  const [doc, setDoc] = useState("");
  const isViewMode = mode === Mode.VIEW;

  useEffect(() => {
    setMode(Mode.VIEW);
  }, [name]);

  useEffect(() => {
    httpClient
      .get(isViewMode ? `/reports/${name}` : `/specs/${name}`)
      .then((res) => {
        if (isViewMode) {
          setDoc(res.data);
        } else {
          const doc = new DOMParser().parseFromString(res.data, "text/html");
          enhance2InputBox(doc);
          setDoc(doc.getElementsByTagName("html")[0].innerHTML);
        }
      });
  }, [mode]);

  return (
    <>
      <ToolBar mode={mode} setMode={setMode} />
      <div className="report-wrapper">
        <iframe className="report" srcDoc={doc} />
      </div>
    </>
  );
};

export default hot(Report);
