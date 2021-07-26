import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useState } from "react";
import Sidebar from "./components/Sidebar";
import Report from "./components/report";
import { useReports } from "./hooks/useReports";
import "react-toastify/dist/ReactToastify.css";
import { cssTransition, ToastContainer } from "react-toastify";
import "animate.css/animate.min.css";

export interface IReport {
  name: string;
  src: string;
}
const App: FC = () => {
  const [activeReport, setActiveReport] = useState<IReport>();
  const { reports } = useReports();

  return (
    <>
      <ToastContainer
        position={"bottom-right"}
        hideProgressBar={true}
        autoClose={5000}
        limit={3}
        newestOnTop
        transition={cssTransition({
          enter: "animate__animated animate__fadeInRight",
          exit: "animate__animated animate__fadeOutRight",
        })}
      />
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
