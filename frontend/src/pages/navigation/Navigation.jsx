import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link as ScrollLink } from "react-scroll";
import "./Navigation.css";
import { ModeToggle } from "@/components/darkToggle";

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

  return (
    <>
      <div className="navigation bg-accent">
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
              <ScrollLink
                to="map"
                smooth={true}
                duration={200}
                className="navMenuPageLinks"
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="map"
                smooth={true}
                duration={200}
                className="navMenuPageLinks"
              >
                Map
              </ScrollLink>
              <ScrollLink
                to="worstCities"
                smooth={true}
                duration={200}
                className="navMenuPageLinks"
              >
                Worst Cities
              </ScrollLink>
              <ScrollLink
                to="bestCities"
                smooth={true}
                duration={200}
                className="navMenuPageLinks"
              >
                Best Cities
              </ScrollLink>
              <ModeToggle />
            </div>
          </div>
          <div className="navExtra" onClick={() => respNav()}></div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
