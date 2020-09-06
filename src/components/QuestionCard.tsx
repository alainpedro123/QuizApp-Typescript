import React from 'react';
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styled"


export interface Props {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    questionNr: number;
    totalQuestions: number;
    userAnswer: AnswerObject | undefined;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, questionNr, totalQuestions, userAnswer }: Props) => {
    return (
        <Wrapper>
            <p className="number">Question: {questionNr}/{totalQuestions}</p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>{answers.map(answer => (
                <ButtonWrapper 
                    key={answer} 
                    correct ={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </ButtonWrapper>))}
            </div>
        </Wrapper>
    )
}

export default QuestionCard;