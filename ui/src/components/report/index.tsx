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
import { toast } from "react-toastify";

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

const covertEnhancedToSpec = (myDocument: Document) => {
  while (myDocument.getElementsByClassName(ENHANCE_CLASS).length) {
    const enhancedInput = myDocument.getElementsByClassName(
      ENHANCE_CLASS,
    )[0] as HTMLInputElement;
    const inputValue = enhancedInput.value;
    const enhanceId = enhancedInput.getAttributeNS(ENHANCE_NS, ENHANCE_ID);
    enhancedInput.remove();
    const original = myDocument.querySelector(
      `[${ENHANCE_ID}="${enhanceId}"]`,
    ) as HTMLElement;
    original.removeAttributeNS(ENHANCE_NS, ENHANCE_ID);
    original.innerHTML = inputValue;
    original.style.removeProperty("display");
  }
};

const Report: FC<ReportProps> = ({ name }) => {
  const [mode, setMode] = useState(Mode.VIEW);
  const [doc, setDoc] = useState("");

  useEffect(() => {
    setMode(Mode.VIEW);
    getReports();
  }, [name]);

  const getReports = () => {
    httpClient
      .get(`/reports/${name}`)
      .then(({ data }) => {
        setDoc(data);
        setMode(Mode.VIEW);
      })
      .catch((err) => {
        toast.error(`Unable to get reports due to ${err.message}`);
      });
  };

  const onGoToViewMode = () => {
    const iframe = (document.getElementById(IFRAME_ID) as HTMLIFrameElement)
      .innerHTML;
    const iframeDocCopy = new DOMParser().parseFromString(iframe, HTML_CONTENT);

    covertEnhancedToSpec(iframeDocCopy);

    httpClient
      .post(
        `/experiments/${name}`,
        iframeDocCopy.getElementsByTagName("html")[0].innerHTML,
        { headers: { "Content-Type": HTML_CONTENT } },
      )
      .then(() => {
        toast.success(
          "Your experiment has been triggered. It might takes some time to run this test, you'll able to see the report once it's finished.",
        );
        getReports();
      })
      .catch((err) =>
        toast.error(`Unable to submit experiment due to ${err.message}`),
      );
  };

  const onGoToExperimentMode = () => {
    httpClient
      .get(`/specs/${name}`)
      .then(({ data }) => {
        const doc = new DOMParser().parseFromString(data, HTML_CONTENT);
        enhance2InputBox(doc);
        setDoc(doc.getElementsByTagName("html")[0].innerHTML);
        setMode(Mode.EXPERIMENT);
      })
      .catch((err) => {
        toast.error(`Unable to get specs due to ${err.message}`);
      });
  };

  return (
    <>
      <ToolBar
        mode={mode}
        toViewMode={onGoToViewMode}
        toExperimentMode={onGoToExperimentMode}
      />
      <div className="report-wrapper">
        <iframe className="report" id={IFRAME_ID} srcDoc={doc} />
      </div>
    </>
  );
};

export default hot(Report);
