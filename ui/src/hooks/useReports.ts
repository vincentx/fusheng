import { useEffect, useState } from "react";
import { IReport } from "../App";
import httpClient from "../utils/httpClient";
import { REPORTS_RESOURCE_PATH } from "../utils/constant";

export const useReports = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    retrieveReports();
  }, []);

  const retrieveReports = () => {
    httpClient.get(REPORTS_RESOURCE_PATH).then((res) => {
      const reports = res.data.reports;
      setReports(reports);
    });
  };

  return { reports, retrieveReports };
};
