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

const Report: FC<ReportProps> = ({ name }) => {
  const [mode, setMode] = useState(Mode.VIEW);
  const [src, setSrc] = useState(`${process.env.SERVER_HOST}/reports/${name}`);

  useEffect(() => {
    setMode(Mode.VIEW);
    setSrc(`${process.env.SERVER_HOST}/reports/${name}`);
  }, [name]);

  useEffect(() => {
    if (mode === Mode.EXPERIMENT) {
      setSrc(`${process.env.SERVER_HOST}/specs/${name}`);
    } else {
      setSrc(`${process.env.SERVER_HOST}/reports/${name}`);
    }
  }, [mode]);

  return (
    <>
      <ToolBar mode={mode} setMode={setMode} />
      <div className="report-wrapper">
        <iframe src={src} className="report" id="report-iframe" />
      </div>
    </>
  );
};

export default hot(Report);
