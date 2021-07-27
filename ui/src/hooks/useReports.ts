import { useEffect, useState } from "react";
import { IReport } from "../App";
import httpClient from "../utils/httpClient";
import { REPORTS_RESOURCE_PATH } from "../utils/constant";
import { toast } from "react-toastify";

export const useReports = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    retrieveReports();
  }, []);

  const retrieveReports = () => {
    httpClient
      .get(REPORTS_RESOURCE_PATH)
      .then((res) => {
        // const reports = res.data.reports;
        // setReports(reports);

        const reports = (res.data.split(", ") as string[]).map((it) => ({
          name: it,
        }));
        setReports(reports);
      })
      .catch((err) =>
        toast.error(`Unable to list reports due to ${err.message}`),
      );
  };

  return { reports, retrieveReports };
};
