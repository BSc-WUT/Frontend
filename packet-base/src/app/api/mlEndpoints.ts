const ml_url = `http://${process.env.NEXT_PUBLIC_ML_API}:${process.env.NEXT_PUBLIC_ML_API_PORT}`;
export const GET_MODELS_ENDPOINT = `${ml_url}/models`;
export const UPLOAD_MODEL_ENDPOINT = `${ml_url}/models/upload/`;
export const PREDICT_ENDPOINT = `${ml_url}/models/predict/`;
export const DELETE_MODEL_ENDPOINT = `${ml_url}/models/delete/`;
export const ACTIVATE_MODEL_ENDPOINT = `${ml_url}/models/activate/`;
export const DEACTIVATE_MODEL_ENDPOINT = `${ml_url}/models/deactivate/`;
