const db_url = `http://${process.env.NEXT_PUBLIC_DB_API}:${process.env.NEXT_PUBLIC_DB_API_PORT}`;
export const GET_FLOWS_ENDPOINT = `${db_url}/network_flows`;
