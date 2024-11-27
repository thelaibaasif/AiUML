export const Clients = () => {
    const testimonials = [
      { name: "Man Noor", text: "Amazing tool for diagram creation", rating: 5 },
      { name: "Dr. Jane", text: "Enjoyed the interface!", rating: 5 },
      { name: "Laiba", text: "Accurate results!", rating: 5 },
    ];
  
    return (
      <div className="clients-section">
        <h2 className="font-bold text-xl text-center">Clients</h2>
        <div className="grid grid-cols-3 gap-6">
          {testimonials.map((client, idx) => (
            <div key={idx} className="testimonial-card">
              <p>{client.text}</p>
              <p className="font-bold">{client.name}</p>
              <p>{'⭐'.repeat(client.rating)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  