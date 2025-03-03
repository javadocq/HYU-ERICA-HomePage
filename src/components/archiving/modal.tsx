"use client";

import Close from "@/../public/assets/icons/close.svg";
import Arrow from "@/../public/assets/icons/arrow_forward.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArchivingModalProps } from "@/types/subproject";

export default function ArchivingModal({
  selectedProject,
  onClose,
}: ArchivingModalProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const project = selectedProject;
  console.log(project);
  const photoCount = project?.photos.length || 0;
  const roles = ["기획/디자인", "프론트엔드", "백엔드"];

  useEffect(() => {
    console.log(1);
  }, []);

  const handlePrevSlide = () => {
    const newSlide = currentSlide === 0 ? photoCount - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const handleNextSlide = () => {
    const newSlide = currentSlide === photoCount - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div
      onClick={onClose}
      className="flex items-start justify-center tablet:items-center w-screen h-screen overflow-y-auto py-[20px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col p-[15px_18px] w-[290px] tablet:w-[738px] bg-background rounded-[14px] gap-[16px]"
      >
        <div className=" flex flex-row justify-between">
          <div className="text-[18px] font-semibold h-[21px] text-white/75 ">
            Project
          </div>
          <Image
            src={Close}
            alt="X"
            width={24}
            height={24}
            className="opacity-75 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="w-[254px] h-[164px] tablet:w-[701px] tablet:h-[394px] relative">
          {project && (
            <Image
              src={project?.photos[currentSlide]?.photoUrl}
              alt={`프로젝트 이미지 ${currentSlide + 1}`}
              width={701}
              height={394}
              className="h-[163px] w-[254px] tablet:w-[701px] tablet:h-[394px] shrink-0 rounded-[10px] object-cover bg-white"
            />
          )}

          <button
            onClick={handlePrevSlide}
            className={`absolute top-1/2 -translate-y-1/2 left-[18px] flex items-center justify-center p-[12px_16px] w-[44px] h-[44px] rounded-[84px] bg-black/20 hover:bg-black/30 ${
              currentSlide === 0
                ? "opacity-[0.5] cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={currentSlide === 0}
          >
            <div className="w-[12px] h-[20px] rotate-180">
              <Image src={Arrow} alt="previous" />
            </div>
          </button>
          <button
            onClick={handleNextSlide}
            className={`absolute top-1/2 -translate-y-1/2 right-[18px] flex items-center justify-center p-[12px_16px] w-[44px] h-[44px] rounded-[84px] bg-black/20 hover:bg-black/30 ${
              currentSlide === photoCount - 1
                ? "opacity-[0.5] cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={currentSlide === photoCount - 1}
          >
            <div className="w-[12px] h-[20px]">
              <Image src={Arrow} alt="next" />
            </div>
          </button>
        </div>
        <div className="flex flex-col tablet:flex-row gap-[26px]">
          <div className="flex flex-col w-11.5/12 tablet:w-[195px]  flex-start justify-center gap-[20px]">
            <div className="inline-flex flex-col h-auto gap-[9px] p-[20px] bg-[#464242] rounded-[10px] ">
              <div className="align-center gap-[40px] text-[18px] font-semibold h-[25px]">
                {project?.team}
              </div>
              <div className="flex flex-col align-start w-[155px] gap-[22px]">
                {roles.map((role) => (
                  <div key={role} className="flex flex-col gap-[4px]">
                    <div className="font-semibold text-white/55 text-[14px] h-[20px]">
                      {role}
                    </div>
                    <div className="flex gap-[8px] flex-wrap">
                      {project?.projectMembers
                        .filter((member) => member.role === role)
                        .map((member, index, array) => (
                          <div
                            key={index}
                            className="text-[16px] font-semibold h-[22px]"
                          >
                            {member.name}
                            {index < array.length - 1 && ", "}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
                {/* {roles.map(([english, korean]) => (
                  <div key={english} className="flex flex-col gap-[4px]">
                    <div className="font-semibold text-white/55 text-[14px] h-[20px]">
                      {korean}
                    </div>
                    {project?.projectMembers
                      .filter((member) => member.role === english)
                      .map((member, index) => (
                        <div
                          key={index}
                          className="text-[16px] font-semibold h-[22px]"
                        >
                          {member.name}{" "}
                        </div>
                      ))}
                  </div>
                ))} */}
              </div>
            </div>

            <div className="p-[20px] bg-[#464242] rounded-[10px] ">
              <div className="flex flex-col align-start w-[155px] gap-[22px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="font-semibold text-white/55 text-[14px] h-[20px]">
                    프로젝트 기간
                  </div>
                  <div className="text-[16px] font-semibold h-[22px] ">
                    {`${project?.startDate}~${project?.endDate}`}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-semibold text-white/55 text-[14px] h-[20px]">
                    프로젝트 링크
                  </div>
                  <div
                    className="text-[16px] font-semibold h-[22px]"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {project?.deploymentUrl ? (
                      <a
                        className="line-clamp-1 leading-[140%] overflow-x-scroll [&::-webkit-scrollbar]:hidden"
                        href={project.deploymentUrl}
                        target="_blank"
                      >
                        {project.deploymentUrl}
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  gap-[7px]">
            <div className="inline-flex w-[254px] tablet:w-[481px] items-center gap-[12px]">
              <div className="text-[20px] tablet:text-[24px] font-semibold">
                {project?.name}
              </div>
              <div className="text-[12px] tablet:text-[18px] font-semibold text-white/40">
                {project?.type}
              </div>
            </div>
            <div className="w-[254px] tablet:w-[481px] text-[16px] tablet:text-[18px] text-white/75 leading-[140%]">
              <div className=" text-white/75 leading-[140%]">
                {project?.description
                  ?.replace(/\\n/g, "\n")
                  .split(/\n{2,}/)
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
