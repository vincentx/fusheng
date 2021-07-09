import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC } from "react";
import Sidebar from "./components/sidebar";

const App: FC = () => {
  const specs = [
    "spec1",
    "spec2",
    "spec3",
    "spec11",
    "spec22",
    "longlonglonglonglonglonglonglongspec",
    "spec111",
    "spec222",
    "spec333",
  ];

  return (
    <>
      <Sidebar specs={specs} />
      <div className="main">
        <div className="tool-bar">
          <button>Experiment</button>
        </div>
        <div className="content">111</div>
      </div>
    </>
  );
};

export default hot(App);
