import { useContext, useEffect, useRef, useState } from "react";

import { RightAnswersContext } from "../App";
import { CurrentAndMaximumContext } from "../views/Home";

import Button from "./generic/Button";
import QuestionsBodySingle from "./QuestionsBodySingle";

export default function QuestionsBody({
  question,
  newQuestion,
  answeredCb,
  passedCb,
  passedQuestions,
  setAlert,
}) {
  const rightAnswersContext = useContext(RightAnswersContext);
  const currentAndMaximum = useContext(CurrentAndMaximumContext);

  const [answers, setAnswers] = useState(Object.entries(question.answers));
  const [selected, setSelected] = useState(null);
  const [hide, setHide] = useState(false);
  const [disable, setDisable] = useState(false);

  const itemRef = useRef(null);

  useEffect(() => {
    setAnswers(Object.entries(question.answers));
  }, [question]);

  const handleClick = (e, id) => {
    itemRef.current = id;

    setSelected(id);
  };

  const handleSubmit = () => {
    const found = answers.find((el) => {
      return el[0] === selected;
    });

    if (found) {
      if (found[0] === question.right) {
        setAlert(true);
        rightAnswersContext.cb((prev) => prev + 1);
      } else {
        setAlert(false);
      }
      setSelected("");
      itemRef.current = null;

      answeredCb((prev) => prev + 1);
      passedCb((prev) => [...prev, question.id]);

      if (currentAndMaximum.cur < currentAndMaximum.max) {
        newQuestion.set((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="questions__body rounded-md overflow-hidden shadow shadow-zinc-200">
      <div className={`${hide ? "hide-stuff" : ""}`}>
        <div className="p-4 border-b-2 border-solid text-lg font-bold tracking-wide uppercase">
          {question.questionTitle}
        </div>
        <div
          className={`bg-zinc-100 text-left ${
            passedQuestions.includes(question.id) ? "disable-div" : ""
          }`}
        >
          {answers.map((answer, i, arr) => {
            return (
              <QuestionsBodySingle
                key={answer[0]}
                answer={{ answer, i, arr }}
                disabled={passedQuestions.includes(question.id)}
                cb={handleClick}
                ref={itemRef}
              />
            );
          })}
        </div>
      </div>

      <div className="p-4 pb-3 flex justify-end">
        <Button
          toDisable={selected === null || passedQuestions.includes(question.id)}
          passedEvent={handleSubmit}
        >
          Изпрати
        </Button>
      </div>
    </div>
  );
}
