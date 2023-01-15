import { Button, Container, Paper, Skeleton, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAppTheme from "../../hooks/useAppTheme";
import { DBTypes, Rooms } from "../../supabase/db-types";

const RoomList: React.FC = () => {
  const supabase = useSupabaseClient<DBTypes>();
  const router = useRouter();
  const { colors, isDark, textColor } = useAppTheme();
  const [rooms, setRooms] = useState<Rooms[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase.from("rooms").select("*");
      if (error) return showNotification({ message: error?.message || "", color: "red" });
      if (!data) return;
      setRooms(data);
    };
    fetchRooms();
  }, [supabase]);
  return (
    <Container size={800} p={20}>
      <Paper component='section' shadow='xs' p='md' bg={isDark ? colors.gray[9] : "white"}>
        <Text sx={{ color: textColor }} component='h1' size={30}>
          My Rooms
        </Text>
        <Text component='p' sx={{ color: textColor }}>
          List of rooms you own or a participating in.
        </Text>
        <Paper
          display='flex'
          bg={isDark ? colors.gray[8] : colors.gray[1]}
          sx={{ flexDirection: "column", gap: "20px", padding: "1em", margin: "1em 0em", flexWrap: "wrap" }}
        >
          {rooms.length < 1 ? (
            <>
              {" "}
              <Skeleton height={8} mt={6} width='59%' radius='xl' />
              <Skeleton height={8} mt={6} width='50%' radius='xl' />
              <Skeleton height={8} mt={6} width='55%' radius='xl' />
              <Skeleton height={8} mt={6} width='50%' radius='xl' />
              <Skeleton height={8} mt={6} width='59%' radius='xl' />
              <Skeleton height={8} mt={6} width='50%' radius='xl' />
              <Skeleton height={8} mt={6} width='55%' radius='xl' />
              <Skeleton height={8} mt={6} width='50%' radius='xl' />
            </>
          ) : (
            rooms.map((r) => {
              return (
                <Paper
                  key={r.id}
                  bg={isDark ? colors.gray[8] : colors.gray[1]}
                  component='article'
                  display='flex'
                  sx={{ alignItems: "center", gap: "20px", flexWrap: "wrap" }}
                >
                  <Button type='button' color='teal' onClick={() => router.push(`/room/${r.id}`)}>
                    Join Room
                  </Button>
                  <Text sx={{ fontWeight: "bold" }}>{r.name}</Text>
                </Paper>
              );
            })
          )}
        </Paper>
      </Paper>
    </Container>
  );
};

export default RoomList;
