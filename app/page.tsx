'use client';
import { useRouter } from 'next/navigation';
import generateID from '@/tools/simpleID';

export default function Home() {
  const router = useRouter();

  const handleCreateGame = () => {
    const id = generateID();
    router.push(`/${id}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleCreateGame}
        className="bg-blue-600 text-white text-lg px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Create New Game
      </button>
    </main>
  );
}

