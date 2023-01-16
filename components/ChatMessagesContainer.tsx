import { ScrollArea } from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useRef } from "react";
import { Messages } from "../supabase/db-types";
import useAppTheme from "../hooks/useAppTheme";
import ChatMessage from "./ChatMessage";
import ChatMessageSkeleton from "./ChatMessageSkeleton";

type props = {
  messages: Messages[];
  isFetching: boolean;
};

const ChatMessageContainer: React.FC<props> = ({ messages, isFetching }) => {
  const bottomDivRef = useRef<HTMLDivElement | null>(null!);
  const user = useUser();
  const { colors, isDark } = useAppTheme();

  useEffect(() => {
    console.log("useeffcet");
    bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
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
      <div ref={bottomDivRef}>a</div>
    </ScrollArea>
  );
};

export default ChatMessageContainer;
