import { useContext } from "react";
import { CurrentAndMaximumContext } from "../views/Home";
import Button from "./generic/Button";

export default function QuestionsActions({ cb }) {
  const currentAndMaximum = useContext(CurrentAndMaximumContext);

  function handleClick(direction) {
    cb((prev) => (direction === "prev" ? prev - 1 : prev + 1));
  }

  return (
    <div className="flex justify-between mb-2">
      <Button
        toDisable={currentAndMaximum.cur === 1}
        passedEvent={() => handleClick("prev")}
      >
        Назад
      </Button>
      <Button
        toDisable={currentAndMaximum.cur === currentAndMaximum.max}
        passedEvent={() => handleClick("next")}
      >
        Напред
      </Button>
    </div>
  );
}
