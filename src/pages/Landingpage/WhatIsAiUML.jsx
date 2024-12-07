import React from 'react';
import umlDiagram1 from "../../images/umlDiagram1.jpeg";
import umlDiagram2 from "../../images/umlDiagram2.jpeg";

const WhatIsAiUML = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 px-6 lg:px-16 py-12 bg-white max-w-7xl mx-auto">
      {/* Images Section */}
      <div className="flex flex-col items-center gap-6 lg:w-1/3">
        <img
          src={umlDiagram1}
          alt="Admin Website Diagram"
          className="w-full lg:w-[250px] h-auto rounded-lg shadow-md"
        />
        <img
          src={umlDiagram2}
          alt="Library Diagram"
          className="w-full lg:w-[250px] h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Text Section */}
      <div className="lg:w-2/3">
        <h2 className="text-3xl font-bold text-red-700 mb-4 text-left">
          What is AiUML?
        </h2>
        <p className="text-gray-600 leading-relaxed text-justify">
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
