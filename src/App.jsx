import { useEffect, useRef, useState } from "react";
import "./App.css";
import "animate.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false)
  const [circles, setCircles] = useState([]);
  const [points, setPoints] = useState(0);
  const [play, setPlay] = useState(false);
  const [restart, setRestart] = useState(false);
  const [pointsNumber, setPointsNumber] = useState(0);
  const [result, setResult] = useState("let's play");

  
  
  const randomCoordinates = () => Math.floor(Math.random() * 400);
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach((circle) => {
      addNumberInCircle(
        context,
        circle.x,
        circle.y,
        circle.number,
        circle.color
      );
    });
  }, [circles]);

  const addNumberInCircle = (context, x, y, number, color) => {
    context.beginPath();
    context.arc(x, y, 18, 0, 2 * Math.PI);
    context.fillStyle = color || "white";
    context.fill();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();

    context.fillStyle = "black";
    context.font = "20px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(number, x, y);
  };
  
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    const newCircles = [];

    if (play === true || restart) {
      for (let index = 1; index <= points; index++) {
        const randomX = randomCoordinates();
        const randomY = randomCoordinates();
        addNumberInCircle(context, randomX, randomY, index, "white");
        newCircles.push({
          x: randomX,
          y: randomY,
          number: index,
          radius: 18,
          color: "white",
        });
      }
    }
    setCircles(newCircles);
  }, [points,play, restart]);

  useEffect(() => {
    if (play === true && circles.length == 0) {
      setPointsNumber(0)
      setIsRunning(false)
      setResult("All Clear");
    }
  }, [circles, points]);

  const handleClick = (event) => {
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCircles((prevCircles) =>
      prevCircles.map((circle) => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance <= circle.radius) {
          if (circle.number - pointsNumber === 1) {
            setPointsNumber(pointsNumber + 1);
            return { ...circle, color: "green" };
          } else {
            setResult("Game Over");
            setIsRunning(false);
            return { ...circle, color: "red" };
          }
        }
        return circle;
      })
    );
  };

  setTimeout(() => {
    setCircles((prevCircles) => prevCircles.filter((c) => c.color !== "green"));
  }, 3000); 
  const handleChanglePoints = (event) => {
    setPoints(event.target.value);
  };

  useEffect(() => {
    let interval;

    if(isRunning) {
      const timeStart = performance.now() - time;
      
      interval = setInterval(() => {
        setTime(performance.now() - timeStart)
      },10)
    }else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  },[isRunning, time])

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p className="text-gray-700 text-lg font-bold mb-4 uppercase">
        Assignment RGP
      </p>
      <div className="text-left uppercase font-semibold text-lg my-2">
        {result}
      </div>

      <div className="text-left uppercase font-semibold text-lg my-2">
        time : {formatTime(time)}
      </div>
      <div className="flex items-center justify-between max-w-64 my-2">
        <div>Point</div>
        <input
          onChange={handleChanglePoints}
          min={0}
          className=" outline-1 outline-blue-500 px-1 text-black border-2 rounded border-black"
          type="number"
        ></input>
      </div>
      <div className="text-left my-2">
        {play == false ? 
        (<button
          onClick={() => {
            setPlay(true);
            setIsRunning(true)
          }}
          className=" me-2 bg-blue-100 text-blue-500 hover:bg-blue-200 duration-200 font-bold px-8 rounded opacity-80 cursor-pointer"
        >
          Play
        </button>):
        (<button
          onClick={() => {
            setPointsNumber(0)
            if(restart === false) {
            setTime(0)
            setRestart(true);
            setIsRunning(true)
            }else {
            setIsRunning(true)
            setRestart(false);
            setTime(0)
            }
          }}
          className=" me-2 bg-blue-100 text-blue-500 hover:bg-blue-200 duration-200 font-bold px-8 rounded opacity-80 cursor-pointer"
        >
          Restart
        </button>)
        }
      </div>
      <canvas
        onClick={handleClick}
        ref={ref}
        className="border-2 border-black rounded"
        id="myCanvas"
        width="500"
        height="500"
      ></canvas>
    </div>
  );
}

export default App;
