import { Button, Container, Loader, Paper, Text, TextInput } from "@mantine/core";
import { IconMail, IconPassword, IconUserPlus } from "@tabler/icons";
import { authValidationSchema } from "../../schemas/validation-schema";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GithubIcon } from "@mantine/ds";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Provider } from "@supabase/supabase-js";
import { DBTypes } from "../../supabase/db-types";
import useAppTheme from "../../hooks/useAppTheme";
import Image from "next/image";
import useSignIn from "../../hooks/useSignin";

const SignUp: React.FC = () => {
  const supabase = useSupabaseClient<DBTypes>();
  const { colors, isDark } = useAppTheme();
  const router = useRouter();

  const handleOAuth = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: "/" } });
  };

  const handleSignIn = async () => {
    login.mutate();
    router.push("/room/list");
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: authValidationSchema,
    onSubmit: handleSignIn,
  });

  const useSignInParams = {
    email: formik.values.email,
    password: formik.values.password,
    supabase,
  };
  const login = useSignIn(useSignInParams);
  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;
  return (
    <Container size={600} p={20}>
      <Paper
        component='form'
        shadow='xs'
        onSubmit={formik.handleSubmit}
        p='md'
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
        }}
      >
        <Text component='h1' align='center' size='xl'>
          Sign In
        </Text>
        <TextInput
          icon={<IconMail />}
          variant='filled'
          placeholder='example@localhost.com'
          label='Email'
          type='email'
          name='email'
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          withAsterisk
          error={emailError}
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
        <TextInput
          icon={<IconPassword />}
          variant='filled'
          label='Password '
          placeholder='password'
          type='password'
          name='password'
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          withAsterisk
          error={passwordError}
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
        <Button type='submit' variant='gradient' mt={15} sx={{ width: "auto" }}>
          {login.isLoading ? <Loader color='white' size='sm' /> : "Sign In"}
        </Button>{" "}
        <Text component='strong' align='center' my={10}>
          or
        </Text>
        <Button
          onClick={() => router.push("/auth/signup")}
          type='button'
          variant='default'
          mt={3}
          sx={{ width: "auto" }}
        >
          <IconUserPlus size={20} /> <Text ml={4}>Create Account</Text>
        </Button>
        <Button type='button' mt={10} variant='default' color='gray' onClick={() => handleOAuth("google")}>
          <Image
            width={18}
            height={18}
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg'
            alt='Google icon'
          />
          <Text pl={10}>{"  "}Continue with google</Text>
        </Button>
        <Button
          mt={10}
          onClick={() => handleOAuth("github")}
          leftIcon={<GithubIcon size={16} />}
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 5],
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 5],
            },
          })}
        >
          Login with Github
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
