import { Button, Container, Loader, Paper, Text, TextInput } from "@mantine/core";
import { SyntheticEvent, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { DBTypes } from "../../supabase/db-types";
import useAppTheme from "../../hooks/useAppTheme";
import { showNotification } from "@mantine/notifications";

const JoinRoom: React.FC = () => {
  const supabase = useSupabaseClient<DBTypes>();
  const user = useUser();
  const { colors, isDark } = useAppTheme();
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleJoinRoom = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (roomId.length < 1 || !user?.id) return;

    const { error } = await supabase.from("room_participants").insert({ room_id: roomId, user_id: user.id });
    if (error) {
      showNotification({
        message: "Could not find the room or you are already a participant of that room",
        title: "Error Occured",
        color: "red",
      });
      return setIsLoading(false);
    }

    setIsLoading(false);
  };
  return (
    <Container size={600} p={20}>
      <Paper
        component='form'
        shadow='xs'
        onSubmit={handleJoinRoom}
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
          value={roomId}
          onChange={(e) => setRoomId(e.target.value.trim())}
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
        <Button type='submit' variant='gradient' mt={15} sx={{ width: "auto" }}>
          {isLoading ? <Loader color='white' size='sm' /> : "Join"}
        </Button>
      </Paper>
    </Container>
  );
};

export default JoinRoom;
