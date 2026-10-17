// import { useState } from "react";
// import "./InputFlash.css";

// export default function InputFlash() {
//   const [value, setValue] = useState("");
//   const [showError, setShowError] = useState(false);

//   const wordsToFind = ["lo", "x10", "09"];

//   const handleCheck = () => {
//     setShowError(true);
//   };

//   // Tô đỏ các từ tìm thấy
//   const renderText = () => {
//     if (!showError) return value;

//     const regex = new RegExp(
//       `(${wordsToFind
//         .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
//         .join("|")})`,
//       "g",
//     );

//     return value.split(regex).map((part, index) => {
//       const isError = wordsToFind.includes(part);

//       return isError ? (
//         <span className="error-text" key={index}>
//           {part}
//         </span>
//       ) : (
//         part
//       );
//     });
//   };

//   return (
//     <div className="input-flash">
//       <div className="input-wrapper">
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//             setShowError(false);
//           }}
//           placeholder="Nhập chuỗi..."
//         />

//         <div className="input-overlay">{renderText()}</div>
//       </div>

//       <button onClick={handleCheck}>Kiểm tra</button>
//     </div>
//   );
// }

import { useState } from "react";
import "./InputFlash.css";

export default function InputFlash() {
  const [showError, setShowError] = useState(false);

  const wordsToFind = ["lo", "x10", "09"];

  const handleCheck = () => {
    setShowError(true);
  };

  // Tô đỏ các từ tìm thấy
  const renderText = () => {
    if (!showError) return value;

    const regex = new RegExp(
      `(${wordsToFind
        .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g",
    );

    return value.split(regex).map((part, index) => {
      const isError = wordsToFind.includes(part);

      return isError ? (
        <span className="error-text" key={index}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  return (
    <div className="input-flash">
      <div className="input-wrapper">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setShowError(false);
          }}
          placeholder="Nhập chuỗi..."
        />

        <div className="input-overlay">{renderText()}</div>
      </div>
    </div>
  );
}
