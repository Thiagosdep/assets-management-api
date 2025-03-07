export interface DatabaseConfig {
  hostOnlyRead: string;
  hostReadWrite: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema: string;
}
