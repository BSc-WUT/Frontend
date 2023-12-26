const api_url = `http://${process.env.NEXT_PUBLIC_API}:${process.env.NEXT_PUBLIC_API_PORT}`;
export const GET_MODELS_ENDPOINT = `${api_url}/models`;
export const UPLOAD_MODEL_ENDPOINT = `${api_url}/models/upload/`;
export const PREDICT_ENDPOINT = `${api_url}/models/predict/`;
export const DELETE_MODEL_ENDPOINT = `${api_url}/models/delete/`;
export const ACTIVATE_MODEL_ENDPOINT = `${api_url}/models/activate/`;
export const DEACTIVATE_MODEL_ENDPOINT = `${api_url}/models/deactivate/`;
export const GET_FLOWS_ENDPOINT = `${api_url}/network_flows`;
