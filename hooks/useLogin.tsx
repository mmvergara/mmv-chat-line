import { useMutation } from "react-query";
import supabase from "../supabase/client";

type auth = {
  email: string;
  password: string;
};

const login = async ({ email, password }: auth) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const useLogin = ({ email, password }: auth) => {
  return useMutation("login", () => login({ email, password }));
};

export default useLogin;
