import { API } from "./api.gen";
import fetch from "cross-fetch";
const client = new API("https://api.spongeboi.com", fetch);

export default client;
