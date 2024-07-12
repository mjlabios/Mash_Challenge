import type { NextApiRequest, NextApiResponse } from "next";
import { execute } from "./mysql/connect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log('registration sql')
  if (req.method === "POST") {
    const { firstName, lastName, email, username, password } = req.body;

    let INSERT_QUERY = `
    INSERT 
    INTO 
    Users
        (
            FIRST_NAME,
            LAST_NAME,
            USERNAME,
            EMAIL,
            PASSWORD
        )
    VALUES
        (
            '${firstName}',
            '${lastName}',
            '${username}',
            '${email}',
            '${password}'
        )`;
    const insertQuery = await execute(INSERT_QUERY);

    let response: any = {};

    if (insertQuery?.affectedRows > 0) {
      response = {
        status: "success",
      };
    } else {
      response = {
        status: "error",
        data: [],
        errorCode: "REGISTRATION_FAILURE",
      };
    }
  
    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}