import type { NextApiRequest, NextApiResponse } from "next";
import { select } from "./mysql/connect";
import { decryptString } from "@/utils/encryption";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method === "POST") {
    let response: any = {};
    let requestAuthentication = (req: any) => {
        try {
          let auth = req.headers["authorization"];

          return auth.substring(7);
        } catch (e) {
          console.log(e)
          return null;
        }
    };

    let authRequest = decryptString(requestAuthentication(req));
   
    if (authRequest !== null && authRequest !== "") {
      let authRequestObject = JSON.parse(authRequest);

      let SELECT_QUERY = `SELECT FIRST_NAME, LAST_NAME, EMAIL, USERNAME FROM Users WHERE EMAIL = '${authRequestObject.username}' OR USERNAME = '${authRequestObject.username}' AND PASSWORD = '${authRequestObject.password}'`;
      const selectQuery: any = await select(SELECT_QUERY);

      if (
        (Array.isArray(selectQuery) && selectQuery.length > 0) ||
        Object.keys(selectQuery).length > 0
      ) {
        response = {
          status: "success",
          data: selectQuery,
        };
      } else {
        response = {
          status: "error",
          errorCode: "INVALID_AUTHENTICATION",
        };
      }
    } else {
      response = {
        status: "error",
        errorCode: "SYSTEM_ERROR",
      };
    }

    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}