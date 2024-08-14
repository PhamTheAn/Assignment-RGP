import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import 'animate.css';

function App() {
  const [pointCharA, setPointCharA] = useState(1);
  const [pointCharB, setPointCharB] = useState(1);
  const [result, setResult] = useState("Same point");

  const handleRace = () => {
    const randomRace = Math.floor(Math.random() * 2)

    if(randomRace === 0 ) {
      setPointCharA(pointCharA + 1)
    }else {
      setPointCharB(pointCharB + 1)
    }
    console.log(randomRace);
  }

  useEffect(() => {
    if(pointCharA == pointCharB) {
      setResult("Same point")
    }else if(pointCharA <= pointCharB) {
      setResult("B Win")
    }else {
      setResult("A Win")
    }
  },[pointCharA, pointCharB])

  const handleReset = () => {
    setPointCharA(1)
    setPointCharB(1)
  }



  return (
    <div>
      <p className="text-gray-700 text-lg font-bold mb-4 uppercase">
        Assignment RGP
      </p>
      <div className="text-left">Kết quả: {result}</div>
      <div>
        <p className="text-left text-green-400 mt-2"> Character A </p>
        <div className="flex items-center">
          {Array.from({ length: pointCharA }).map((_, index) => (
            <div
              key={index}
              className="w-20 h-4 bg-green-500 me-3 rounded-sm animate__animated animate__rubberBand"
            ></div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-left text-red-400 mt-2"> Character B </p>
        <div className="flex items-center">
          {Array.from({ length: pointCharB }).map((_, index) => (
            <div
              key={index}
              className="w-20 h-4 bg-red-500 me-3 rounded-sm animate__animated animate__rubberBand"
            ></div>
          ))}
        </div>
      </div>

      <div className="flex items-start mt-4">
        <button onClick={handleRace} className=" me-2 bg-blue-100 text-blue-500 hover:bg-blue-200 duration-200 font-bold px-4 py-1 rounded opacity-80 cursor-pointe">
          Race
        </button>

          {pointCharA > 1 || pointCharB > 1 ? (
        <button onClick={handleReset} className=" me-2 bg-blue-100 text-blue-500 hover:bg-blue-200 duration-200 font-bold px-4 py-1 rounded opacity-80 cursor-pointe">
          Reset
        </button>
          ): null}
      </div>
    </div>
  );
}

export default App;
