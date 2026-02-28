import ScrollReveal from "./ScrollReveal";

interface SectionHeaderProps {
  kanji: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({ kanji, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-20">
      <ScrollReveal>
        <div className="font-display text-[80px] text-crimson/[0.08] leading-none -mb-5">
          {kanji}
        </div>
        <h2 className="font-display text-[42px] font-light tracking-[2px]">
          {title}
        </h2>
        <div className="w-[60px] h-[2px] bg-crimson mx-auto mt-4" />
        <div className="text-[13px] text-parchment/[0.35] mt-3.5 tracking-[2px] uppercase">
          {subtitle}
        </div>
      </ScrollReveal>
    </div>
  );
}
