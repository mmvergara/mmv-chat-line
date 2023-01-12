import { Button, Container, Paper, Text, TextInput } from "@mantine/core";
import { IconMail, IconPassword } from "@tabler/icons";

const SignUp: React.FC = () => {
  return (
    <Container size={600} p={20}>
      <Paper
        component='form'
        shadow='xs'
        p='md'
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Text component='h1' align='center'>
          Sign Up
        </Text>
        <TextInput
          icon={<IconMail />}
          variant='filled'
          label='Email'
          placeholder='example@localhost.com'
          // error='both below the input'
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
        <TextInput
          icon={<IconPassword />}
          variant='filled'
          label='Password '
          placeholder='password'
          // error='both below the input'
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
        <Button type='submit' variant='gradient' mt={10} sx={{ width: "auto" }}>
          Create Account
        </Button>{" "}
        <Button type='submit' variant='outline' mt={10} sx={{ width: "auto" }}>
          Already have an account? Sign In instead
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
