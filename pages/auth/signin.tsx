import { Button, ButtonProps, Container, Loader, Paper, Text, TextInput } from "@mantine/core";
import { IconMail, IconPassword } from "@tabler/icons";
import { authValidationSchema } from "../../schemas/validation-schema";
import { useFormik } from "formik";
import { supabase } from "../../supabase/browser-client";
import useAppTheme from "../../hooks/useAppTheme";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Provider } from "@supabase/supabase-js";
import { GithubIcon } from "@mantine/ds";
const SignUp: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOAuth = async (provider: Provider) => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: "/" } });
    setIsLoading(false);
  };
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formik.values.email,
        password: formik.values.password,
      });
      console.log({ data, error });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: authValidationSchema,
    onSubmit: handleSignIn,
  });

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
          {isLoading ? <Loader color='white' size='sm' /> : "Sign In"}
        </Button>{" "}
        <Text component="strong" align='center' my={10}>or</Text>
        <Button
          onClick={() => router.push("/auth/signup")}
          type='button'
          variant='outline'
          mt={3}
          sx={{ width: "auto" }}
        >
          Create Account
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
            backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
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
