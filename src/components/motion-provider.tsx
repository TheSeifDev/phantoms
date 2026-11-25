"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useSite } from "@/components/site-provider";

gsap.registerPlugin(ScrollTrigger);

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { locale } = useSite();

  useEffect(() => {
    const media = gsap.matchMedia();
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;
    const cleanupEvents: (() => void)[] = [];

    media.add("(prefers-reduced-motion: no-preference)", () => {
      document.documentElement.dataset.motion = "ready";
      const desktopPointer = window.matchMedia("(min-width: 901px) and (pointer: fine)").matches;
      if (desktopPointer) {
        lenis = new Lenis({
          duration: 1.1,
          smoothWheel: true,
          wheelMultiplier: .85,
          anchors: true,
          prevent: node => Boolean(node.closest('[role="dialog"]')) || document.body.style.overflow === "hidden",
        });
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
      }

      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      gsap.fromTo(heroLines, { yPercent: 110 }, { yPercent: 0, duration: 1.15, stagger: .12, ease: "power4.out", clearProps: "transform" });
      gsap.fromTo("[data-hero-copy]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .9, delay: .38, ease: "power3.out", clearProps: "opacity,transform" });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
        gsap.fromTo(element, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", once: true }, clearProps: "transform,opacity" });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach(container => {
        gsap.fromTo(Array.from(container.children), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: container, start: "top 90%", once: true }, clearProps: "transform,opacity" });
      });
      if (desktopPointer) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach(element => {
          gsap.fromTo(element, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
        const art = document.querySelector<HTMLElement>("[data-hero-art]");
        if (art) {
          gsap.to(art, { yPercent: 7, ease: "none", scrollTrigger: { trigger: ".signal-hero", start: "top top", end: "bottom top", scrub: 1 } });
          const rotateX = gsap.quickTo(art, "rotationX", { duration: 1, ease: "power3.out" });
          const rotateY = gsap.quickTo(art, "rotationY", { duration: 1, ease: "power3.out" });
          const hero = document.querySelector<HTMLElement>(".signal-hero");
          const move = (event: PointerEvent) => {
            if (!hero) return;
            const bounds = hero.getBoundingClientRect();
            rotateY(((event.clientX - bounds.left) / bounds.width - .5) * 3);
            rotateX(((event.clientY - bounds.top) / bounds.height - .5) * -3);
          };
          const reset = () => { rotateX(0); rotateY(0); };
          hero?.addEventListener("pointermove", move);
          hero?.addEventListener("pointerleave", reset);
          cleanupEvents.push(() => { hero?.removeEventListener("pointermove", move); hero?.removeEventListener("pointerleave", reset); });
        }
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach(element => {
          const x = gsap.quickTo(element, "x", { duration: .5, ease: "power3.out" });
          const y = gsap.quickTo(element, "y", { duration: .5, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            const rect = element.getBoundingClientRect();
            x((event.clientX - rect.left - rect.width / 2) * .08);
            y((event.clientY - rect.top - rect.height / 2) * .08);
          };
          const reset = () => { x(0); y(0); };
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", reset);
          cleanupEvents.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", reset); });
        });
      }
      gsap.to(".scroll-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: .15 } });
      let active = true;
      const refresh = () => { if (active) ScrollTrigger.refresh(); };
      const details = Array.from(document.querySelectorAll("details"));
      document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      details.forEach(element => element.addEventListener("toggle", refresh));
      cleanupEvents.push(() => {
        active = false;
        window.removeEventListener("load", refresh);
        details.forEach(element => element.removeEventListener("toggle", refresh));
      });

      return () => {
        cleanupEvents.splice(0).forEach(cleanup => cleanup());
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        delete document.documentElement.dataset.motion;
      };
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      document.documentElement.dataset.motion = "reduced";
      return () => { delete document.documentElement.dataset.motion; };
    });
    return () => media.revert();
  }, [pathname, locale]);

  return <>{children}</>;
}
