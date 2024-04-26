import { useMutation } from "react-query";
import { sendReport } from "../actions/sendReport";
import { Report } from "../types";

export function useSendReport(id: string) {
  console.log(id, "sduiiooooooooooooooooo");
  return useMutation((report: Report) => sendReport(report, id));
}
