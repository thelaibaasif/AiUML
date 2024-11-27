import React from 'react';
import keyboard from "../../images/keyboard.png";
import automation from "../../images/automation.png";
import robot from "../../images/robot.png";
import customization from "../../images/customization.png";

const ElevateUML = () => {
  return (
    <div className="elevate-uml-section py-16 bg-white">
      {/* Title Section */}
      <h2 className="text-center text-3xl font-bold text-red-700">
        Elevate Your UML Experience
      </h2>
      <p className="text-center text-gray-600 mt-4 mb-8">
        Unleashing Creativity with AI-Powered UML Diagrams
      </p>

      {/* Features Grid with Boxes */}
      <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-6 hover:shadow-lg">
          <img src={keyboard} alt="Input" className="w-16 h-16 mb-4" />
          <p className="font-semibold text-lg">
            Unrestrictive Textual Input and Prompts
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-6 hover:shadow-lg">
          <img src={automation} alt="Automation" className="w-16 h-16 mb-4" />
          <p className="font-semibold text-lg">
            Automated Diagram Generation
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-6 hover:shadow-lg">
          <img src={robot} alt="AI Optimization" className="w-16 h-16 mb-4" />
          <p className="font-semibold text-lg">
            AI Based Diagram Optimization
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-6 hover:shadow-lg">
          <img
            src={customization}
            alt="Customization"
            className="w-16 h-16 mb-4"
          />
          <p className="font-semibold text-lg">
            Diagram Editing and Customization
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElevateUML;
