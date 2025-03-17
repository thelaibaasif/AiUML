import React from "react";
import feature1 from "../../images/feature1.jpeg";
import feature2 from "../../images/feature2.png";
import feature3 from "../../images/feature3.png";
import feature4 from "../../images/feature444.png";
import feature5 from "../../images/feature5.png";
import feature6 from "../../images/feature66.png";
import feature7 from "../../images/feature7.png";
import feature8 from "../../images/feature8.png";

const features = [
  {
    id: "01",
    title: "Text analysis, entity extraction, relationship mapping",
    image: feature1,
    bgClass: "",
    curveClass: "",
  },
  {
    id: "02",
    title: "From text, software requirements, and simple prompts using GenerativeAI",
    image: feature2,
    bgClass: "bg-[#e9f5fc]",
    curveClass: "rounded-tl-[250px] rounded-bl-[250px]",
  },
  {
    id: "03",
    title: "Pattern recognition, optimization, modeling complex relationships",
    image: feature3,
    bgClass: "",
    curveClass: "",
  },
  {
    id: "04",
    title: "Can take software descriptions, and requirements as well",
    image: feature4,
    bgClass: "bg-[#e9f5fc]",
    curveClass: "rounded-tr-[250px] rounded-br-[250px]",
  },
  {
    id: "05",
    title: "Interactive editor, code editing, text commands, customization options",
    image: feature5,
    bgClass: "",
    curveClass: "",
  },
  {
    id: "06",
    title: "Class, usecase, sequence, ERD diagrams",
    image: feature6,
    bgClass: "bg-[#e9f5fc]",
    curveClass: "rounded-tl-[250px] rounded-bl-[250px]",
  },
  {
    id: "07",
    title: "Export in SVG, PNG, and more",
    image: feature7,
    bgClass: "",
    curveClass: "",
  },
  {
    id: "08",
    title: "Stores previous chats, diagrams, and their codes",
    image: feature8,
    bgClass: "bg-[#e9f5fc]",
    curveClass: "rounded-tr-[250px] rounded-br-[250px]",
  },
];

const Features = () => {
  return (
    <section className="w-full py-20">
      <h2 className="text-center text-red-700 font-extrabold text-5xl mb-16">
        Features
      </h2>

      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`flex flex-col lg:flex-row items-center justify-between w-full py-20 gap-12 ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          } ${feature.bgClass} ${feature.curveClass}`}
        >
          {/* Text Section */}
          <div className="w-full lg:w-1/2 px-6 lg:px-20">
            <div className="flex items-start gap-6">
              {/* Big Number */}
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-extrabold text-gray-400 leading-none">

                {feature.id}
              </span>

              {/* Multi-line Description */}
              <div className="text-black text-lg sm:text-xl md:text-2xl lg:text-[30px] font-semibold leading-snug space-y-2">

                {feature.title.split(",").map((line, i) => (
                  <p key={i}>{line.trim()}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 px-6 lg:px-20">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-[80%] max-w-[600px] h-auto mx-auto rounded-xl"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
