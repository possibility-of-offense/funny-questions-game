import { useContext, useRef } from "react";
import { CurrentAndMaximumContext } from "../views/Home";

export default function QuestionsNumber({ answersCount }) {
  const currentAndMaximum = useContext(CurrentAndMaximumContext);
  const spanRef = useRef(null);

  function QuestionsNumberLabel({ m, a }) {
    if (m - a > 0) {
      if (a !== 0) {
        return (
          <h5 className="text-md mt-3 italic bg-white text-black rounded-sm shadow shadow-black p-2 mt-9">
            Останали въпроси за отговор - {currentAndMaximum.max - answersCount}
          </h5>
        );
      }
    }
  }

  return (
    <>
      <div className="bg-sky-300 p-6 text-white uppercase mb-3">
        <h4 className="text-3xl">
          Въпрос <span ref={spanRef}>{currentAndMaximum.cur}</span> от{" "}
          {currentAndMaximum.max}
        </h4>

        <QuestionsNumberLabel m={currentAndMaximum.max} a={answersCount} />
      </div>
    </>
  );
}
