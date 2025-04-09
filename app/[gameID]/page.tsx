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

  const flipCard = (cardID: string) => {
    const flip: ClientUpdate = {
      gameID,
      cardID,
    };

    socket.emit('flip-card', flip);
  };

  return cards.length ? (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Game ID: {gameID}</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-start-2">
          <Card id={cards[0].id} flipped={cards[0].flipped} onFlip={flipCard} />
        </div>
        <div className="col-start-1">
          <Card id={cards[1].id} flipped={cards[1].flipped} onFlip={flipCard} />
        </div>
        <div>
          <Card id={cards[2].id} flipped={cards[2].flipped} onFlip={flipCard} />
        </div>
        <div>
          <Card id={cards[3].id} flipped={cards[3].flipped} onFlip={flipCard} />
        </div>
        <div className="col-start-2">
          <Card id={cards[4].id} flipped={cards[4].flipped} onFlip={flipCard} />
        </div>
      </div>
    </main>
  ) : null;
}
