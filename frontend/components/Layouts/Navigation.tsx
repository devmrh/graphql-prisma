
import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { useTransition, animated } from "react-spring";
import { ReactComponent as Explore } from "../explore.svg";
import { ReactComponent as Avatar } from "../avatar.svg";
import { ReactComponent as Compass } from "../compass.svg";
import tw from "tailwind.macro";
import styled from "styled-components";




const NavHeader = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
`;

const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`;

const Input = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;

  &:active,
  &:focus {
    text-align: left;
  }
`;

const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
  display: flex;
  svg {
    margin-right: 20px;
  }
`;


// const rightSideMenus = styled.div.attrs({
//   className: "flex flex-col h-screen justify-center items-center bg-gray-100 w-",
// })

// const RightSideMenu = styled.div`
//   ${tw`fixed bg-white top-0 left-0 w-1/5 h-full z-50 shadow`};
// `;

// const MenuMask = styled.div`
//   ${tw`bg-black-t-50 fixed top-0 left-0 w-full h-full z-49`};
// `;
const MenuLink = styled.a``;




function Navigation(props) {
  const [showMenu, setShowMenu] = useState(false);


  // function sendData() {
  //   props.parentCallback(true);
  // };


  const maskTransitions = useTransition(showMenu, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const menuTransitions = useTransition(showMenu, null, {
    config: { mass: 1, tension: 300, friction: 25 },
    from: { opacity: 0, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" },
  });
  return (
    <Fragment>
            <NavHeader>
        <NavLeft>devmrh</NavLeft>

        <NavCenter>
          <Input type="text" placeholder="Search" />
        </NavCenter>

        <NavRight>
          <MenuLink href="#">
            <Compass />
          </MenuLink>

          <MenuLink href="#">
            <Explore />
          </MenuLink>

          <MenuLink href="#">
            <Avatar  onClick={ props.openLoginModal }/>
          </MenuLink>

          <MenuLink href="#"  onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon
              icon={faBars}
            />
          </MenuLink>
        </NavRight>
      </NavHeader>
      {maskTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              onClick={() => setShowMenu(false)}
              className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-49"
            ></animated.div>
          )
      )}

      {menuTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="fixed bg-white top-0 left-0 w-1/5 h-full z-50 shadow p-3"
            >
              <div className="font-bold py-3">AppName</div>
              <ul>
                <li>
                  <a
                    className="text-blue-500 py-3 border-t border-b block cursor-pointer"
                    onClick={() => setShowMenu(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-blue-500 py-3 border-b block cursor-pointer"
                    onClick={() => setShowMenu(false)}
                  >
                    About
                  </a>
                </li>
              </ul>
            </animated.div>
          )
      )}

      {/* {showMenu && <Fragment><RightSideMenu>The menu</RightSideMenu><MenuMask onClick={ ()=> setShowMenu(false) }></MenuMask></Fragment> } */}
    </Fragment>
  );
}

export default Navigation;