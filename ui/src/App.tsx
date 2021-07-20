import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import httpClient from "./utils/httpClient";
import Report from "./components/report";
import ToolBar from "./components/toolbar";

export interface IReport {
  name: string;
  src: string;
}
const App: FC = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [activeReport, setActiveReport] = useState<IReport>();

  useEffect(() => {
    retrieveReports();
  }, []);

  const retrieveReports = () => {
    httpClient
      .get("reports")
      .then((res) => {
        const reports = res.data.reports;
        setReports(reports);
        if (reports.length) {
          setActiveReport(reports[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Sidebar
        reports={reports}
        onClick={setActiveReport}
        active={activeReport}
      />
      <div className="main">
        <ToolBar />
        <div className="main-content">
          {activeReport && <Report src={activeReport.src} />}
        </div>
      </div>
    </>
  );
};

export default hot(App);
