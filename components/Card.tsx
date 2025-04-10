'use client';

import { StandardGameCard, TarokkaGameCard } from "@/types";

type CardProps = {
  card: StandardGameCard | TarokkaGameCard;
  flipAction: () => void;
};

export default function Card({ card: { aria, url }, flipAction }: CardProps) {
  return (
    <div
      className="h-[21vh] w-[15vh] flex items-center justify-center cursor-pointer"
      onClick={flipAction}
    >
      <img
        className="rounded-xl"
        src={url}
        alt={aria}
      />
    </div>
  );
}

