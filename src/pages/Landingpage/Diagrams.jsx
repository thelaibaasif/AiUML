import React from "react";
import diagramImage from "../../images/diagram.png"; // Replace with your image path

const Diagrams = () => {
  return (
    <section className="diagrams-section py-16 relative">
      <h2 className="font-bold text-red-700 text-2xl text-center mb-8">
        Diagrams
      </h2>
      <div className="relative flex justify-center">
        {/* Diagram Image */}
        <img
          src={diagramImage}
          alt="Diagram Types"
          className="w-3/4 md:w-1/2 lg:w-1/3"
        />
        {/* Overlay Text Labels */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="absolute top-[15%] left-[10%] text-center">
            <p className="text-gray-700 font-bold">Class Diagram</p>
          </div>
          <div className="absolute top-[10%] right-[15%] text-center">
            <p className="text-gray-700 font-bold">Use Case Diagram</p>
          </div>
          <div className="absolute bottom-[25%] left-[10%] text-center">
            <p className="text-gray-700 font-bold">Sequence Diagram</p>
          </div>
          <div className="absolute bottom-[20%] right-[15%] text-center">
            <p className="text-gray-700 font-bold">ERD Diagram</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diagrams;
