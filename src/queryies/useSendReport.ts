import { useMutation } from "react-query";
import { sendReport } from "../actions/sendReport";
import { Report } from "../types";

export function useSendReport(id: string) {
  return useMutation((report: Report) => sendReport(report, id));
}
