import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FC, useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import httpClient from "./utils/httpClient";
import Spec from "./components/spec";

export interface Spec {
  name: string;
  src: string;
}
const App: FC = () => {
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [activeSpec, setActiveSpec] = useState<Spec>();

  useEffect(() => {
    retrieveSpecs();
  }, []);

  const retrieveSpecs = () => {
    httpClient
      .get("specs")
      .then((res) => {
        const specs = res.data.specs;
        setSpecs(specs);
        if (specs.length) {
          setActiveSpec(specs[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Sidebar specs={specs} onClick={setActiveSpec} activeSpec={activeSpec} />
      <div className="main">{activeSpec && <Spec src={activeSpec.src} />}</div>
    </>
  );
};

export default hot(App);
