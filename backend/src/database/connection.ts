import knex from "knex";
import { resolve } from "path";

const database = knex({
  client: "sqlite3",
  connection: {
    filename: resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

export default database;
