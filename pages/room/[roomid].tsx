import { Avatar, Box, Button, Container, Paper, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons";
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
        <Paper
          my={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            height: "200px",
            backgroundColor: isDark ? colors.dark[6] : colors.gray[4],
          }}
        >

          <Box component='article' sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: "10px" }}>
            <Box component='span' p={10} bg={isDark ? colors.dark[5] : colors.gray[2]} sx={{ borderRadius: "5px" }}>
              message
            </Box>{" "}
            <Avatar src='avatar.png' alt="it's me" radius='xl' />
          </Box>
          <Box component='article'>message</Box>
        </Paper>
        <Paper
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
            sx={{ width: "100%", paddingRight: "1em" }}
            rightSection={
              <Button>
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
