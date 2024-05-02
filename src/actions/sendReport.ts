import { Report } from "../types";

export async function sendReport(report: Report, id: string) {
  console.log(report);
  console.log(id);
  console.log(JSON.parse(localStorage.getItem("user"))?.accessToken);
  try {
    console.log(
      "sending reportkdlfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
    );
    const res = await fetch(
      `http://localhost:5000/api/bug-bounty-reports/submit?bugBountyProgramId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken
          }`,
        },
        body: JSON.stringify(report),
      }
    );
    console.log(res);
    if (!res.ok) {
      console.log(res);
      throw new Error("Wrong response");
    }

    return res;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
