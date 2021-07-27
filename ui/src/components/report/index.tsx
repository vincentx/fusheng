import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import "./style.scss";
import ToolBar from "../toolbar";
import httpClient from "../../utils/httpClient";
import { HTML_CONTENT, IFRAME_ID } from "../../utils/constant";
import { toast } from "react-toastify";
import {
  covertEnhancedToSpec,
  enhance2InputBox,
} from "../../utils/enhanchement";

export enum Mode {
  VIEW = "VIEW",
  EXPERIMENT = "EXPERIMENT",
}

const Report: FC<{ name: string }> = ({ name }) => {
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
