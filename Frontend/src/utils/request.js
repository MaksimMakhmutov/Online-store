import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const request = async (
  url,
  method = "GET",
  data = undefined,
  params = null
) => {
  const config = {
    url: baseURL + url,
    method,
    params,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  if (data !== undefined) {
    config.data = data;
  }

  const res = await axios(config);
  return res.data;
};
