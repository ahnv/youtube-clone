import { Search } from "@/components/Search";
import { theme } from "@/theme";
import {
  Avatar,
  Divider,
  Icon,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AppShell,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavItem,
  SaasProvider,
  Sidebar,
  SidebarSection,
} from "@saas-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { IoPlayCircleOutline } from "react-icons/io5";
import { PiHouse, PiHouseFill, PiList, PiUserCircle } from "react-icons/pi";
import { RiVideoAddLine } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { VscHistory } from "react-icons/vsc";

const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />
);

export default function App({ Component, pageProps }: AppProps) {
  const { isOpen, onToggle, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  const path = usePathname();

  useEffect(() => {
    if (path.startsWith("/videos")) {
      onClose();
    }
  }, [path]);

  return (
    <>
      <Head>
        <title>Youtube clone</title>
      </Head>
      <SaasProvider linkComponent={NextLink} theme={theme}>
        <AppShell
          navbar={
            <Navbar
              borderBottomWidth="1px"
              position="sticky"
              top="0"
              border="0px"
              sx={{
                ".sui-navbar__inner": {
                  padding: "0 12px",
                },
              }}
            >
              <NavbarBrand>
                <IconButton
                  variant="ghost"
                  icon={<Icon as={PiList} boxSize="5" />}
                  onClick={onToggle}
                  aria-label="Toggle Sidebar"
                  mr="4"
                />
                <Link href="/">
                  <Image
                    alt="Logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/502px-Logo_of_YouTube_%282015-2017%29.svg.png"
                    width="80px"
                    h="32px"
                  />
                </Link>
              </NavbarBrand>
              <NavbarContent justifyContent="center">
                <NavbarItem>
                  <Search
                    group={{
                      size: "sm",
                      w: "45vw",
                      borderRadius: "full",
                    }}
                    input={{
                      placeholder: "Search...",
                      borderRadius: "full",
                    }}
                  />
                </NavbarItem>
              </NavbarContent>
              <IconButton
                as={Link}
                icon={<Icon as={RiVideoAddLine} boxSize="5" />}
                aria-label="Menu"
                variant="ghost"
                borderRadius="full"
                size="md"
                href="/upload"
              />
              <Avatar name="Abhinav Dhiman" size="sm" />
            </Navbar>
          }
          sidebar={
            <Sidebar
              h="calc(100vh - 58px)"
              maxW={{
                base: "240px",
                sm: "240px",
              }}
              border="0px"
              variant={isOpen ? "default" : "compact"}
              width={isOpen ? "240px" : "14"}
              sx={{
                ".sui-nav-item__inner": {
                  gap: "2",
                },
              }}
            >
              <SidebarSection>
                <NavItem
                  fontSize="sm"
                  cursor="pointer"
                  icon={
                    <Icon
                      boxSize={isOpen ? "4" : "5"}
                      as={path === "/" ? PiHouseFill : PiHouse}
                    />
                  }
                  href="/"
                  isActive={path === "/"}
                >
                  Home
                </NavItem>
                <NavItem
                  fontSize="sm"
                  cursor="pointer"
                  icon={
                    <Icon boxSize={isOpen ? "4" : "5"} as={SiYoutubeshorts} />
                  }
                >
                  Shorts
                </NavItem>
                <NavItem
                  fontSize="sm"
                  cursor="pointer"
                  icon={
                    <Icon boxSize={isOpen ? "4" : "5"} as={BsCollectionPlay} />
                  }
                >
                  Subscriptions
                </NavItem>
                <NavItem
                  fontSize="sm"
                  cursor="pointer"
                  icon={
                    <Icon
                      boxSize={isOpen ? "4" : "5"}
                      as={IoPlayCircleOutline}
                    />
                  }
                >
                  Youtube Music
                </NavItem>
              </SidebarSection>
              <SidebarSection pl="4">
                <Divider borderColor="gray.300" />
              </SidebarSection>
              <SidebarSection>
                <NavItem
                  fontSize="sm"
                  cursor="pointer"
                  icon={<Icon boxSize={isOpen ? "4" : "5"} as={PiUserCircle} />}
                >
                  You
                </NavItem>
                <NavItem
                  fontSize="sm"
                  cursor="pointer"
                  icon={<Icon boxSize={isOpen ? "4" : "5"} as={VscHistory} />}
                >
                  History
                </NavItem>
              </SidebarSection>
            </Sidebar>
          }
        >
          <Component {...pageProps} />
        </AppShell>
      </SaasProvider>
    </>
  );
}
