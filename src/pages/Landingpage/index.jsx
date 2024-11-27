import React from 'react';
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
      <ElevateUML />
      <WhatIsAiUML />
      <Features />
      <Diagrams />
      <Clients />
      <ConnectWithUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
