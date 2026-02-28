import { gsap } from "@/lib/gsap";

export function slashNav(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
  e.preventDefault();

  const line = document.getElementById("slash-line");
  if (!line) return;

  gsap.fromTo(
    line,
    { x: "-100vw", rotation: -25 },
    {
      x: "100vw",
      rotation: -25,
      duration: 0.35,
      ease: "power4.out",
    }
  );

  setTimeout(() => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }, 200);
}
