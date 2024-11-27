import React from 'react';

const ElevateUML = () => {
  return (
    <div className="elevate-uml-section">
      <h2 className="text-center text-xl font-bold">Elevate Your UML Experience</h2>
      <p className="text-center text-gray-600">
        Unleashing Creativity with AI-Powered UML Diagrams
      </p>
      <div className="features-grid grid grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <img src="/icons/keyboard.png" alt="Input" />
          <p className="font-semibold">Unrestrictive Textual Input and Prompts</p>
        </div>
        <div className="text-center">
          <img src="/icons/automation.png" alt="Automation" />
          <p className="font-semibold">Automated Diagram Generation</p>
        </div>
        <div className="text-center">
          <img src="/icons/robot.png" alt="AI Optimization" />
          <p className="font-semibold">AI Based Diagram Optimization</p>
        </div>
        <div className="text-center">
          <img src="/icons/customization.png" alt="Customization" />
          <p className="font-semibold">Diagram Editing and Customization</p>
        </div>
      </div>
    </div>
 );
};
export default ElevateUML;