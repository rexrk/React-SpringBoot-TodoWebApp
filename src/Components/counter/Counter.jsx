import { useState } from "react";
import "./Counter.css";
import CounterButton from "./CounterButton";

export default function Counter() {
  const [count, setCount] = useState(0);

  function IncrementCounterParentFunction(by) {
    setCount(count + by);
  }
  function DecrementCounterParentFunction(by) {
    setCount(count - by);
  }

  function resetButton() {
    setCount(0);
  }

  return (
    <div>
      <span className="totalCount">{count}</span>
      <CounterButton
        by={1}
        IncrementMethod={IncrementCounterParentFunction}
        DecrementMethod={DecrementCounterParentFunction}
      />
      <CounterButton
        by={2}
        IncrementMethod={IncrementCounterParentFunction}
        DecrementMethod={DecrementCounterParentFunction}
      />
      <CounterButton
        by={4}
        IncrementMethod={IncrementCounterParentFunction}
        DecrementMethod={DecrementCounterParentFunction}
      />

      <button className="resetButton" onClick={resetButton}>
        RESET
      </button>
    </div>
  );
}
