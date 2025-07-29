import { getAuthClient } from "@woym/auth/react/client";
import { baseURL } from "./constants";

const authURL = `${baseURL}/__/api/auth`;
export const authClient = getAuthClient(authURL);
