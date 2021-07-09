import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./sidebar.scss";

interface SidebarProps {
  specs: string[];
}
const Index: FC<SidebarProps> = ({ specs }) => {
  return (
    <>
      <div className="sidebar">
        <div className="title">FUSHENG</div>
        {specs.map((spec) => (
          <div className="sidebar-item-wrapper" id={spec}>
            <div className="sidebar-item">
              <p>{spec}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default hot(Index);
