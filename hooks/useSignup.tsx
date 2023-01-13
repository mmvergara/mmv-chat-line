import { showNotification } from "@mantine/notifications";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import Router from "next/router";
import { useMutation } from "react-query";
import { DBTypes } from "../supabase/db-types";

type auth = {
  email: string;
  password: string;
  supabase: SupabaseClient<DBTypes>;
};

const signUp = async ({ email, password, supabase }: auth) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    showNotification({ message: error?.message, color: "red" });
    throw new Error(error?.message);
  }
  Router.push("/");
  showNotification({ message: "Sign Up success", color: "green" });
  return data;
};

const useSignUp = ({ email, password, supabase }: auth) => {
  return useMutation("Signup", () => signUp({ email, password, supabase }));
};

export default useSignUp;
