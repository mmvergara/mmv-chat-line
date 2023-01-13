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

const singIn = async ({ email, password, supabase }: auth) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    showNotification({ message: error?.message, color: "red" });
    throw new Error(error?.message);
  }
  Router.push("/room/list");
  showNotification({ message: "Sign in success", color: "green" });
  return data;
};

const useSignIn = ({ email, password, supabase }: auth) => {
  return useMutation("singin", () => singIn({ email, password, supabase }));
};

export default useSignIn;
