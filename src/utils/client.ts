import { API } from "./api.gen";

const client = new API("https://api.spongeboi.com", fetch);

export default client;
