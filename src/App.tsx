import React, { useState } from 'react';
import QuestionCard from "./components/QuestionCard"
import { fetchQuizQuestions } from "./API/API";
import { QuestionState, Difficulty } from "./API/API"
import {GlobalStyle, Wrapper} from "./App.styled";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // grabbing the user answer
      const answer = e.currentTarget.value;

      //check the user answer against the correct answer 
      const correct = questions[number].correct_answer === answer;

      // adding score if the user answer is correct
      if (correct)
        setScore((prev) => prev + 1);

      // saving the user Answers in the array 
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS)
      setGameOver(true);
    setNumber(nextQuestion);
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>start</button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? // if it's not the last question
          (<button className="next" onClick={nextQuestion}>Next Question</button>
          ) : null}
      </Wrapper>
    </>
  );
}

export default App;
