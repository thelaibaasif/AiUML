// import React, { useState } from "react";

// const maxTokens = 200;

// const estimateTokens = (text) => {
//   // Approximate token count: 1 token ≈ 4 characters
//   return Math.ceil(text.trim().length / 4);
// };

// function TokenLimitedInput({ value, onChange }) {
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const newText = e.target.value;
//     const tokenCount = estimateTokens(newText);

//     if (tokenCount > maxTokens) {
//       setError(`Input exceeds ${maxTokens} tokens (currently ${tokenCount} tokens).`);
//     } else {
//       setError("");
//       onChange(newText);
//     }
//   };

//   return (
//     <div>
//       <textarea
//         value={value}
//         onChange={handleChange}
//         placeholder={`Enter your prompt (max ${maxTokens} tokens)`}
//         className="w-full p-2 border border-gray-300 rounded-md"
//         rows={5}
//       />
//       <p className="text-sm text-gray-600 mt-1">
//         {estimateTokens(value)} / {maxTokens} tokens
//       </p>
//       {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
//     </div>
//   );
// }

// export default TokenLimitedInput;
