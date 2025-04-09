'use client';

type CardProps = {
  id: string;
  flipped: boolean;
  onFlip: (id: string) => void;
};

export default function Card({ id, flipped, onFlip }: CardProps) {
  return (
    <div
      className={`w-24 h-32 flex items-center justify-center cursor-pointer`}
      onClick={() => onFlip(id)}
    >
      {flipped ? (
        <img
          src={`/cards/${id}.svg`}
        />
      ) : (
        <img
          src="/cards/1B.svg"
        />
      )
      }
    </div>
  );
}

