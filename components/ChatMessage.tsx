import { Avatar, Box, Text } from "@mantine/core";
import useAppTheme from "../hooks/useAppTheme";

interface ChatMessageProps {
  isAuthor: boolean;
  avatar_url?: string;
  message: string;
  author: string;
  isSecondLastMsgAuthor: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isAuthor, author, isSecondLastMsgAuthor, message, avatar_url }) => {
  const { colors, isDark } = useAppTheme();
  const marginLR = isSecondLastMsgAuthor ? 48 : 10;
  const avatar = !isSecondLastMsgAuthor && <Avatar src={avatar_url} alt={author || "message author"} radius='xl' />;
  const messageBox = (
    <Box
      component='span'
      p={10}
      bg={isDark ? colors.dark[5] : colors.gray[2]}
      ml={marginLR}
      mr={marginLR}
      sx={{ borderRadius: "5px" }}
    >
      {message}asdasdasdsadsa asdas asd asd
    </Box>
  );

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
      {!isSecondLastMsgAuthor && <Text sx={{ width: "100%", marginLeft: "50px", marginRight: "50px" }}>{author}</Text>}
      {isAuthor ? (
        <>
          {messageBox}
          {avatar}
        </>
      ) : (
        <>
          {avatar}
          {messageBox}
        </>
      )}
    </Box>
  );
};

export default ChatMessage;
