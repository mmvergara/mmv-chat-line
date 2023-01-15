import { showNotification } from "@mantine/notifications";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import Router from "next/router";
import { useMutation } from "react-query";
import { DBTypes } from "../supabase/db-types";

type auth = {
  email: string;
  password: string;
  username: string;
  supabase: SupabaseClient<DBTypes>;
};

const signUp = async ({ email, password, username, supabase }: auth) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    showNotification({ message: error?.message, color: "red" });
    throw new Error(error?.message);
  }
  
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw new Error(userErr.message);

  const { error: updateUsernameErr } = await supabase.from("profiles").update({ username }).eq("id", userData.user.id);
  if (updateUsernameErr) throw new Error(updateUsernameErr.message);

  Router.push("/");
  showNotification({ message: "Sign Up success", color: "green" });
  return data;
};

const useSignUp = ({ email, password, supabase, username }: auth) => {
  return useMutation("Signup", () => signUp({ email, password, supabase, username }));
};

export default useSignUp;
