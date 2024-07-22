let API_URL = import.meta.env.VITE_REACT_APP_API_URL as string;
const API_URL_EXPOSE = import.meta.env.VITE_REACT_APP_API_URL_EXPOSE as string;

const production = false;

API_URL = production ? API_URL_EXPOSE : API_URL;

export { API_URL };
