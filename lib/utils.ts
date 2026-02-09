export function slashNav(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
  e.preventDefault();
  
  const line = document.getElementById("slash-line");
  if (!line) return;

  line.style.transition = "none";
  line.style.transform = "rotate(-25deg) translateX(-100vw)";

  requestAnimationFrame(() => {
    line.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
    line.style.transform = "rotate(-25deg) translateX(100vw)";
  });

  setTimeout(() => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }, 200);
}