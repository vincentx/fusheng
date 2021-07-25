import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useState } from "react";
import Sidebar from "./components/Sidebar";
import Report from "./components/report";
import { useReports } from "./hooks/useReports";

export interface IReport {
  name: string;
  src: string;
}
const App: FC = () => {
  const [activeReport, setActiveReport] = useState<IReport>();
  const { reports } = useReports();

  return (
    <>
      <Sidebar
        reports={reports}
        onClick={setActiveReport}
        active={activeReport}
      />
      <div className="main">
        <div className="main-content">
          {activeReport && <Report name={activeReport.name} />}
        </div>
      </div>
    </>
  );
};

export default hot(App);
