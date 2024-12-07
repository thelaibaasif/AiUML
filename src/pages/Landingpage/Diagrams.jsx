import React from "react";
import diagramImage from "../../images/Diagram.png"; // Replace with your image path

const Diagrams = () => {
  return (
    <section className="diagrams-section py-16 relative bg-white">
      <h2 className="font-bold text-red-700 text-2xl text-center mb-8">
        Diagrams
      </h2>
      <div className="relative flex justify-center">
        {/* Diagram Image */}
        <img
          src={diagramImage}
          alt="Diagram Types"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>
    </section>
  );
};

export default Diagrams;
