import { useState } from "react";
import "./Quiz.css";
import QuizResultLogic from "./QuizResultLogic";

function Quiz({ props, set }) {
  let [counter, setCounter] = useState(1);
  let [access, setAccess] = useState(false);
  let [accessRenderResultQuiz, setaccessRenderResultQuiz] = useState(false);
  let [counterCorrectAnswer, setCounterCorrectAnswer] = useState([]);
  let [result, setResult] = useState("");
  let actualPage = props.pages[counter - 1];

  function QuizResultLogic1(answer) {
    let correctAnswer = counterCorrectAnswer.filter((item, index) => {
      return item === true;
    });
    console.log(correctAnswer);
    correctAnswer.length > props["all pages"] * 0.33
      ? setResult(props["description your result"][0])
      : correctAnswer.length > props["all pages"] * 0.66
      ? setResult(props["description your result"][1])
      : setResult(props["description your result"][2]);
    setaccessRenderResultQuiz(true);
  }
  return (
    <div className="container_quiz">
      <div className="wrapper_quiz">
        <i
          onClick={() => {
            set.setAccess(false);
          }}
          className="fas fa-times wrapper_quiz__close"
        ></i>
        <img alt="avatar" src={props.img} className="wrapper_quiz__img" />
        <h1 className="wrapper_quiz__title">{props.header}</h1>
        <div
          onClick={() => {
            setAccess(true);
          }}
          className="wrapper_quiz__batton_start"
        >
          Начать тест
        </div>
        {props.description.map((item, index) => {
          return (
            <p key={index} className="wrapper_quiz__description">
              {item}
            </p>
          );
        })}
        <p className="wrapper_quiz__author">{props.author}</p>
        {access ? (
          <div className={` wrapper_quiz__page`}>
            <div className="wrapper_quiz__page__wrapper_numbers">
              <span className="wrapper_quiz__page__counter">{counter}</span>
              <span className="wrapper_quiz__page__all_pages">
                /{`${props["all pages"]}`}
              </span>
            </div>
            <div className="wrapper_quiz__page__conteiner_question conteiner_question">
              <h1 className="conteiner_question__title">{`${counter}. ${actualPage.question}`}</h1>
              {actualPage["answer options"].map((item, index) => {
                return (
                  <span
                    onClick={() => {
                      if (counter < props["all pages"]) {
                        setCounter(counter + 1);
                        counterCorrectAnswer.push(
                          item === actualPage["correct answer"]
                        );
                        setCounterCorrectAnswer([...counterCorrectAnswer]);
                      } else {
                        QuizResultLogic1();
                      }
                    }}
                    className="conteiner_question__answer_options"
                    key={index}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
            {accessRenderResultQuiz ? (
              <div className="quiz_result_wrapper">
                <div className="quiz_result_wrapper__intro_wrapper">
                  <p className="quiz_result_wrapper__intro_wrapper__category_test">
                    Тесты · {props.category}
                  </p>
                  <h1 className="quiz_result_wrapper__intro_wrapper__title">
                    {props.header}
                  </h1>
                </div>
                <div className="quiz_result_wrapper__description">
                  <h2 className="quiz_result_wrapper__description__title">
                    Ваши результаты
                  </h2>
                  {accessRenderResultQuiz ? (
                    <p className="quiz_result_wrapper__description__text">
                      {result}
                    </p>
                  ) : undefined}
                </div>
              </div>
            ) : undefined}
          </div>
        ) : undefined}
      </div>
    </div>
  );
}

export default Quiz;
