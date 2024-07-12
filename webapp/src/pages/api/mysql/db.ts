import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_mjlabios_mashreq",
  password: "eS9vJtFzs&vSCEn",
  database: "freedb_mjlabios_db_mashreq",
});

export async function getPool() {
  return pool;
}