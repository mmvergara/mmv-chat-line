import { IconMoonStars, IconSunHigh } from "@tabler/icons";
import {
  ActionIcon,
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import { useState } from "react";
import NavLink from "./NavLink";
const Layout: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const isDark = colorScheme === "dark";

  return (
    <AppShell
      styles={{
        main: {
          color: isDark ? colors.gray[1] : colors.dark[8],
          background: isDark ? colors.dark[7] : colors.gray[2],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          withBorder={false}
          sx={{
            overflow: "hidden",
            transition: "width 1000ms ease, min-width 1000ms ease",
          }}
          hiddenBreakpoint='sm'
          bg={isDark ? colors.dark[9] : colors.gray[3]}
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <NavLink name='Home' url='/' />
          <NavLink name='Login' url='/auth/login' />
          <NavLink name='Signup' url='/auth/signup' />
          <NavLink name='Create New Rrom' url='/room/create' />
          <NavLink name='Join Room' url='/auth/signup' />
        </Navbar>
      }
      header={
        <Header withBorder={false} bg={isDark ? colors.dark[8] : colors.gray[4]} height={{ base: 50, md: 70 }} p='md'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
            <MediaQuery largerThan='sm' styles={{ display: "none" }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' color={colors.gray[6]} mr='xl' />
            </MediaQuery>
            <h2 style={{ color: isDark ? "white" : "black" }}>Chat Line</h2>
            <ActionIcon
              variant='outline'
              sx={{ backgroundColor: isDark ? "black" : colors.gray[4] }}
              onClick={() => toggleColorScheme()}
              title='Toggle color scheme'
            >
              {isDark ? <IconSunHigh size={22} color={"white"} /> : <IconMoonStars size={22} color={colors.dark[9]} />}
            </ActionIcon>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
