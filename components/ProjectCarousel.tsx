"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ProjectCarouselProps = {
    photos: string[];
    name: string;
};

export default function ProjectCarousel({ photos, name }: ProjectCarouselProps) {
    const [index, setIndex] = useState(0);
    const count = photos.length;

    function previous() {
        setIndex((i) => (i - 1 + count) % count);
    }

    function next() {
        setIndex((i) => (i + 1) % count);
    }

    // Where the finger first touched; a ref, because changing it doesn't need a re-render
    const touchStartX = useRef<number | null>(null);

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
    }

    function handleTouchStart(event: React.TouchEvent) {
        touchStartX.current = event.touches[0].clientX;
    }

    function handleTouchEnd(event: React.TouchEvent) {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;

        if (distance < -50) next(); // finger moved left
        if (distance > 50) previous(); // finger moved right
    }

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={`${name} photos`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div
                className="relative aspect-5/6 touch-pan-y overflow-hidden bg-tile"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <Image
                    key={photos[index]}
                    src={photos[index]}
                    alt={`${name}, photo ${index + 1} of ${count}`}
                    fill
                    sizes="(min-width: 1024px) 524px, 100vw"
                    loading={index === 0 ? "eager" : undefined}
                />

                {count > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={previous}
                            aria-label="Previous photo"
                            className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/80 text-ink"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next photo"
                            className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/80 text-ink"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {count > 1 && (
                <p aria-live="polite" className="mt-3 text-center text-muted">
                    {index + 1} / {count}
                </p>
            )}
        </div>
    );
}
