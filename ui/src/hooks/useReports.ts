import { useEffect, useState } from "react";
import { IReport } from "../App";
import httpClient from "../utils/httpClient";
import { REPORTS_RESOURCE_PATH } from "../utils/constant";
import { toast } from "react-toastify";

export const useReports = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    retrieveReports(3);
  }, []);

  const retrieveReports = (deps: number) => {
    if (deps === 0) {
      return;
    }
    httpClient
      .get(REPORTS_RESOURCE_PATH)
      .then((res) => {
        // const reports = res.data.reports;
        // setReports(reports);

        const reports = (res.data.split(", ") as string[]).map((it) => ({
          name: it,
        }));
        reports.sort((a, b) => a.name.localeCompare(b.name));
        setReports(reports);
      })
      .catch((err) => {
        toast.error(
          `Unable to list reports due to ${err.message}. ${
            deps > 1 ? "Will retry in 3 seconds" : ""
          }`,
        );
        setTimeout(() => retrieveReports(deps - 1), 3000);
      });
  };

  return { reports, retrieveReports };
};
