import Link from "next/link";
import Carousel from "./Carousel";
import SectionHeader from "../section-header/SectionHeader";

export default function ProjectPreview() {
  return (
    <section className="flex flex-col items-center  w-screen h-[1101px] pt-[100px] overflow-hidden">
      <SectionHeader
        subTitle="지난 기수 아기사자들의"
        title="프로젝트 프리뷰"
      />

      <Carousel />

      <Link
        href="/project"
        className="flex justify-center items-center w-[266px] h-[61px] rounded-[40px] bg-primary text-[24px] font-bold text-white tracking-[0.005em]"
      >
        더 많은 프로젝트 보기
      </Link>
    </section>
  );
}
