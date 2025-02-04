"use client";

interface SubProject {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  deploymentUrl: string;
  generation: number;
  photos: { id: number; photoUrl: string }[];
  projectMembers: { name: string; role: string }[];
}

interface ArchivingModalProps {
  sub: number;
  onClose: () => void;
}

import Close from "@/../public/assets/icons/close.svg";
import Arrow from "@/../public/assets/icons/arrow_forward.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

async function getProject(sub: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_KEY}/projects/${sub}`
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function ArchivingModal({ sub, onClose }: ArchivingModalProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [project, setProject] = useState<SubProject | null>(null);
  const photoCount = project?.photos.length || 0;
  const roles: [string, string][] = [
    ["Frontend", "프론트엔드"],
    ["Backend", "백엔드"],
    ["President", "기획/디자인"],
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProject(sub);
      setProject(data);
    };
    fetchData();
  }, [sub]);

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
      className="z-50 flex justify-center items-center w-full h-full overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col p-[15px_18px] w-[738px] h-[914px] bg-background rounded-[14px] gap-[16px]"
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

        <div className="w-[701px] h-[394px] relative">
          {project && (
            <Image
              src={project.photos[currentSlide].photoUrl}
              alt={`프로젝트 이미지 ${currentSlide + 1}`}
              width={701}
              height={394}
              className="h-[394px] shrink-0 rounded-[10px] object-cover bg-white"
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
        <div className="flex flex-row gap-[26px]">
          <div className="flex flex-col w-[195px] flex-start justify-center gap-[20px]">
            <div className="inline-flex flex-col h-[256px] gap-[9px] p-[20px] bg-[#464242] rounded-[10px] ">
              <div className="align-center gap-[40px] text-[18px] font-semibold h-[25px]">
                Team 3
              </div>
              <div className="flex flex-col align-start w-[155px] gap-[22px]">
                {roles.map(([english, korean]) => (
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
                          {" "}
                          {member.name}{" "}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-[20px] bg-[#464242] rounded-[10px] ">
              <div className="flex flex-col align-start w-[155px] gap-[22px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="font-semibold text-white/55 text-[14px] h-[20px]">
                    프로젝트 기간
                  </div>
                  <div className="text-[16px] font-semibold h-[22px] ">
                    {project?.createdAt}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-semibold text-white/55 text-[14px] h-[20px]">
                    프로젝트 링크
                  </div>
                  <div className="text-[16px] font-semibold h-[22px] ">
                    {project?.deploymentUrl}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[481px] gap-[7px]">
            <div className="inline-flex items-center gap-[12px]">
              <div className="text-[24px] font-semibold">{project?.name}</div>
              <div className="text-[18px] font-semibold text-white/40">
                {project?.type}
              </div>
            </div>
            <div className="text-[18px] text-white/75">
              {project?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
