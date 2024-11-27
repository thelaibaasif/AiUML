import React from 'react';
import umlDiagram1 from "../../images/umlDiagram1.jpeg";
import umlDiagram2 from "../../images/umlDiagram2.jpeg";

const WhatIsAiUML = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 px-12 py-16 bg-white">
      {/* Images Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:w-1/2">
        <div className="flex flex-col items-center">
          <img
            src={umlDiagram1}
            alt="Admin Website Diagram"
            className="w-72 h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col items-center">
          <img
            src={umlDiagram2}
            alt="Library Diagram"
            className="w-72 h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Text Section with Box */}
      <div className="lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-700 mb-4 text-left">What is AiUML?</h2>
        <p className="text-gray-600 leading-relaxed text-left">
          AiUML is a tool for the developer community which utilizes Generative AI to
          automatically create accurate UML diagrams from plain textual descriptions.
          By harnessing the power of Large Language Models, it simplifies and
          accelerates the software design process.
        </p>
      </div>
    </div>
  );
};

export default WhatIsAiUML;
