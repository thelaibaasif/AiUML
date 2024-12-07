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
    bgClass: "bg-light-blue",
    curveClass: "rounded-bl-200px rounded-tl-200px",
  },
  {
    id: "03",
    title: "Pattern recognition, optimization, and modeling complex relationships",
    image: feature3,
    bgClass: "",
    curveClass: "",
  },
  {
    id: "04",
    title: "Can take software descriptions and requirements as well",
    image: feature4,
    bgClass: "bg-light-blue",
    curveClass: "rounded-br-200px rounded-tr-200px",
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
    bgClass: "bg-light-blue",
    curveClass: "rounded-bl-200px rounded-tl-200px",
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
    bgClass: "bg-light-blue",
    curveClass: "rounded-br-200px rounded-tr-200px",
  },
];

const Features = () => {
  return (
    <section className="container mx-auto px-0 py-16">
      <h2 className="text-center text-red-700 font-bold text-2xl mb-8">
        Features
      </h2>
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`flex items-center w-full py-12 ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          } ${feature.bgClass} ${feature.curveClass} px-8`}
        >
          <div className="w-1/2 p-8">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 text-center md:text-left p-8">
            <h3 className="text-gray-800 text-4xl font-bold mb-4">
              {feature.id}
            </h3>
            <p className="text-gray-600 text-lg">{feature.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
