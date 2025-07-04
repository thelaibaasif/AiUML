import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} aria-label="Go back">
        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z" /></svg>
        <span className="label">Back</span>
      </button>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 1rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    padding: 0.5em 1.2em;
    transition: all 0.2s linear;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  }

  button:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-2px);
  }

  button > svg {
    margin-right: 6px;
    font-size: 16px;
    transition: all 0.3s ease;
  }

  button:hover > svg {
    transform: translateX(-5px);
  }

  .label {
    font-weight: 500;
    font-size: 14px;
  }
`;

export default Button;
