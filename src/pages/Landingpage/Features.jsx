export const Features = () => {
    const features = [
      { id: 1, title: "Text analysis, entity extraction", image: "/images/feature1.png" },
      { id: 2, title: "From text to diagrams", image: "/images/feature2.png" },
      { id: 3, title: "Pattern recognition & optimization", image: "/images/feature3.png" },
      { id: 4, title: "Handles software descriptions", image: "/images/feature4.png" },
      { id: 5, title: "Interactive editor & customization", image: "/images/feature5.png" },
      { id: 6, title: "Class, use-case, ERD diagrams", image: "/images/feature6.png" },
      { id: 7, title: "Export in SVG/PNG", image: "/images/feature7.png" },
      { id: 8, title: "Stores previous diagrams", image: "/images/feature8.png" },
    ];
  
    return (
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-item">
            <img src={feature.image} alt={feature.title} />
            <p>{feature.title}</p>
          </div>
        ))}
      </div>
    );
  };
  