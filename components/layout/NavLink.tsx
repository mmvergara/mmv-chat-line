import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useRouter } from "next/router";

type props = {
  name: string;
  url: string;
};
const NavLink: React.FC<props> = ({ name, url }) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { hovered, ref } = useHover();
  const { colors } = useMantineTheme();
  const router = useRouter();

  return (
    <div
      ref={ref}
      style={{
        padding: "1em",
        cursor: "pointer",
        backgroundColor: hovered ? (isDark ? colors.dark[6] : colors.gray[4]) : "",
      }}
      onClick={() => router.push(url)}
    >
      <span style={{ color: isDark ? "white" : "black", fontWeight: "bold", letterSpacing: "0.5px" }}>{name}</span>
    </div>
  );
};

export default NavLink;
