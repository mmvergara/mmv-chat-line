import { SupabaseClient } from "@supabase/auth-helpers-react";
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
    throw new Error(error.message);
  }
  return data;
};

const useSignIn = ({ email, password, supabase }: auth) => {
  return useMutation("singin", () => singIn({ email, password, supabase }));
};

export default useSignIn;
