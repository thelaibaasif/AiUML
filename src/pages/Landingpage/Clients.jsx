import React from "react";
import client from "../../images/client.png"; // Replace with your actual image paths

const testimonials = [
  {
    name: "Mam Noor ul Ain",
    feedback: "Amazing Tool for diagram creative",
    platform: "Google",
    rating: 5,
    image: client,
  },
  {
    name: "Dr Javeria Imtiaz",
    feedback: "Waoo I really enjoyed its interface!",
    platform: "Google",
    rating: 5,
    image: client,
  },
  {
    name: "Laiba",
    feedback: "Makes my work easier, so accurate results!",
    platform: "Google",
    rating: 5,
    image: client,
  },
];

const Clients = () => {
  return (
    <section className="clients-section py-16">
      <h2 className="font-bold text-4xl text-center text-red-700 mb-8">
        Clients
      </h2>
      <div className="flex justify-center gap-8 px-4 flex-wrap">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#FEF9E7] border-2 border-yellow-300 rounded-lg p-6 shadow-md text-center w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] flex flex-col items-center"
          >
            <p className="text-gray-800 mb-4">{testimonial.feedback}</p>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />
              <div>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.platform}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              {[...Array(testimonial.rating)].map((_, starIndex) => (
                <span key={starIndex} className="text-yellow-500 text-xl">
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
