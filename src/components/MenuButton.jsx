import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
//import Feedback from "./Feedback";

const MenuButton = () => {
  

const menuRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowOptions(!showOptions);

  
  return (
    <StyledWrapper>
      <div className="menu-wrapper" ref={menuRef}>

        {/* Menu Button */}
        <div className="nav_bar" onClick={toggleMenu}>
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar4" />
        </div>

        {/* Menu Options */}
        {showOptions && (
          <div className="input mt-4">
            <button className="value" onClick={() => navigate("/profile")}> {/* Added navigation */}
              <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z" fill="#7D8590" /></svg>
              Personal profile
            </button>
            <button className="value" onClick={() => navigate("/plans")}>
  Plans
</button>

            <button className="value" onClick={() => alert("Logged in as: sampleuser@example.com")}>
  {/* Account Icon */}
  Account
</button>

            <button className="value" onClick={() => navigate("/Feedback")}>
              {/* Feedback Icon */}
              Feedback
            </button>

            <button className="value" onClick={() => navigate("/")}>
  {/* Logout Icon */}
  Logout
</button>

          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .menu-wrapper {
    position: relative;
    display: inline-block;
  }

  .nav_bar {
    background-color: rgb(110, 24, 53);
    display: flex;
    transition: 0.4s;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
    border-radius: 15px;
    cursor: pointer;
    
  }

  .bar1, .bar2, .bar3_h, .bar4 {
    border-radius: 30px;
    background-color: white;
    width: 36px;
    height: 1px;
    transition: 0.4s;
  }

  .bar1 { margin-bottom: 15px; }
  .bar4 { margin-top: 15px; }

  .nav_bar:hover { border-radius: 50px; }
  .nav_bar:hover .bar3_h { transform: rotate(-45deg); }
  .nav_bar:hover .bar2 { transform: rotate(45deg); }
  .nav_bar:hover .bar1,
  .nav_bar:hover .bar4 {
    opacity: 0;
    width: 30px;
  }

  .input {
    margin-top: 10px;
    background-color:rgb(165, 17, 79);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: 200px;
    position: absolute;
    top: 100%;
    z-index: 10;
  }

  .value {
    background-color: transparent;
    border: none;
    padding: 10px;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .value:hover {
    background-color: #21262C;
  }

  .value:focus,
  .value:active {
    background-color: #1A1F24;
    outline: none;
  }

  .value::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -10px;
    width: 5px;
    height: 80%;
    background-color: #2F81F7;
    border-radius: 5px;
    opacity: 0;
  }

  .value:focus::before,
  .value:active::before {
    opacity: 1;
  }

  .value svg {
    width: 15px;
    height: 15px;
  }
`;

export default MenuButton;
