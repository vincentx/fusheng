import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import "./style.scss";
import { IReport } from "../../App";
import classNames from "classnames";

interface SidebarProps {
  reports: IReport[];
  onClick: (report: IReport) => void;
  active: IReport | undefined;
}
const Index: FC<SidebarProps> = ({ reports, onClick, active }) => {
  return (
    <>
      <div className="sidebar" data-testid="sidebar">
        <div className="title">FUSHENG</div>
        <div className="sidebar-content">
          {reports.map((report) => (
            <div
              className={classNames("sidebar-item-wrapper", {
                focus: active?.name === report.name,
              })}
              key={report.name}
              onClick={() => {
                onClick(report);
              }}
              data-testid={`sidebar-${report.name}`}
            >
              <div className="sidebar-item">
                <p>{report.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default hot(Index);
