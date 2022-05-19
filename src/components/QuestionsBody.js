import { useContext, useEffect, useRef, useState } from "react";
import Button from "./generic/Button";
import QuestionsBodySingle from "./QuestionsBodySingle";
import { RightAnswersContext } from "../App";

export default function QuestionsBody({ question, newQuestion, setAlert }) {
  const [answers, setAnswers] = useState(Object.entries(question.answers));
  const [selected, setSelected] = useState(null);
  const [hide, setHide] = useState(false);

  const rightAnswersContext = useContext(RightAnswersContext);

  const itemRef = useRef(null);

  useEffect(() => {
    setAnswers(Object.entries(question.answers));
  }, [question]);

  useEffect(() => {
    let timer;

    if (selected !== null) {
      timer = setTimeout(() => {
        setAlert("");
        setHide(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [selected]);

  const handleClick = (e, id) => {
    itemRef.current = id;

    setSelected(id);
  };

  const handleSubmit = () => {
    setHide(true);
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

      newQuestion((prev) => prev + 1);
    }
  };

  return (
    <div className="questions__body rounded-md overflow-hidden shadow shadow-zinc-200">
      <div className={`${hide ? "hide-stuff" : ""}`}>
        <div className="p-4 border-b-2 border-solid text-lg font-bold tracking-wide uppercase">
          {question.questionTitle}
        </div>
        <div className={`bg-zinc-100 text-left`}>
          {answers.map((answer, i, arr) => {
            return (
              <QuestionsBodySingle
                key={answer[0]}
                answer={{ answer, i, arr }}
                cb={handleClick}
                ref={itemRef}
              />
            );
          })}
        </div>
      </div>

      <div className="p-4 pb-3 flex justify-end">
        <Button toDisable={selected === null} passedEvent={handleSubmit}>
          Изпрати по Спиди
        </Button>
      </div>
    </div>
  );
}
