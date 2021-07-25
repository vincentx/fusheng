import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./style.scss";
import { Mode } from "../report";

interface ToolBarProps {
  mode: Mode;
  setMode: (mode: Mode) => unknown;
}

const ToolBar: FC<ToolBarProps> = ({ mode, setMode }) => {
  const modeConfig = {
    VIEW: {
      actionButton: {
        displayText: "Experiment",
        icon: "edit",
        onClick: () => setMode(Mode.EXPERIMENT),
      },
    },
    EXPERIMENT: {
      actionButton: {
        displayText: "Try it out",
        icon: "edit",
        onClick: () => setMode(Mode.VIEW),
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
