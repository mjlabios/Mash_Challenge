import type { NextApiRequest, NextApiResponse } from "next";
import { execute, select } from "./mysql/connect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    let response: any = {};
    const { oldPassword, newPassword, username } = req.body;
    let SELECT_QUERY = `SELECT * FROM Users WHERE USERNAME = '${username}' AND PASSWORD = '${oldPassword}'`;
    const selectQuery: any = await select(SELECT_QUERY);

    if (
      (Array.isArray(selectQuery) && selectQuery.length > 0) ||
      Object.keys(selectQuery).length > 0
    ) {
      let UPDATE_QUERY = `
        UPDATE 
            Users SET PASSWORD = '${newPassword}' WHERE username = '${username}'`;
      const updateQuery = await execute(UPDATE_QUERY);

      if (updateQuery?.affectedRows > 0) {
        response = {
          status: "success",
        };
      } else {
        response = {
          status: "error",
          data: [],
          errorCode: "FAILING_UPDATE",
        };
      }
    } else {
      response = {
        status: "error",
        data: [],
        errorCode: "PASSWORD_NOT_MATCHED",
      };
    }

    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}