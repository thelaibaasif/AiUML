import React from 'react';
import umlDiagram from "../../images/umlDiagramCombined.png"; // merged image if available

const WhatIsAiUML = () => {
  return (
    <div className="dark:text-white dark:bg-gray-600  w-full py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={umlDiagram}
            alt="UML Diagrams"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 ">
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-6 text-left">
            What is AiUML?
          </h2>
          <p className="dark:text-white text-xl text-gray-700 leading-relaxed text-justify">
            AiUML is a tool for the developer community which utilizes Generative AI
            to automatically create accurate UML diagrams from plain textual
            descriptions. By harnessing the power of Large Language Models,
            it simplifies and accelerates the software design process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatIsAiUML;
