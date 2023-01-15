import { Button, Container, Paper, ScrollArea, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import ChatMessage from "../../components/ChatMessage";
import useAppTheme from "../../hooks/useAppTheme";

const Room: React.FC = () => {
  const { colors, isDark } = useAppTheme();

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
          <ChatMessage author={"sososo"} isAuthor={false} message={"sample mesage"} isSecondLastMsgAuthor={false} />
          <ChatMessage author={"sososo"} isAuthor={false} message={"sample mesage"} isSecondLastMsgAuthor={true} />
          <ChatMessage author={"sososo"} isAuthor={true} message={"sample mesage"} isSecondLastMsgAuthor={false} />
          <ChatMessage author={"sososo"} isAuthor={true} message={"sample mesage"} isSecondLastMsgAuthor={true} />
        </ScrollArea>
        <Paper
          component='form'
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
