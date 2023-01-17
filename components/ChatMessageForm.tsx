import { Button, Loader, Paper, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { IconSend } from "@tabler/icons";
import { SyntheticEvent, useState } from "react";
import useAppTheme from "../hooks/useAppTheme";
import { DBTypes } from "../supabase/db-types";

const ChatMessageForm: React.FC<{ roomid?: string }> = ({ roomid }) => {
  const user = useUser();
  const supabase = useSupabaseClient<DBTypes>();
  const { colors, isDark } = useAppTheme();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (message.length < 1) return;
    if (!roomid) return;
    if (!user?.id) return;
    setIsSending(true);

    // Fetch user username
    const { data: userData, error: userErr } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();
    if (!userData) {
      showNotification({ message: userErr.message, color: "red" });
      return setIsSending(false);
    }

    // Insert message
    const { error } = await supabase
      .from("room_messages")
      .insert({ message:message.trim(), user_id: user.id, room_id: roomid, user_username: userData?.username || "" });
    if (error) {
      showNotification({ message: error.message, color: "red" });
      return setIsSending(false);
    }
    setMessage("");
    setIsSending(false);
  };
  return (
    <Paper
      component='form'
      onSubmit={handleSendMessage}
      shadow='xs'
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
      }}
    >
      <TextInput
        variant='filled'
        placeholder=''
        type='text'
        name='roomid'
        withAsterisk
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ width: "100%" }}
        rightSection={
          <Button type='submit' sx={{ borderRadius: "0 2px 2px 0px", marginRight: "1.3em" }}>
            {isSending ? <Loader size={20} color='violet' /> : <IconSend size={20} />}
          </Button>
        }
        inputWrapperOrder={["label", "input", "description", "error"]}
      />
    </Paper>
  );
};

export default ChatMessageForm;
