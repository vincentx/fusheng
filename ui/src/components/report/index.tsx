import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import "./style.scss";
import ToolBar from "../toolbar";
import httpClient from "../../utils/httpClient";
import {
  ENHANCE_CLASS,
  ENHANCE_ID,
  ENHANCE_NS,
  HTML_CONTENT,
  IFRAME_ID,
  INPUT_CLASS,
  INSERT_POSITION,
} from "../../utils/constant";
import { v4 as uuidv4 } from "uuid";

interface ReportProps {
  name: string;
}

export enum Mode {
  VIEW = "VIEW",
  EXPERIMENT = "EXPERIMENT",
}

const enhance2InputBox = (myDocument: Document) => {
  const elements = myDocument.getElementsByClassName(
    INPUT_CLASS,
  ) as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < elements.length; i++) {
    const enhanceId = uuidv4();
    const originalInput = elements[i];
    originalInput.insertAdjacentElement(
      INSERT_POSITION,
      createEnhancedInputBox(originalInput, myDocument, enhanceId),
    );
    originalInput.style.display = "none";
    originalInput.setAttributeNS(ENHANCE_NS, ENHANCE_ID, enhanceId);
  }
};

const createEnhancedInputBox = (
  originalInput: Element,
  myDocument: Document,
  enhanceId: string,
) => {
  const newInputBox = myDocument.createElement("input");
  newInputBox.defaultValue = originalInput.innerHTML;
  newInputBox.className = ENHANCE_CLASS;
  newInputBox.setAttributeNS(ENHANCE_NS, ENHANCE_ID, enhanceId);
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
          const doc = new DOMParser().parseFromString(res.data, HTML_CONTENT);
          enhance2InputBox(doc);
          setDoc(doc.getElementsByTagName("html")[0].innerHTML);
        }
      });
  }, [mode, name]);

  return (
    <>
      <ToolBar mode={mode} setMode={setMode} name={name} />
      <div className="report-wrapper">
        <iframe className="report" id={IFRAME_ID} srcDoc={doc} />
      </div>
    </>
  );
};

export default hot(Report);
