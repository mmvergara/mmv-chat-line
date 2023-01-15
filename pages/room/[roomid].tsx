import { Button, Container, Paper, ScrollArea, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { NextPage } from "next";
import ChatMessage from "../../components/ChatMessage";
import useAppTheme from "../../hooks/useAppTheme";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DBTypes, Messages } from "../../supabase/db-types";
import { showNotification } from "@mantine/notifications";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const Room: NextPage = () => {
  const router = useRouter();
  const roomid = router.query.roomid as string;

  const supabase = useSupabaseClient<DBTypes>();
  const user = useUser();
  const { colors, isDark } = useAppTheme();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const handleSendMessage = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSending(true);
    if (!roomid) return;
    if (!user?.id) return;
    const { error } = await supabase.from("room_messages").insert({ message, user_id: user.id, room_id: roomid });
    if (error) {
      showNotification({ message: error.message, color: "red" });
      return setIsSending(false);
    }

    setIsSending(true);
  };

  useEffect(() => {
    if (!roomid) {
      router.push("/");
    }
    const newMessageListener = supabase
      .channel(`public:room_messages:room_id=eq.${roomid}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "room_messages", filter: `room_id=eq.${roomid}` },
        (payload: RealtimePostgresInsertPayload<Messages>) => {
          console.log(payload.new.message);
        }
      );
    newMessageListener.subscribe();

    const fetchChatMessages = async () => {
      const { data, error } = await supabase.from("room_messages").select("*").eq("room_id", roomid);
      if (error) showNotification({ message: error.message, color: "red" });
    };
    fetchChatMessages();

    return () => {
      supabase.removeChannel(newMessageListener);
    };
  }, [supabase, roomid, router]);
  return (
    <Container size={800} p={20}>
      <Paper
        shadow='xs'
        p='md'
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
        }}
      >
        <ScrollArea
          style={{ height: 250 }}
          my={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "40vh",
            backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
            paddingRight: "20px",
          }}
        >
          {/* {messages.map((m)=>{
            // return <ChatMessage author={m.user_id} isAuthor={false} message={"sample mesage"} isSecondLastMsgAuthor={false} />
          })} */}
          <ChatMessage author={"sososo"} isAuthor={false} message={"sample mesage"} isSecondLastMsgAuthor={false} />
          <ChatMessage author={"sososo"} isAuthor={false} message={"sample mesage"} isSecondLastMsgAuthor={true} />
          <ChatMessage author={"sososo"} isAuthor={true} message={"sample mesage"} isSecondLastMsgAuthor={false} />
          <ChatMessage author={"sososo"} isAuthor={true} message={"sample mesage"} isSecondLastMsgAuthor={true} />
        </ScrollArea>
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
            onChange={(e) => setMessage(e.target.value.trim())}
            sx={{ width: "100%" }}
            rightSection={
              <Button type='submit' sx={{ borderRadius: "0 2px 2px 0px", marginRight: "1.3em" }}>
                <IconSend size={20} />
              </Button>
            }
            inputWrapperOrder={["label", "input", "description", "error"]}
          />
        </Paper>
      </Paper>{" "}
    </Container>
  );
};

export default Room;
