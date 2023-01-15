import { Database } from "./db-generated-types";
export type DBTypes = Database;

type DBTables = DBTypes["public"]["Tables"];

export type Rooms = DBTables["rooms"]["Row"];
export type Messages = DBTables["room_messages"]["Row"];
