import { Avatar, Box } from "@mantine/core";
import useAppTheme from "../hooks/useAppTheme";

interface ChatMessageProps {
  isOwner: boolean;
  avatar_url?: string;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isOwner }) => {
  const { colors, isDark } = useAppTheme();

  const avatar = <Avatar src='avatar.png' alt="it's me" radius='xl' />;
  const message = (
    <Box component='span' p={10} bg={isDark ? colors.dark[5] : colors.gray[2]} sx={{ borderRadius: "5px" }}>
      message
    </Box>
  );
  return (
    <Box component='article' sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {isOwner ? (
        <>
          {avatar}
          {message}
        </>
      ) : (
        <>
          {message}
          {avatar}
        </>
      )}
    </Box>
  );
};

export default ChatMessage;
