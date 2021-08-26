import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useState } from "react";
import "./style.scss";
import { Mode } from "../report";
import { Edit, PlayArrow, ArrowDropDown, ArrowLeft } from "@material-ui/icons";
import { MenuItem, Menu } from "@material-ui/core";
interface ToolBarProps {
  mode: Mode;
  toViewMode: () => unknown;
  toExperimentMode: () => unknown;
  experiments: string[];
  onGoToViewExp: (expId: string, specId: string) => unknown;
  specName: string;
}

const ToolBar: FC<ToolBarProps> = ({
  mode,
  toViewMode,
  toExperimentMode,
  onGoToViewExp,
  experiments,
  specName,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(undefined);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const openExpSelection = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSelect = (event) => {
    const experiment = event.target.textContent;
    setSelected(experiment);
    onGoToViewExp(experiment, specName);
    setAnchorEl(null);
  };

  const modeConfig = {
    VIEW: {
      actionButton: {
        displayText: "Experiment",
        icon: <Edit className="icon" />,
        onClick: () => {
          setSelected(undefined);
          toExperimentMode();
        },
      },
    },
    EXPERIMENT: {
      actionButton: {
        displayText: "Try it out",
        icon: <PlayArrow />,
        onClick: toViewMode,
      },
    },
    VIEW_EXP: {
      actionButton: {
        displayText: "View Original",
        icon: <ArrowLeft />,
        onClick: () => {
          setSelected(undefined);
          toViewMode();
        },
      },
    },
  };

  const { actionButton } = modeConfig[mode];
  const showExpSelection =
    experiments.length &&
    experiments.length === 1 &&
    experiments[0] !== selected;

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

        {showExpSelection && (
          <>
            <button
              className="toolbar-item"
              onClick={openExpSelection}
              data-testid={`actionButton-select-experiments`}
            >
              <div className="button-wrapper">
                <ArrowDropDown />
                <span>{selected || "Finished Experiments"}</span>
              </div>
            </button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              {experiments.map((exp) => (
                <MenuItem
                  key={exp}
                  onClick={onSelect}
                  selected={selected === exp}
                >
                  {exp}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </div>
    </>
  );
};

export default hot(ToolBar);
