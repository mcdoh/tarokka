"use client";

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { socket } from "@/socket";

import Card from '@/components/Card';

import type { GameCard, GameUpdate, ClientUpdate } from '@/types';

export default function GamePage() {
  const { gameID: gameIDParam } = useParams();

  const [gameID, setGameID] = useState('');
  const [cards, setCards] = useState<GameCard[]>([]);

  useEffect(() => {
    if (gameIDParam) {
      setGameID(Array.isArray(gameIDParam) ? gameIDParam[0] : gameIDParam);
    }
  }, [gameIDParam])

  useEffect(() => {
    if (gameID) {
      socket.emit('join', gameID);

      socket.on('init', (data: GameUpdate) => {
        console.log('init', data);
        setCards(data.cards);
      });

      socket.on('card-flipped', (data: GameUpdate) => {
        console.log('>>>', data);
        setCards(data.cards);
      });
    }

    return gameID ? () => {
      socket.off('init');
      socket.off('card-flipped');
    } : undefined;
  }, [gameID]);

  const flipCard = (cardIndex: number) => {
    const flip: ClientUpdate = {
      gameID,
      cardIndex,
    };

    socket.emit('flip-card', flip);
  };

  return cards.length ? (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Game ID: {gameID}</h1>

      <div className="grid grid-cols-3 grid-rows-3 gap-4 w-fit mx-auto">
        {Array.from({ length: 9 }).map((_, i) => {
          const cardIndex = [1, 3, 4, 5, 7].indexOf(i);

          return (
            <div key={i} className="aspect-[2/3] w-24}">
              {cardIndex !== -1 && <Card card={cards[cardIndex]} flipAction={() => flipCard(cardIndex)} />}
            </div>
          )
        })}
      </div>
    </main>
  ) : null;
}
