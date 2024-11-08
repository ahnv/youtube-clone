import type { AppProps } from "next/app";
import Link, { LinkProps } from "next/link";
import React from "react";
import {
  AppShell,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavItem,
  SaasProvider,
  SearchInput,
  Sidebar,
  SidebarSection,
} from "@saas-ui/react";
import { theme } from "@/theme";
import { Divider, Icon, Image } from "@chakra-ui/react";
import { PiHouse } from "react-icons/pi";

const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => <Link ref={ref} {...props} />);

NextLink.displayName = "NextLink";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SaasProvider linkComponent={NextLink} theme={theme}>
      <AppShell
        navbar={
          <Navbar borderBottomWidth="1px" position="sticky" top="0">
            <NavbarBrand>
              <Image alt="Logo" src="https://ik.imgkit.net/ikmedia/logo/light_T4buIzohVH.svg" width="120px" />
            </NavbarBrand>
            <NavbarContent justifyContent="flex-end">
              <NavbarItem>
                <SearchInput size="sm" />
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        }
        sidebar={
          <Sidebar h="calc(100vh - 58px)">
            <SidebarSection>
              <NavItem icon={<Icon as={PiHouse} />}>Home</NavItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <Component {...pageProps} />
      </AppShell>
    </SaasProvider>
  );
}
