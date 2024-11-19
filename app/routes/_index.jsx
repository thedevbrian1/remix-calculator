import { useState } from "react";

export const meta = () => {
  return [
    { title: "Calculator" },
    { name: "description", content: "Perform any calculation" },
  ];
};

export default function Index() {
  let [num1, setNum1] = useState(null);
  let [num2, setNum2] = useState(null);
  let [operator, setOperator] = useState(null);
  let [currentInput, setCurrentInput] = useState("num1");
  let [result, setResult] = useState(0);

  console.log({ num1 });
  console.log({ num2 });
  console.log({ operator });

  let calcInputs = [
    7,
    8,
    9,
    "DEL",
    4,
    5,
    6,
    "+",
    1,
    2,
    3,
    "-",
    ".",
    0,
    "/",
    "X",
    "RESET",
    "=",
  ];

  function calculateResult() {
    if (operator === "+") {
      setResult(Number(num1) + Number(num2));
    } else if (operator === "-") {
      setResult(num1 - num2);
    } else if (operator === "X") {
      setResult(num1 * num2);
    } else if (operator === "/") {
      setResult(num1 / num2);
    }
  }

  function resetCalculator() {
    setResult(0);
    setNum1(null);
    setNum2(null);
    setOperator(null);
    setCurrentInput("num1");
  }

  function handleDelete() {
    if (currentInput === "num1") {
      if (num1) {
        // Remove the last number
        let numbers = String(num1).split("");
        numbers.splice(-1, 1);
        let newNumber = numbers.join("");
        setNum1(newNumber);
      }
    } else if (currentInput === "num2") {
      if (!num2) {
        setOperator(null);
        setCurrentInput("num1");
      }
      let numbers = num2.split("");
      numbers.splice(-1, 1);
      let newNumber = numbers.join("");
      setNum2(newNumber);
    }
  }

  return (
    <main className="h-screen grid place-items-center">
      <div className="bg-slate-500 p-8 rounded-lg">
        <h1>Calculator</h1>
        <p className="bg-slate-800 p-3 mt-4 rounded">{result}</p>
        <p className="mt-4 text-xl">
          {num1} {operator} {num2}
        </p>
        <div className="mt-8 grid grid-cols-4 gap-2">
          {calcInputs.map((input, index) => (
            <Button
              key={index}
              input={input}
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              num1={num1}
              num2={num2}
              setValue={
                typeof input === "number" && currentInput === "num1"
                  ? setNum1
                  : typeof input === "number" && currentInput === "num2"
                  ? setNum2
                  : setOperator
              }
              calculateResult={calculateResult}
              resetCalculator={resetCalculator}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function Button({
  input,
  currentInput,
  setCurrentInput,
  num1,
  num2,
  setValue,
  calculateResult,
  resetCalculator,
  handleDelete,
}) {
  return (
    <button
      onClick={() => {
        if (typeof input === "number" || input === ".") {
          if (currentInput === "num1") {
            if (!num1) {
              setValue(input);
            } else {
              setValue((prev) => `${prev}${input}`);
            }
          } else if (currentInput === "num2") {
            if (!num2) {
              setValue(input);
            } else {
              setValue((prev) => `${prev}${input}`);
            }
          }
        } else if (["+", "-", "X", "/"].includes(input)) {
          if (num1) {
            setValue(input);
            setCurrentInput("num2");
          }
        } else if (input === "=") {
          calculateResult();
        } else if (input === "RESET") {
          resetCalculator();
        } else if (input === "DEL") {
          handleDelete();
        }
      }}
      className={`${
        input === "DEL" || input === "RESET"
          ? "bg-slate-700 hover:bg-slate-600 text-gray-200"
          : input === "="
          ? "bg-red-500 hover:bg-red-400 text-gray-200"
          : "bg-gray-100 hover:bg-gray-300  text-gray-800"
      }  p-2 rounded active:scale-[.97] transition ease-in-out duration-300`}
    >
      {input}
    </button>
  );
}
