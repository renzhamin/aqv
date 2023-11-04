import React from "react";
import "./Navigation.css";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as ScrollLink } from 'react-scroll';

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Navigation = () => {
  var count = 0;

  const respNav = () => {
    count = (count + 1) % 2;
    var navMenu = document.querySelector(`.navMain`);
    if (count == 1) {
      navMenu.style.transform = "translateY(0)";
      navMenu.style.visibility = "visible";

      document.querySelector(".navBarIconBurger").style.visibility = "hidden";
      document.querySelector(".navBarIconCross").style.visibility = "visible";
    } else {
      navMenu.style.transform = "translateY(-50vh)";
      navMenu.style.visibility = "hidden";

      document.querySelector(".navBarIconBurger").style.visibility = "visible";
      document.querySelector(".navBarIconCross").style.visibility = "hidden";
    }
  };

  const ShowTopVideo = () => {
    const topVideo = document.querySelector(".topVideo");
    // alert(topVideo);
    topVideo.style.visibility = "visible";
  };
  const HideTopVideo = () => {
    const topVideo = document.querySelector(".topVideo");
    topVideo.style.visibility = "hidden";
  };
  return (
    <>
      <div className="navigation">
        <div className="logoBar">
          <a href="/">
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/weather/weather-icon.png"
              alt="navlogo"
              className="my-auto"
            />
          </a>

          <div className="my-auto navBarIconBar">
            <GiHamburgerMenu
              className="my-auto navBurgerIcon navBarIconBurger"
              onClick={() => respNav()}
            />
            <ImCross
              className="my-auto navBurgerIcon navBarIconCross"
              onClick={() => respNav()}
            />
          </div>
        </div>
        <div className="navMain">
          <div className="navMenu">
            <div className="my-auto navSubMenu">
              {/* <Link to="" className="navMenuPageLinks">
                Home
              </Link> */}
              <ScrollLink to="map" smooth={true} duration={200} className='navMenuPageLinks'>Home</ScrollLink>
              <ScrollLink to="map" smooth={true} duration={200} className='navMenuPageLinks'>Map</ScrollLink>
              <ScrollLink to="worstCities" smooth={true} duration={200} className='navMenuPageLinks'>Worst Cities</ScrollLink>
              <ScrollLink to="bestCities" smooth={true} duration={200} className='navMenuPageLinks'>Best Cities</ScrollLink>
            </div>
          </div>
          <div className="navExtra" onClick={() => respNav()}></div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
