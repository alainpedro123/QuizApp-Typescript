import { shuffleArray } from "./../utils/utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// this "QuestionState" type below will use the properties from the "Question" type above plus the property "answers: string[]"
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const getRequest = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty${difficulty}&type=multiple`
  );
  const data = await getRequest.json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
