import { useState } from "react";

const initialBoard = Array(10).fill(null).map(() => Array(6).fill(null));
const colors = { P: "bg-blue-500", B: "bg-red-500", T: "bg-green-500" };

export default function KingOfBaccarat() {
  const [board, setBoard] = useState(initialBoard);
  const [predictions, setPredictions] = useState([]);

  const handleInput = (rowIdx, colIdx, value) => {
    const newBoard = [...board];
    newBoard[rowIdx][colIdx] = value;
    setBoard(newBoard);
  };

  const analyzePattern = () => {
    const flat = board.flat().filter(Boolean);
    const prediction = [];
    if (flat.length < 5) return;

    const last = flat.slice(-3);
    if (last.every(v => v === "P")) prediction.push("P");
    else if (last.every(v => v === "B")) prediction.push("B");
    else if (last[0] !== last[1] && last[1] !== last[2]) prediction.push(last[2] === "P" ? "B" : "P");
    else prediction.push(flat[flat.length - 1]);

    while (prediction.length < 15) {
      prediction.push(prediction[prediction.length - 1]);
    }
    setPredictions(prediction);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">King of Baccarat</h1>
      <div className="grid grid-cols-10 gap-1">
        {board.map((col, colIdx) => (
          <div key={colIdx} className="space-y-1">
            {col.map((cell, rowIdx) => (
              <div key={rowIdx} className="flex gap-1">
                {['P', 'B', 'T'].map(val => (
                  <button
                    key={val}
                    className={`${
                      colors[val]
                    } w-8 h-8 rounded-full text-white ${cell === val ? 'opacity-100' : 'opacity-30'}`}
                    onClick={() => handleInput(colIdx, rowIdx, val)}>
                    {val}
                  </button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={analyzePattern} className="w-full mt-4 bg-black text-white px-4 py-2 rounded">
        วิเคราะห์ผล
      </button>

      {predictions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">ผลทำนาย 15 ตัวถัดไป</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {predictions.map((val, idx) => (
              <div key={idx} className={`w-8 h-8 rounded-full ${colors[val]}`}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
                                                        }
