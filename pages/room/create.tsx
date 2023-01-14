import { Button, Container, Loader, Paper, Text, TextInput } from "@mantine/core";
import { IconMail, IconUserPlus } from "@tabler/icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { DBTypes } from "../../supabase/db-types";
import useAppTheme from "../../hooks/useAppTheme";
import { SyntheticEvent, useState } from "react";

const CreateRoom: React.FC = () => {
  const supabase = useSupabaseClient<DBTypes>();
  const { colors, isDark } = useAppTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateNewRoom = async (e: SyntheticEvent) => {};
  return (
    <Container size={600} p={20}>
      <Paper
        component='form'
        shadow='xs'
        onSubmit={() => {}}
        p='md'
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
        }}
      >
        <Text component='h1' align='center' size='xl'>
          Join Room
        </Text>
        <TextInput
          variant='filled'
          placeholder=''
          type='text'
          label='Room ID'
          name='roomid'
          withAsterisk
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
        <Button type='submit' variant='gradient' mt={15} sx={{ width: "auto" }}>
          {isLoading ? <Loader color='white' size='sm' /> : "Join"}
        </Button>
      </Paper>
    </Container>
  );
};

export default CreateRoom;
