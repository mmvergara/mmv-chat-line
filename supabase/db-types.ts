import { Database } from "./db-generated-types";
export type DBTypes = Database

export type Rooms = DBTypes['public']['Tables']['rooms']['Row']