import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./style.scss";

const ToolBar: FC = () => {
  return (
    <>
      <div className="toolbar" data-testid="toolbar">
        <button className="button">
          <div className="button-wrapper">
            <span className="material-icons icon">edit</span>
            <span>Experiment</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default hot(ToolBar);
