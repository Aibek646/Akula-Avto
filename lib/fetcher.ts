import axios from "axios";
import { LoginType, RegisterType } from "@/@types/api.type";

export const registerMutationFunction = async (data: RegisterType) =>
  await axios.post("/api/register", data);

export const loginMutationFunction = async (data: LoginType) =>
  await axios.post("/api/login", data);
