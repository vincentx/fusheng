import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import httpClient from "./utils/httpClient";

const App: FC = () => {
  console.log(process.env.SERVER_HOST);
  const [specs, setSpecs] = useState<string[]>([]);
  useEffect(() => {
    retrieveSpecs();
  }, []);

  const retrieveSpecs = () => {
    httpClient
      .get("specs")
      .then((res) => {
        setSpecs(res.data.specs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
