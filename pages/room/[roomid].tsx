import { Container, Paper, ScrollArea } from "@mantine/core";
import { NextPage } from "next";
import ChatMessage from "../../components/ChatMessage";
import useAppTheme from "../../hooks/useAppTheme";
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DBTypes, Messages } from "../../supabase/db-types";
import { showNotification } from "@mantine/notifications";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import ChatMessageSkeleton from "../../components/ChatMessageSkeleton";
import ChatMessageForm from "../../components/ChatMessageForm";

const Room: NextPage = () => {
  const router = useRouter();
  const roomid = router.query.roomid as string;

  const supabase = useSupabaseClient<DBTypes>();
  const user = useUser();
  const { colors, isDark } = useAppTheme();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    if (!roomid) router.push("/");
    const newMessageListener = supabase
      .channel(`public:room_messages:room_id=eq.${roomid}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "room_messages", filter: `room_id=eq.${roomid}` },
        (payload: RealtimePostgresInsertPayload<Messages>) => {
          console.log(payload.new.message);
          setMessages((prevm) => [payload.new, ...prevm]);
        }
      );
    newMessageListener.subscribe();

    const fetchChatMessages = async () => {
      const { data, error } = await supabase.from("room_messages").select("*").eq("room_id", roomid);
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
        <ScrollArea
          style={{ height: 250 }}
          my={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
            paddingRight: "20px",
          }}
        >
          {messages.map((m, i, ma) => {
            const lastMessage = ma[i - 1];
            const isSecondLastMsgAuthor = lastMessage ? lastMessage.user_id === m.user_id : false;
            return (
              <ChatMessage
                key={m.id}
                author={m.user_username}
                isAuthor={m.user_id === user?.id}
                message={m.message}
                isSecondLastMsgAuthor={isSecondLastMsgAuthor}
              />
            );
          })}
          {isFetching && <ChatMessageSkeleton />}
        </ScrollArea>
        <ChatMessageForm roomid={roomid} />
      </Paper>{" "}
    </Container>
  );
};

export default Room;
