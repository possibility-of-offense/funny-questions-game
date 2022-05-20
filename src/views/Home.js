import React, { useContext, useState } from "react";
import { QuestionsContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

import Alert from "../components/generic/Alert";
import Button from "../components/generic/Button";
import QuestionsActions from "../components/QuestionsActions";
import QuestionsContainer from "../components/QuestionsContainer";
import QuestionsCount from "../components/QuestionsCount";

export const CurrentAndMaximumContext = React.createContext();

export default function Home() {
  const questionsContext = useContext(QuestionsContext);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [passedQuestions, setPassedQuestions] = useState([]);
  const [alert, setAlert] = useState(null);

  console.log(passedQuestions.length === questionsContext.length);

  const navigate = useNavigate();

  const findCurrentQuestion = (questions, id) => {
    const found = questions.find((el) => el.id === id);
    return found || null;
  };

  return (
    <div className="container rounded-sm shadow shadow-black-100 mx-auto bg-zinc-100 p-5 mt-5">
      <div className="grid lg:grid-cols-container-grid-cols gap-10">
        <div className="bg-white p-3 shadow shadow-black-100 text-left">
          <h5 className="cursor-pointer text-sky-500 underline decoration-sky-500 pb-2">
            <Link to="/result">1. Виж резултата </Link>
          </h5>
          <h5
            onClick={() => {
              setCurrentQuestion(1);
              setAnsweredQuestions(0);
              setPassedQuestions([]);
              setAlert(null);
            }}
            className="cursor-pointer text-sky-500 underline decoration-sky-500 pb-2"
          >
            2. Рестартирай играта
          </h5>
        </div>
        <div>
          <div
            className={`${
              passedQuestions.length === questionsContext.length
                ? "remove-after"
                : ""
            }`}
          >
            {typeof alert === "boolean" && alert ? (
              <Alert>Правилен отговор</Alert>
            ) : (
              typeof alert === "boolean" &&
              !alert && (
                <Alert classes={`bg-red-300 p-2 text-center`}>
                  Грешен отговор
                </Alert>
              )
            )}
          </div>

          <div className="bg-white p-3 shadow shadow-black-100">
            <CurrentAndMaximumContext.Provider
              value={{ cur: currentQuestion, max: questionsContext.length }}
            >
              <QuestionsCount answersCount={answeredQuestions} />

              {answeredQuestions < questionsContext.length && (
                <>
                  <QuestionsActions cb={setCurrentQuestion} />
                  <QuestionsContainer
                    question={findCurrentQuestion(
                      questionsContext,
                      currentQuestion
                    )}
                    newQuestion={{ set: setCurrentQuestion }}
                    answeredCb={setAnsweredQuestions}
                    passedCb={setPassedQuestions}
                    passedQuestions={passedQuestions}
                    setAlert={setAlert}
                  />
                </>
              )}

              {answeredQuestions === questionsContext.length && (
                <Button passedEvent={() => navigate("/result")}>
                  Виж резултата
                </Button>
              )}
            </CurrentAndMaximumContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
