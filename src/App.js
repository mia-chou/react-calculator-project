import React, { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-'];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc((prevCalc) => prevCalc + value);
  };

  const calculate = () => {
    try {
      setResult(Function('"use strict";return (' + calc + ')')()); // Use Function constructor to avoid eval
    } catch (error) {
      setResult("Error");
    }
  };

  const handleDelete = () => {
    setCalc((prevCalc) => prevCalc.slice(0, -1));
  };

  const handleEquals = () => {
    calculate();
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>{i}</button>
      );
    }

    return digits;
  };

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''}
          {calc || "0"}
        </div>

        <div className="operator">
          {ops.map((op, index) => (
            <button key={index} onClick={() => updateCalc(op)}>{op}</button>
          ))}
          <button onClick={handleDelete}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
