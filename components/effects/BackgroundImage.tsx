"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function BackgroundImage() {
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!imgRef.current) return;

    gsap.to(imgRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Image layer — scaled up to allow parallax travel */}
      <div ref={imgRef} className="absolute inset-0 scale-[1.2]">
        <Image
          src="/bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          quality={85}
        />
      </div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-ink/[0.72]" />
    </div>
  );
}
