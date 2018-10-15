import axios from "axios";

const instance = axios.create({
  baseURL: "https://23vs23.com/app2/"
  //baseURL: "http://localhost:3090/app2/"
});

export default instance;
