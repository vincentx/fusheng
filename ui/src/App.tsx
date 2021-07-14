import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import httpClient from "./utils/httpClient";
import Report from "./components/Report";

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
      .get("specs")
      .then((res) => {
        const reports = res.data.specs;
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
        {activeReport && <Report src={activeReport.src} />}
      </div>
    </>
  );
};

export default hot(App);
