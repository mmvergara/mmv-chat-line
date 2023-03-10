import { IconLogout, IconLogin, IconHome2, TablerIcon, IconList } from "@tabler/icons";
import { createStyles, Navbar, Group, Text } from "@mantine/core";
import { IconSquareRoundedPlus, IconWalk } from "@tabler/icons";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { SyntheticEvent } from "react";
import useAppTheme from "../../hooks/useAppTheme";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 700,
      letterSpacing: "1px",
      borderBottom: "2px solid white",
      marginTop: "15px",

      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({ variant: "light", color: theme.colors.dark[0] }).background,
        color: theme.fn.variant({ variant: "light", color: theme.colors.dark[0] }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: "light", color: theme.colors.dark[0] }).color,
        },
      },
    },
  };
});

type linkData = { show: boolean; link: string; label: string; icon: TablerIcon };
type props = {
  toggleNav: () => void;
};

const NavbarSimple: React.FC<props> = ({ toggleNav }) => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { classes, cx } = useStyles();
  const { colors, isDark } = useAppTheme();

  const data: linkData[] = [
    { show: true, link: "/", label: "Home", icon: IconHome2 },
    { show: !!user, link: "/room/list", label: "My Rooms", icon: IconList },
    { show: !!user, link: "/room/join", label: "Join Room", icon: IconWalk },
    { show: !!user, link: "/room/create", label: "Create New Room", icon: IconSquareRoundedPlus },
    { show: !user, link: "/auth/signin", label: "Sign In", icon: IconLogin },
  ];

  const links = data.map((link) => {
    if (!link.show) return <div key={link.label}></div>;
    return (
      <Link onClick={toggleNav} className={cx(classes.link)} href={link.link} key={link.label}>
        <link.icon className={classes.linkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </Link>
    );
  });

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) return showNotification({ message: error.message, color: "red" });
    showNotification({ message: "Sign out success", color: "green" });
    router.push("/");
  };

  return (
    <Navbar height='auto' width={{ sm: 300 }} p='md' bg={isDark ? colors.dark[7] : colors.gray[3]}>
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          <Text color={isDark ? colors.dark[1] : colors.gray[7]} sx={{ fontWeight: "bold", letterSpacing: "1px" }}>
            Hello There!
          </Text>
        </Group>
        {links}
      </Navbar.Section>
      {user && (
        <Navbar.Section className={classes.footer}>
          <Link href='/' className={classes.link} onClick={handleLogout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
        </Navbar.Section>
      )}
    </Navbar>
  );
};

export default NavbarSimple;
