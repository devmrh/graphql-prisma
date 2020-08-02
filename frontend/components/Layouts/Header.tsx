// Header.js
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Navigation from './Navigation';

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

function auth() {
  console.log("somthing happend");
}

function Header() {
  const [status, setStatus] = useState(false);




  return (
    <Nav>

        <Navigation openLoginModal={ () => setStatus(true) }/>
      <div>
        {status && (
          <Modal closeModal={() => setStatus(false)}>
            <h3>login</h3>
            <form>
              <input></input>
            </form>
          </Modal>
        )}
      </div>
    </Nav>
  );
}

export default Header;
