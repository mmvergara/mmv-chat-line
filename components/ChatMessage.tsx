import { Box, Text } from "@mantine/core";
import useAppTheme from "../hooks/useAppTheme";

interface ChatMessageProps {
  isAuthor: boolean;
  message: string;
  author: string;
  isSecondLastMsgAuthor: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isAuthor, author, isSecondLastMsgAuthor, message }) => {
  const { colors, isDark } = useAppTheme();

  return (
    <Box
      component='article'
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: isAuthor ? "right" : "left",
        textAlign: isAuthor ? "right" : "left",
        flexWrap: "wrap",
        marginTop: isSecondLastMsgAuthor ? "5px" : "20px",
      }}
    >
      {!isSecondLastMsgAuthor && <Text sx={{ width: "100%" }}>{author}</Text>}
      <Box component='span' p={10} bg={isDark ? colors.dark[5] : colors.gray[2]} sx={{ borderRadius: "5px" }}>
        {message}
      </Box>
    </Box>
  );
};

export default ChatMessage;
