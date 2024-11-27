import React from 'react';
import Header from './Header';
import ElevateUML from './ElevateUML';
import WhatIsAiUML from './WhatIsAiUML';
import Features from './Features';
import Diagrams from './Diagrams';
import Clients from './Clients';
import ConnectWithUs from './ConnectWithUs';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div>
      <Header />
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
  );
};

export default LandingPage;
