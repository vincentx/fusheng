import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import httpClient from "./utils/httpClient";
import Report from "./components/report";
import { REPORTS_RESOURCE_PATH } from "./utils/constant";

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
      .get(REPORTS_RESOURCE_PATH)
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
        <div className="main-content">
          {activeReport && <Report src={activeReport.src} />}
        </div>
      </div>
    </>
  );
};

export default hot(App);
