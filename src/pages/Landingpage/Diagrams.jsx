import React from "react";
import diagramImage from "../../images/Diagram.png"; 

const Diagrams = () => {
  return (
    
      <section className="py-24 bg-white w-full dark:bg-gray-600 dark:text-white">
        {/* Section Title */}
        <h2 className=" text-center text-red-700 font-extrabold text-5xl mb-16">
          Diagrams
        </h2>

        {/* Diagram Image */}
        <div className="flex justify-center px-4 sm:px-6">
          <img
            src={diagramImage}
            alt="Diagram Types"
            className="w-[70%] max-w-[700px] h-auto rounded-xl"
          />
        </div>
      </section>
      
  );
};

export default Diagrams;
