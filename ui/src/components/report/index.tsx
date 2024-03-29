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
  VIEW_EXP = "VIEW_EXP",
}

const Report: FC<{ name: string }> = ({ name }) => {
  const [mode, setMode] = useState(Mode.VIEW);
  const [doc, setDoc] = useState("");
  const [experiments, setExperiments] = useState<string[]>([]);

  useEffect(() => {
    setMode(Mode.VIEW);
    getReportAndExperiments();
  }, [name]);

  const getReportAndExperiments = () => {
    httpClient
      .get(`/reports/${name}`)
      .then(({ data }) => {
        setDoc(data);
        setMode(Mode.VIEW);
        httpClient
          .get(`/specs/${name}/experiments`)
          .then((res) => {
            setExperiments(res.data.split(", "));
          })
          .catch((err) => {
            setExperiments([]);
            toast.error(`Unable to get past experiments due to ${err.message}`);
          });
      })
      .catch((err) => {
        toast.error(`Unable to get reports due to ${err.message}`);
      });
  };

  const onGoToViewExp = (expId: string, specId: string) => {
    httpClient
      .get(`/experiments/${expId}`)
      .then(({ data }) => {
        setDoc(data);
        setMode(Mode.VIEW_EXP);
      })
      .catch((err) => {
        toast.error(`Unable to get experiment due to ${err.message}`);
      });
  };

  const onGoToViewMode = () => {
    const iframe = (document.getElementById(IFRAME_ID) as HTMLIFrameElement)
      .contentWindow!.document;
    covertEnhancedToSpec(iframe);

    httpClient
      .post(
        `/experiments/${name}`,
        iframe.getElementsByTagName("html")[0].innerHTML,
        { headers: { "Content-Type": HTML_CONTENT } },
      )
      .then(() => {
        toast.success(
          "Your experiment has been triggered. It might takes some time to run this test, you'll able to see the report once it's finished.",
        );
      })
      .catch((err) =>
        toast.error(`Unable to submit experiment due to ${err.message}`),
      )
      .finally(getReportAndExperiments);
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
        experiments={experiments}
        onGoToViewExp={onGoToViewExp}
        specName={name}
      />
      <div className="report-wrapper">
        <iframe className="report" id={IFRAME_ID} srcDoc={doc} />
      </div>
    </>
  );
};

export default hot(Report);
