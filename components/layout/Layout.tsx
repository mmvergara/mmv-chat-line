import { IconMoonStars, IconSunHigh } from "@tabler/icons";
import { ActionIcon, AppShell, Burger, Header, MediaQuery, Navbar } from "@mantine/core";

import { useState } from "react";
import NavLink from "./NavLink";
import useAppTheme from "../../hooks/useAppTheme";
import { NavbarSimple } from "./SimpleNav";
const Layout: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const { colors, isDark, toggleColorScheme } = useAppTheme();

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
        <Navbar withBorder={false} hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <NavbarSimple />
        </Navbar>
      }
      header={
        <Header withBorder={false} bg={isDark ? colors.dark[8] : colors.gray[4]} height={{ base: 50, md: 70 }} p='md'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
            <MediaQuery largerThan='sm' styles={{ display: "none" }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' color={colors.gray[6]} mr='xl' />
            </MediaQuery>
            <h2 style={{ color: isDark ? "white" : "black" }}>Chat Line</h2>
            <ActionIcon variant='outline' onClick={() => toggleColorScheme()} title='Toggle color scheme'>
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
