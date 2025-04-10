'use client';

import { StandardGameCard, TarokkaGameCard } from "@/types";

type CardProps = {
  card: StandardGameCard | TarokkaGameCard;
  flipAction: () => void;
};

export default function Card({ card: { aria, url }, flipAction }: CardProps) {
  return (
    <div
      className={`w-24 h-32 flex items-center justify-center cursor-pointer`}
      onClick={flipAction}
    >
      <img
        src={url}
        alt={aria}
      />
    </div>
  );
}

