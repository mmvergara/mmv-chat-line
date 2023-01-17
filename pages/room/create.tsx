import { Button, Container, CopyButton, Loader, Paper, Text, TextInput } from "@mantine/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { SyntheticEvent, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { DBTypes } from "../../supabase/db-types";
import useAppTheme from "../../hooks/useAppTheme";
import uniqid from "uniqid";

const CreateRoom: React.FC = () => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient<DBTypes>();
  const { colors, isDark } = useAppTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [created, setIsCreated] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomId, setRoomdId] = useState<null | string>(null);

  const handleCreateNewRoom = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setIsLoading(true);
    const newRoomId = uniqid(roomName);
    const { error } = await supabase.from("rooms").insert({ room_owner: user.id, name: roomName, id: newRoomId });
    if (error) {
      console.log(error);
      showNotification({ message: error.message, color: "red" });
      return setIsLoading(false);
    }
    setRoomdId(newRoomId);
    setIsLoading(false);
    setIsCreated(true);
  };

  return (
    <Container size={600} p={20}>
      <Paper
        component='form'
        shadow='xs'
        onSubmit={handleCreateNewRoom}
        p='md'
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
        }}
      >
        {created && roomId ? (
          <>
            <Text component='h1' align='center' size='xl'>
              New Room ID | {roomId}
            </Text>
            <CopyButton value={roomId}>
              {({ copied, copy }) => (
                <Button color={copied ? "teal" : "blue"} onClick={copy} mt={15}>
                  {copied ? "Copied to Clipboard!" : "Copy Room ID"}
                </Button>
              )}
            </CopyButton>
            <Button
              type='button'
              onClick={() => router.push(`/room/${roomId}`)}
              variant='gradient'
              mt={15}
              sx={{ width: "auto" }}
            >
              Join the Room!
            </Button>
          </>
        ) : (
          <>
            <Text component='h2' align='center' size='xl'>
              Create New Room
            </Text>
            <TextInput
              mt={10}
              variant='filled'
              placeholder='Room Name'
              description='minimum of 7 characters and no spaces'
              type='text'
              value={roomName}
              onChange={(e) => setRoomName(e.target?.value.trim())}
              withAsterisk
              inputWrapperOrder={["label", "input", "description", "error"]}
            />
            <Button type='submit' variant='gradient' mt={15} sx={{ width: "auto" }}>
              {isLoading ? <Loader color='white' size='sm' /> : "Create Room"}
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CreateRoom;
