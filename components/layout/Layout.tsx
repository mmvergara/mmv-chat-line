import { ActionIcon, AppShell, Burger, Header, MediaQuery, Navbar as NavbarContainer } from "@mantine/core";
import { IconMoonStars, IconSunHigh } from "@tabler/icons";
import { useState } from "react";
import useAppTheme from "../../hooks/useAppTheme";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);
  const { colors, isDark, toggleColorScheme } = useAppTheme();

  const toggleNav = () => setOpenNav((o) => !o);
  return (
    <AppShell
      styles={{
        main: {
          color: isDark ? colors.gray[1] : colors.dark[8],
          background: isDark ? colors.dark[7] : colors.gray[2],
        },
      }}
      navbarOffsetBreakpoint='lg'
      navbar={
        <NavbarContainer withBorder={false} hiddenBreakpoint='lg' hidden={!openNav} width={{ sm: 200, lg: 300 }}>
          <Navbar toggleNav={toggleNav} />
        </NavbarContainer>
      }
      header={
        <Header bg={isDark ? colors.dark[7] : colors.gray[4]} height={{ base: 50, md: 70 }} p='md'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
            <MediaQuery largerThan='lg' styles={{ display: "none" }}>
              <Burger opened={openNav} onClick={toggleNav} size='sm' color={colors.gray[6]} mr='xl' />
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
