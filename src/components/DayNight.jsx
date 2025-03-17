import React from 'react';
import styled from 'styled-components';

const Switch = ({ setIsDark }) => {
  const handleToggle = (e) => {
    setIsDark(e.target.checked);
  };

  return (
    <StyledWrapper>
      <div className="wrapper">
        <input type="checkbox" name="checkbox" className="switch" onChange={handleToggle}/>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    width: 120px;
    height: 40px;
    margin: 0px;
    appearance: none;
    -webkit-appearance: none;
    background-color: rgb(4,52,73);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px;
    transition: background-image .7s ease-in-out;
    outline: none;
    cursor: pointer;
    overflow: hidden;
  }

  /* Responsive scaling */
  @media (max-width: 768px) {
    .switch {
      width: 90px;
      height: 32px;
    }

    .switch:after {
      width: 28px;
      height: 28px;
    }

    .switch:checked:after {
      transform: translateX(58px);
    }
    .switch:before,
  .switch:checked:before {
    width: 12px;
    height: 12px;
    top: 4px;
    left: 12px;
    transform-origin: 45px 8px;
  }
    @keyframes on {
      0% {
        transform: translateX(0px);
        width: 28px;
      }
      50% {
        width: 50px;
        border-radius: 15px;
      }
      100% {
        transform: translateX(58px);
        width: 28px;
      }
    }

    @keyframes off {
      0% {
        transform: translateX(58px);
        width: 28px;
      }
      50% {
        width: 50px;
        border-radius: 15px;
      }
      100% {
        transform: translateX(0px);
        width: 28px;
      }
    }
  }

  .switch:checked {
    background-color: rgb(0, 195, 255);
    background-size: cover;
    transition: background-image 1s ease-in-out;
  }

  .switch:after {
    content: '';
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: 2px;
    top: 2px;
    transform: translateX(0px);
    animation: off .7s forwards cubic-bezier(.8, .5, .2, 1.4);
    box-shadow: inset 5px -5px 4px rgba(53, 53, 53, 0.3);
  }

  .switch:checked:after {
    animation: on .7s forwards cubic-bezier(.8, .5, .2, 1.4);
    box-shadow: inset -5px -5px 4px rgba(53, 53, 53, 0.3);
  }

  @keyframes on {
    0% {
      transform: translateX(0px);
      width: 36px;
    }
    50% {
      width: 65px;
      border-radius: 15px;
    }
    100% {
      transform: translateX(80px);
      width: 36px;
    }
  }

  @keyframes off {
    0% {
      transform: translateX(80px);
      width: 36px;
    }
    50% {
      width: 65px;
      border-radius: 15px;
    }
    100% {
      transform: translateX(0px);
      width: 36px;
    }
  }

  .switch:checked:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    left: 15px;
    top: 5px;
    transform-origin: 53px 10px;
    background-color: transparent;
    box-shadow: 5px -1px 0px #fff;
    filter: blur(0px);
    animation: sun .7s forwards ease;
  }

  @keyframes sun {
    0% {
      transform: rotate(170deg);
      background-color: transparent;
      box-shadow: 5px -1px 0px #fff;
      filter: blur(0px);
    }
    50% {
      background-color: transparent;
      box-shadow: 5px -1px 0px #fff;
      filter: blur(0px);
    }
    90% {
      background-color: #f5daaa;
      box-shadow: 0px 0px 10px #f5deb4,
        0px 0px 20px #f5deb4,
        0px 0px 30px #f5deb4,
        inset 0px 0px 2px #efd3a3;
      filter: blur(1px);
    }
    100% {
      transform: rotate(0deg);
      background-color: #f5daaa;
      box-shadow: 0px 0px 10px #f5deb4,
        0px 0px 20px #f5deb4,
        0px 0px 30px #f5deb4,
        inset 0px 0px 2px #efd3a3;
      filter: blur(1px);
    }
  }

  .switch:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    left: 15px;
    top: 5px;
    filter: blur(1px);
    background-color: #f5daaa;
    box-shadow: 0px 0px 10px #f5deb4,
      0px 0px 20px #f5deb4,
      0px 0px 30px #f5deb4,
      inset 0px 0px 2px #efd3a3;
    transform-origin: 53px 10px;
    animation: moon .7s forwards ease;
  }

  @keyframes moon {
    0% {
      transform: rotate(0deg);
      filter: blur(1px);
    }
    50% {
      filter: blur(1px);
    }
    90% {
      background-color: transparent;
      box-shadow: 5px -1px 0px #fff;
      filter: blur(0px);
    }
    100% {
      transform: rotate(170deg);
      background-color: transparent;
      box-shadow: 5px -1px 0px #fff;
      filter: blur(0px);
    }
  }
`;

export default Switch;
