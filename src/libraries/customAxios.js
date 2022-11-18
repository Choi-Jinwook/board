import axios from "axios";
import { url } from "../config/url";

export const customAxios = axios.create({
  baseURL: url.server,
});
