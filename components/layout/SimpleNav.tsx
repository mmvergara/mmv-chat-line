import { IconLogout, IconLogin, IconHome2, IconSquareRoundedPlus } from "@tabler/icons";
import { createStyles, Navbar, Group } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import Link from "next/link";
import useAppTheme from "../../hooks/useAppTheme";

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

const data = [
  { auth: false, link: "/", label: "Home", icon: IconHome2 },
  { auth: false, link: "/room/join", label: "Join Room", icon: IconSquareRoundedPlus },
  { auth: false, link: "/room/create", label: "Home", icon: IconHome2 },
  { auth: false, link: "/auth/signin", label: "Sign In", icon: IconLogin },
];

export function NavbarSimple() {
  const { classes, cx } = useStyles();
  const { colors, isDark } = useAppTheme();

  const links = data.map((item) => (
    <Link className={cx(classes.link)} href={item.link} key={item.label}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar height='auto' width={{ sm: 300 }} p='md' bg={isDark ? colors.dark[9] : colors.gray[3]}>
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          <MantineLogo />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link href='#' className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
