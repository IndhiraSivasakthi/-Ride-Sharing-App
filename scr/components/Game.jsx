import { useState } from "react";
import { motion } from "framer-motion";

export default function MatrixGame() {
  const [matrix, setMatrix] = useState(Array(9).fill("white"));
  const [clickOrder, setClickOrder] = useState([]);
  const [message, setMessage] = useState("");

  const handleClick = (index) => {
    if (matrix[index] === "white") {
      const newMatrix = [...matrix];
      newMatrix[index] = "green";
      setMatrix(newMatrix);
      const newClickOrder = [...clickOrder, index];
      setClickOrder(newClickOrder);

      if (newClickOrder.length === 9) {
        setMessage("All boxes clicked! Changing to orange...");
        newClickOrder.forEach((pos, i) => {
          setTimeout(() => {
            setMatrix((prevMatrix) => {
              const updatedMatrix = [...prevMatrix];
              updatedMatrix[pos] = "orange";
              return updatedMatrix;
            });
            if (i === newClickOrder.length - 1) {
              setMessage("All boxes are now orange!");
            }
          }, i * 500);
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2 p-5 w-48">
        {matrix.map((color, index) => (
          <motion.div
            key={index}
            className="w-16 h-16 border-2 border-black flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: color }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {message && <p className="mt-3 text-lg font-semibold">{message}</p>}
    </div>
  );
}
