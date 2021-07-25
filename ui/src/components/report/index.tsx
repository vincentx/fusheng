import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useState } from "react";
import "./style.scss";
import ToolBar from "../toolbar";

interface ReportProps {
  src: string;
}

export enum Mode {
  VIEW = "VIEW",
  EXPERIMENT = "EXPERIMENT",
}

const Report: FC<ReportProps> = ({ src }) => {
  const [mode, setMode] = useState(Mode.VIEW);

  return (
    <>
      <ToolBar mode={mode} setMode={setMode} />
      <iframe src={src} className="report" />
    </>
  );
};

export default hot(Report);
