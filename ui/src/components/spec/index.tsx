import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./spec.scss";

interface SpecProps {
  src: string;
}
const Spec: FC<SpecProps> = ({ src }) => {
  return <iframe src={src} className="spec" />;
};

export default hot(Spec);
