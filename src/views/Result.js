import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RightAnswersContext } from "../App";
import Button from "../components/generic/Button";

export default function Result() {
  const rightAnswersContext = useContext(RightAnswersContext);
  const navigate = useNavigate();

  function passNavigationCallback() {
    navigate("/home");
  }

  function Maxium(cur, goal) {
    if (cur === goal) {
      return (
        <p className="pt-3 font-bold">
          Достигна максималния брой отговори куче! Поздравления!
        </p>
      );
    }
  }

  return (
    <div className="relative result mt-3 bg-white p-6 rounded-sm shadow shadow-gray-300 container mx-auto">
      <div className="lg:absolute">
        <Button passedEvent={passNavigationCallback}>Върни се отначало</Button>
      </div>

      {rightAnswersContext.right ? (
        <h2 className="text-2xl">
          Твоят резултат е {rightAnswersContext.right} от 3
          {Maxium(rightAnswersContext.right, 3)}
        </h2>
      ) : (
        "Все още нямаш резултат ленивецо!"
      )}
    </div>
  );
}
