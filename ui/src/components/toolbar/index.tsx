import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./style.scss";
import { Mode } from "../report";
import { Edit, PlayArrow } from "@material-ui/icons";

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
        icon: <Edit className="icon" />,
        onClick: toExperimentMode,
      },
    },
    EXPERIMENT: {
      actionButton: {
        displayText: "Try it out",
        icon: <PlayArrow />,
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
          data-testid={`actionButton-${mode}`}
        >
          <div className="button-wrapper">
            {actionButton.icon}
            <span>{actionButton.displayText}</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default hot(ToolBar);
