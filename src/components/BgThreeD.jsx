import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="bubble">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bubble">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bubble">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bubble">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bubble">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f0f4f8;
  overflow: hidden;
  position: relative;

  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .bubble {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.25);
    animation: animate_4010 8s ease-in-out infinite;
  }

  .bubble:nth-child(2) {
    zoom: 0.45;
    left: -10px;
    top: -100px;
    animation-delay: -4s;
  }

  .bubble:nth-child(3) {
    zoom: 0.45;
    right: -80px;
    top: -300px;
    animation-delay: -6s;
  }

  .bubble:nth-child(4) {
    zoom: 0.35;
    left: -120px;
    bottom: -200px;
    animation-delay: -3s;
  }

  .bubble:nth-child(5) {
    zoom: 0.5;
    left: 0px;
    top: 200px;
    animation-delay: -5s;
  }

  @keyframes animate_4010 {
    0%, 100% {
      transform: translateY(-20px);
    }
    50% {
      transform: translateY(20px);
    }
  }

  .bubble::before,
  .bubble::after {
    content: '';
    position: absolute;
    background: #fff;
    border-radius: 50%;
    z-index: 10;
    filter: blur(2px);
  }

  .bubble::before {
    top: 50px;
    left: 45px;
    width: 30px;
    height: 30px;
  }

  .bubble::after {
    top: 80px;
    left: 80px;
    width: 20px;
    height: 20px;
  }

  .bubble span {
    position: absolute;
    border-radius: 50%;
  }

  .bubble span:nth-child(1) {
    inset: 10px;
    border-left: 15px solid #0fb4ff;
    filter: blur(8px);
  }

  .bubble span:nth-child(2) {
    inset: 10px;
    border-right: 15px solid #ff4484;
    filter: blur(8px);
  }

  .bubble span:nth-child(3) {
    inset: 10px;
    border-top: 15px solid #ffeb3b;
    filter: blur(8px);
  }

  .bubble span:nth-child(4) {
    inset: 30px;
    border-left: 15px solid #ff4484;
    filter: blur(12px);
  }

  .bubble span:nth-child(5) {
    inset: 10px;
    border-bottom: 10px solid #fff;
    filter: blur(8px);
    transform: rotate(330deg);
  }
`;

export default Loader;
