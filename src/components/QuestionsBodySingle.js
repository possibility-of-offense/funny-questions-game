import React, { useCallback, useContext, useEffect, useState } from "react";

const QuestionsBodySingle = React.forwardRef(
  ({ answer, cb: handleClick }, ref) => {
    const [paint, setPaint] = useState(false);

    useEffect(() => {
      if (answer.answer[0] === ref.current) {
        setPaint(true);
      } else {
        setPaint(false);
      }
    }, [ref.current]);

    const transformNoString = useCallback((val) => {
      switch (val) {
        case "first":
          return "1.";
        case "second":
          return "2.";
        case "third":
          return "3.";
        case "fourth":
          return "4.";
      }
    }, []);

    return (
      <div
        onClick={(e) => {
          handleClick(e, answer.answer[0]);
        }}
        className={`cursor-pointer transition  ${
          paint ? "bg-zinc-400" : "hover:bg-zinc-300"
        } ${
          answer.i === answer.arr.length - 1
            ? ""
            : "border-b-2 border-dashed border-slate-500"
        } p-2`}
      >
        <span className="font-bold display-inline-block mr-2">
          {transformNoString(answer.answer[0])}
        </span>
        {answer.answer[1]}
      </div>
    );
  }
);

export default QuestionsBodySingle;
