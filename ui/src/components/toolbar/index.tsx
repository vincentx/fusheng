import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./style.scss";
import { Mode } from "../report";

interface ToolBarProps {
  mode: Mode;
  toViewMode: () => unknown;
  toExperimentMode: () => unknown;
}

const ToolBar: FC<ToolBarProps> = ({ mode, toViewMode, toExperimentMode }) => {
  const modeConfig = {
    VIEW: {
      actionButton: {
        displayText: "Experiment",
        icon: "edit",
        onClick: toExperimentMode,
      },
    },
    EXPERIMENT: {
      actionButton: {
        displayText: "Try it out",
        icon: "play_arrow",
        onClick: toViewMode,
      },
    },
  };
  const { actionButton } = modeConfig[mode];

  return (
    <>
      <div className="toolbar" data-testid="toolbar">
        <button
          className="button"
          onClick={actionButton.onClick}
          data-testid={`actionButton-${Mode}`}
        >
          <div className="button-wrapper">
            <span className="material-icons icon">{actionButton.icon}</span>
            <span>{actionButton.displayText}</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default hot(ToolBar);
