import { Button, Container, CopyButton, Paper } from "@mantine/core";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { DBTypes, Messages } from "../../supabase/db-types";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { NextPage } from "next";
import ChatMessageForm from "../../components/ChatMessageForm";
import useAppTheme from "../../hooks/useAppTheme";
import ChatMessageContainer from "../../components/ChatMessagesContainer";
import Head from "next/head";

const Room: NextPage = () => {
  const router = useRouter();
  const roomid = router.query.roomid as string;
  const supabase = useSupabaseClient<DBTypes>();
  const { colors, isDark } = useAppTheme();
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const newMessageListener = supabase
      .channel(`public:room_messages:room_id=eq.${roomid}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "room_messages", filter: `room_id=eq.${roomid}` },
        (payload: RealtimePostgresInsertPayload<Messages>) => {
          console.log(payload.new.message);
          setMessages((prevm) => [...prevm, payload.new]);
        }
      );
    newMessageListener.subscribe();

    const fetchChatMessages = async () => {
      const { data, error } = await supabase.from("room_messages").select("*").eq("room_id", roomid).limit(15);
      if (!data) return showNotification({ message: error.message, color: "red" });
      setMessages(data);
      setIsFetching(false);
    };
    fetchChatMessages();
    return () => {
      supabase.removeChannel(newMessageListener);
    };
  }, [supabase, roomid, router]);

  return (
    <Container size={800} p={20}>
      <Head>
        <title>Room - {roomid}</title>
      </Head>
      <Paper
        shadow='xs'
        p='md'
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
        }}
      >
        <CopyButton value={roomid}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} sx={{ width: "fit-content" }} onClick={copy} variant='gradient'>
              {copied ? "Copied to Clipboard!" : `Room ID #${roomid}`}
            </Button>
          )}
        </CopyButton>
        <ChatMessageContainer isFetching={isFetching} messages={messages} />
        <ChatMessageForm roomid={roomid} />
      </Paper>
    </Container>
  );
};

export default Room;
