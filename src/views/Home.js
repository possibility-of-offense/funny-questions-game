import { useCallback, useContext, useEffect, useState } from "react";
import { QuestionsContext } from "../App";
import QuestionsActions from "../components/QuestionsActions";
import QuestionsBody from "../components/QuestionsBody";
import Alert from "../components/generic/Alert";
import { Link } from "react-router-dom";

export default function Home({ restart }) {
  const questionsContext = useContext(QuestionsContext);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [alert, setAlert] = useState(null);

  const findCurrentQuestion = (questions, id) => {
    const found = questions.find((el) => el.id === id);
    return found || null;
  };

  return (
    <div className="container rounded-sm shadow shadow-black-100 mx-auto bg-zinc-100 p-5 mt-5">
      <div className="grid lg:grid-cols-container-grid-cols gap-10">
        <div className="bg-white p-3 shadow shadow-black-100 text-left">
          <h5 className="cursor-pointer text-sky-500 underline decoration-sky-500 pb-2">
            <Link to="/home/result">1. Виж резултата </Link>
          </h5>
          <h5
            onClick={() => {
              setCurrentQuestion(1);
              restart(0);
            }}
            className="cursor-pointer text-sky-500 underline decoration-sky-500 pb-2"
          >
            2. Рестартирай играта
          </h5>
        </div>
        <div>
          {typeof alert === "boolean" && alert ? (
            <Alert>Правилен отговор</Alert>
          ) : (
            typeof alert === "boolean" &&
            !alert && (
              <Alert classes="bg-red-300 p-2 text-center">Грешен отговор</Alert>
            )
          )}
          {currentQuestion <= 3 ? (
            <div className="bg-white p-3 shadow shadow-black-100">
              {/* <QuestionsActions /> */}
              <QuestionsBody
                question={findCurrentQuestion(
                  questionsContext,
                  currentQuestion
                )}
                newQuestion={setCurrentQuestion}
                setAlert={setAlert}
              />
            </div>
          ) : (
            <div className="p-2 bg-white rounder-sm shadow-md shadow-gray-300 flex justify-center items-center">
              <h2 className="text-2xl underline decoration-1">
                Нема повече въпроси!
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
