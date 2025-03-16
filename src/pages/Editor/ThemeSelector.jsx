import React from "react";

const themes = [
    { name: "amiga", colors: ["#7F3FBF", "#F370A7"] },
    { name: "plain", colors: ["#FFFFFF", "#D1D5DB"] },
    { name: "reddress-darkblue", colors: ["#1E3A8A", "#FF4F81"] },
    { name: "reddress-darkgreen", colors: ["#065F46", "#FF6384"] },
    { name: "reddress-darkorange", colors: ["#9A3412", "#FF7043"] },
    { name: "reddress-darkred", colors: ["#7F1D1D", "#FF5C58"] },
    { name: "reddress-lightblue", colors: ["#D0F0FD", "#FC4C93"] },
    { name: "reddress-lightgreen", colors: ["#CCFBF1", "#E91E63"] },
    { name: "reddress-lightorange", colors: ["#FFE4B5", "#FF7043"] },
    { name: "reddress-lightred", colors: ["#FFCDD2", "#E53935"] },
    { name: "sandstone", colors: ["#E0C097", "#C3B091"] },
    { name: "silver", colors: ["#BDC3C7", "#ECF0F1"] },
    { name: "sketchy outline", colors: ["#FAF3E0", "#D1CCC0"] },
    { name: "sketchy", colors: ["#FFFBEA", "#E6DDC4"] },
    { name: "spacelab", colors: ["#2E3A59", "#00BCD4"] },
    { name: "aws-orange", colors: ["#FF9900", "#FFCC80"] },
    { name: "black-knight", colors: ["#0F0F0F", "#3D3D3D"] },
    { name: "bluegray", colors: ["#607D8B", "#B0BEC5"] },
    { name: "blueprint", colors: ["#1E3A8A", "#93C5FD"] },
    { name: "cerulean-outline", colors: ["#007BA7", "#D1ECF1"] },
    { name: "cerulean", colors: ["#007BA7", "#AFEEEE"] },
    { name: "crt-amber", colors: ["#1F1400", "#FFBF00"] },
    { name: "crt-green", colors: ["#002B00", "#39FF14"] },
    { name: "cyborg-outline", colors: ["#121212", "#2D2D2D"] },
    { name: "cyborg", colors: ["#0C0C0C", "#00FFEF"] },
    { name: "hacker", colors: ["#0B0C10", "#45A29E"] },
    { name: "lightgray", colors: ["#E5E7EB", "#F3F4F6"] },
    { name: "mars", colors: ["#4B0000", "#FF3C38"] },
    { name: "materia outline", colors: ["#263238", "#4DB6AC"] },
    { name: "materia", colors: ["#263238", "#80CBC4"] },
    { name: "melis", colors: ["#14002E", "#D500F9"] }, // Approximated based on futuristic purple-blue
  ];
  

const ThemeSelector = ({ onSelectTheme }) => {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl p-6 w-[350px] z-50">
      <h2 className="text-lg font-bold mb-4 text-center">Select a Theme</h2>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600">My Design</h3>
        <div className="w-full h-20 bg-purple-900 rounded-xl p-2 flex items-end justify-end relative cursor-pointer mb-4">
          <div className="w-1/2 h-2 bg-pink-500 rounded"></div>
          <div className="absolute top-2 right-2 w-4 h-4 bg-pink-400 rounded"></div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-600">Themes</h3>
        <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">

  {themes.map((theme) => (
    <div
      key={theme.name}
      onClick={() => onSelectTheme(theme.name)}
      className="rounded-xl p-2 cursor-pointer relative flex flex-col items-center shadow-md hover:shadow-lg transition"
    >
      <div
        className="w-full h-16 rounded-lg mb-2 relative flex justify-end items-end"
        style={{ backgroundColor: theme.colors[0] }}
      >
        <div
          className="absolute top-2 right-2 w-4 h-4 rounded"
          style={{ backgroundColor: theme.colors[1] }}
        />
        <div
          className="w-1/2 h-2 rounded mb-2"
          style={{ backgroundColor: theme.colors[1] }}
        />
      </div>
      <span className="text-sm text-gray-700 font-medium text-center capitalize">
        {theme.name}
      </span>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default ThemeSelector;
