import axios from "axios";
import { SERVER_URL } from "./constant";

export const axs = axios.create({
  baseURL: SERVER_URL,
  timeout: 60000,
});
