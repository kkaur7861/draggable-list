"use client"
import Head from 'next/head';
import DraggableList from "./components/DraggableList";
export default function Home() {
  return (
    <div>
      <main className="flex flex-col bg-black">
        <DraggableList />
      </main>
    </div>

  );
}
