import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./style.scss";

interface ReportProps {
  src: string;
}
const Report: FC<ReportProps> = ({ src }) => {
  return <iframe src={src} className="report" />;
};

export default hot(Report);
