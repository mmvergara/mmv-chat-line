import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

const useAppTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();
  const isDark = colorScheme === "dark";

  const textColor = isDark ? "white" : "Black";

  return { isDark, toggleColorScheme, colors ,textColor };
};

export default useAppTheme;
