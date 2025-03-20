import React from "react";
import { useNavigate } from "react-router-dom";
import GoBack from "./GoBack";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "3 diagram/day",
      "Basic diagram types",
      "Limited AI enhancement",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Basic",
    price: "$5/mo",
    features: [
      "5 diagrams/day",
      "Priority processing",
      "Email support",
    ],
    button: "Subscribe",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$10/mo",
    features: [
      "10 diagrams/day",
      "Advanced AI suggestions",
      "Downloadable exports (PNG, SVG)",
    ],
    button: "Most Popular",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited diagrams",
      "Team collaboration",
      "Priority support & SLA",
    ],
    button: "Contact Us",
    highlight: false,
  },
];

const PlanCard = ({ plan }) => (
  <div className={`rounded-xl p-6 shadow-lg border h-full flex flex-col justify-between ${
    plan.highlight ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white" : "bg-white"
  } transition-all hover:scale-105`}>  
    <h3 className="text-xl font-bold mb-2 text-center">{plan.name}</h3>
    <p className="text-3xl font-extrabold text-center mb-4">{plan.price}</p>
    <ul className="mb-4 space-y-2 text-sm">
      {plan.features.map((f, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="text-green-500">✔</span> {f}
        </li>
      ))}
    </ul>
    <div className="text-center">
      <button className={`px-4 py-2 rounded-full font-semibold ${
        plan.highlight
          ? "bg-white text-purple-700 hover:bg-gray-200"
          : "bg-red-700 text-white hover:bg-gray-700"
      }`}>
        {plan.button}
      </button>
    </div>
  </div>
);

const BusinessPlanPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <GoBack onClick={() => navigate(-1)} />
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-red-700 mb-10">Choose Your Plan</h1>
            <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
            Scale your UML diagram needs as you grow. Choose the right plan for students, developers, and teams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, idx) => (
                <PlanCard key={idx} plan={plan} />
            ))}
            </div>

            <div className="mt-16 text-center text-gray-600 text-sm">
            Need custom usage limits or team billing? <a href="#" className="text-blue-600 hover:underline">Contact Sales</a>
            </div>
        </div>
        </div>
    );
};

export default BusinessPlanPage;
