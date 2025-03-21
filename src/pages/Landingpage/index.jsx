import React from 'react';
import Header from './Header';
import ElevateUML from './ElevateUML';
import WhatIsAiUML from './WhatIsAiUML';
import Features from './Features';
import Diagrams from './Diagrams';
import Clients from './Clients';
import ConnectWithUs from './ConnectWithUs';
import Footer from './Footer';

const LandingPage = ({ setIsDark, setIsGuest }) => {
  return (
    <div className="bg-white dark:bg-gray-700 transition duration-300 ease-in-out">
        <Header setIsDark={setIsDark} setIsGuest={setIsGuest} />
        {/* ... other sections */}
        <div>
        <div id="about">
          <ElevateUML />
        </div>
        <div id="features">
          <WhatIsAiUML />
          <Features />
        </div>
        <div id="diagrams">
          <Diagrams />
        </div>
        <div id="clients">
          <Clients />
        </div>
        <div id="contact">
          <ConnectWithUs />
        </div>
        <Footer />
      </div>
    </div>

    
  );
};

export default LandingPage;
