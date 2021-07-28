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
  experiments: string[];
}

const ToolBar: FC<ToolBarProps> = ({
  mode,
  toViewMode,
  toExperimentMode,
  experiments,
}) => {
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
          className="toolbar-item"
          onClick={actionButton.onClick}
          data-testid={`actionButton-${mode}`}
        >
          <div className="button-wrapper">
            {actionButton.icon}
            <span>{actionButton.displayText}</span>
          </div>
        </button>

        {!!experiments.length && (
          <span className="toolbar-item">
            <div className="button-wrapper">
              {actionButton.icon}
              <select className="dropdown">
                {experiments.map((exp) => (
                  <option key={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </span>
        )}
      </div>
    </>
  );
};

export default hot(ToolBar);
