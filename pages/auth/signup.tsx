import { Button, Container, Loader, Paper, Text, TextInput } from "@mantine/core";
import { IconMail, IconPassword } from "@tabler/icons";
import { authValidationSchema } from "../../schemas/validation-schema";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import useAppTheme from "../../hooks/useAppTheme";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSignUp from "../../hooks/useSignup";

const SignUp: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleSignUp = async () => signUp.mutate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: authValidationSchema,
    onSubmit: handleSignUp,
  });
  const useSignUpParams = {
    email: formik.values.email,
    password: formik.values.password,
    supabase,
  };
  const signUp = useSignUp(useSignUpParams);
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
          Sign Up
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
          {signUp.isLoading ? <Loader color='white' size='sm' /> : "Create Account"}
        </Button>{" "}
        <Button
          onClick={() => router.push("/auth/signin")}
          type='button'
          variant='subtle'
          mt={10}
          sx={{ width: "auto" }}
        >
          Already have an account? Sign In instead
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
