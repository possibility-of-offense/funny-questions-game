import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import Home from "./views/Home";
import Result from "./views/Result";
import "./App.css";

import { questions } from "../src/data/questions";
export const QuestionsContext = React.createContext(questions);
export const RightAnswersContext = React.createContext("");

function App() {
  const [rightAnswers, setRightAnswers] = useState(0);

  return (
    <div className="App">
      <header className="App-header shadow-inner shadow-gray-500">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <QuestionsContext.Provider value={questions}>
        <RightAnswersContext.Provider
          value={{ cb: setRightAnswers, right: rightAnswers }}
        >
          <Routes>
            <Route path="/home" element={<Home restart={setRightAnswers} />} />
            <Route path="/home/result" element={<Result />} />
          </Routes>
        </RightAnswersContext.Provider>
      </QuestionsContext.Provider>
    </div>
  );
}

export default App;
