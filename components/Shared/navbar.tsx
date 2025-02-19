"use client"

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { GrFavorite } from "react-icons/gr";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Logo,
} from "@/components/icons";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import RegistrationModal from "../registrationModal";
import LoginModal from "../loginModal";
import { Button } from "@nextui-org/button";

export const Navbar = () => {


  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginClicked, setIsLoginClicked] = useState(false)
  const handleLoginOpen = () => {
    setIsModalOpen(false)
    return setIsLoginClicked(true)

  }
  const handleLoginClose = () => {
    return setIsLoginClicked(false)
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
    return setIsLoginClicked(false)
  }
  console.log(isModalOpen)
  const handleModalClose = () => {
    return setIsModalOpen(false)
  }
  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <NextUINavbar className={clsx(
      "transition-colors duration-300 h-24",
      isScrolled ? "" : "bg-transparent"
    )} maxWidth="xl" position="sticky">

      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <div className="flex flex-col justify-end items-end">
            <Logo />
            {/* <p className="text-right"><span className="text-xl">An nahda</span> <br /> Academy</p> */}
          </div>
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="basis-1/5 sm:basis-full flex items-center justify-between py-3 pt-0" justify="end">


        <ul className="hidden w-full lg:flex gap-10 justify-end mx-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              {item.label === "Login" ? <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
                onClick={handleModalOpen}
              >
                {item.label}
              </NextLink> : <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>}

            </NavbarItem>
          ))}
        </ul>


        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
        >
          <NavbarItem className="hidden sm:flex gap-4">
            <Link className="text-blue-950" href="/">
              <FaCartShopping size={20} />
            </Link>
            <Link className="text-blue-950" href="/favourites">
              <GrFavorite size={20} />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <div>
          <Button onClick={handleModalOpen} className="border-none rounded-full bg-violet-500" color="primary">Login/Register</Button>
        </div>

      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-20 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

        </div>
      </NavbarMenu>

      <>



        {isModalOpen && <RegistrationModal handleLoginOpen={handleLoginOpen} isOpen={isModalOpen} onClose={handleModalClose} />}
        {isLoginClicked && <LoginModal handleModalOpen={handleModalOpen}  isOpen={isLoginClicked} onClose={handleLoginClose} />}
      </>


    </NextUINavbar>
  );
};
