import axios from "axios";
import qs from "qs";
import Cookie from "js-cookie";
import { LoginForm, LoginResponse, Branch } from "../types";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer: ${Cookie.get("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const loginAPI = async (input: LoginForm): Promise<LoginResponse> => {
  const axiosData = qs.stringify({
    username: input.username,
    password: input.password,
  });
  const result: LoginResponse = {
    jwt: null,
    error: null,
  };
  try {
    const { data }: { data: string } = await axios.post(`/login`, axiosData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });
    result.jwt = data.split("Token:")[1].trim();
  } catch (err) {
    result.error = err.response.status;
  }
  return result;
};
export const branchesAPI = async (): Promise<Branch[]> => {
  try {
    const { data }: { data: string } = await axios.get("/get_branches");
    const branches: Branch[] = JSON.parse(data.split("\n")[1]);
    return branches;
  } catch (err) {
    console.log(err);
    return [];
  }
};
