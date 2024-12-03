import { title, subtitle } from "@/components/primitives";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>In the way of&nbsp;</span>
        <span className={title({ color: "violet" })}>Qur&apos;an&nbsp;</span>
        <br />
        <span className={title()}>
          and 
        </span>
        <span className={title({ color: "violet" })}>&nbsp;Hadith&nbsp;</span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern educational website.
        </div>
      </div>
    </section>
  );
}
