"use client";

import { useState } from "react";

interface FAQProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ questions }: FAQProps) {
  const [rotations, setRotations] = useState(
    Array(questions.length).fill(false)
  );

  const toggleRotation = (index: number) => {
    const newRotations = [...rotations];
    newRotations[index] = !newRotations[index];
    setRotations(newRotations);
  };
  return (
    <div className="flex flex-col mt-[300px] tablet:mt-[358px]">
      <strong className="text-whte text-[18px] tablet:text-[24px] font-bold text-center">
        자주 묻는 질문
      </strong>
      <strong className="mt-[12px] text-white text-[26px] tablet:text-[36px] font-bold text-center">
        FAQ
      </strong>
      <div className="mt-[79px] flex flex-col gap-[20px]">
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              className={`w-[316px] tablet:w-[667px] desktop:w-[1032px] px-[14px] py-[18px] tablet:px-[45px] tablet:py-[30px] bg-gray4 rounded-[20px] flex flex-col transition-all duration-300`}
              style={{
                maxHeight: rotations[index] ? "300px" : "95px",
              }}
            >
              <div className="flex w-[279px] tablet:w-[575px] desktop:w-[939px] items-center justify-between">
                <p className="text-primary text-[16px] tablet:text-[24px] font-bold">
                  Q.
                  <span className="text-white text-[16px] tablet:text-[24px] font-[600] ml-[17px]">
                    {question.question}
                  </span>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 25"
                  fill="none"
                  className={`cursor-pointer transform ${
                    rotations[index] ? "rotate-180" : ""
                  } transition-transform duration-300`}
                  onClick={() => toggleRotation(index)}
                >
                  <path
                    d="M22 8.5L12 18.5L2 8.5L3.775 6.725L12 14.95L20.225 6.725L22 8.5Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
              {rotations[index] ? (
                <div className="flex">
                  <p className="text-primary text-[14px] tablet:text-[24px] font-bold mt-[12px] tablet:mt-[33px]">
                    A.
                  </p>
                  <span className="text-white text-[14px] tablet:text-[24px] font-[500] mt-[12px] tablet:mt-[33px] ml-[17px]">
                    {question.answer}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
