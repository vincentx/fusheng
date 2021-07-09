import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./sidebar.scss";
import { Spec } from "../../App";
import classNames from "classnames";

interface SidebarProps {
  specs: Spec[];
  onClick: (spec: Spec) => void;
  activeSpec: Spec | undefined;
}
const Index: FC<SidebarProps> = ({ specs, onClick, activeSpec }) => {
  return (
    <>
      <div className="sidebar">
        <div className="title">FUSHENG</div>
        {specs.map((spec) => (
          <div
            className={classNames("sidebar-item-wrapper", {
              focus: activeSpec?.name === spec.name,
            })}
            key={spec.name}
            onClick={() => {
              onClick(spec);
            }}
          >
            <div className="sidebar-item">
              <p>{spec.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default hot(Index);
