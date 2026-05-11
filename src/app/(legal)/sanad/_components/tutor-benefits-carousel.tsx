"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, Sparkles, Eye, Volume2 } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const tutorBenefits = [
  {
    icon: Volume2,
    title: "يشرح لك بصوته",
    description: "يقرأ المحتوى ويشرحه بطريقة واضحة ومفهومة بالصوت",
  },
  {
    icon: MessageCircle,
    title: "يجاوبك فوراً",
    description: "أي سؤال يدور في بالك، سند يجاوبك عليه مباشرة",
  },
  {
    icon: Sparkles,
    title: "يتكيّف مع أسلوبك",
    description: "يتعلم طريقتك في الفهم ويقدّم شرح يناسبك",
  },
  {
    icon: Eye,
    title: "يتابع تقدّمك",
    description: "يرافقك خطوة بخطوة ويتأكد إنك فهمت كل جزء",
  },
];

const carouselImages = [
  {
    src: "https://snd-zone.b-cdn.net/assets/product-page/image-2-1.png",
    alt: "سند يشرح لك بصوته",
  },
  {
    src: "https://snd-zone.b-cdn.net/assets/product-page/image-2-2.png",
    alt: "سند يجاوبك فوراً",
  },
  {
    src: "https://snd-zone.b-cdn.net/assets/product-page/image-2-3.png",
    alt: "سند يتكيّف مع أسلوبك",
  },
  {
    src: "https://snd-zone.b-cdn.net/assets/product-page/image-2-4.png",
    alt: "سند يتابع تقدّمك",
  },
];

export function TutorBenefitsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 4000);
  }, [api]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();
    startAutoplay();

    return () => {
      api.off("select", onSelect);
      stopAutoplay();
    };
  }, [api, startAutoplay, stopAutoplay]);

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div
        className="relative"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <Carousel
          setApi={setApi}
          opts={{ loop: true, direction: "rtl" }}
          className="w-full"
        >
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  className="rounded-2xl shadow-lg shadow-chart-2/20 aspect-[4/3] object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-2 mt-4">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-8 bg-gradient-to-r from-chart-2 to-chart-1"
                  : "w-2 bg-border/50 hover:bg-border"
              }`}
              aria-label={`الانتقال إلى الصورة ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {tutorBenefits.map((benefit, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={benefit.title}
              onClick={() => api?.scrollTo(index)}
              className={`w-full flex gap-4 items-start rounded-xl border p-4 text-right transition-all duration-500 cursor-pointer ${
                isActive
                  ? "bg-chart-1/[0.08] border-chart-1/40 scale-[1.02] shadow-md shadow-chart-1/10"
                  : "bg-card/40 border-border/30 hover:border-chart-1/20"
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-chart-2 to-chart-1 shadow-md shadow-chart-2/20"
                    : "bg-gradient-to-br from-chart-2/20 to-chart-1/20"
                }`}
              >
                <benefit.icon
                  className={`w-5 h-5 transition-colors duration-500 ${
                    isActive ? "text-white" : "text-chart-2"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`font-semibold mb-1 transition-colors duration-500 ${
                    isActive ? "text-foreground" : "text-foreground/80"
                  }`}
                >
                  {benefit.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-foreground/70" : "text-foreground/50"
                  }`}
                >
                  {benefit.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
