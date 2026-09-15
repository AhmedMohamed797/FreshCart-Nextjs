"use client";
import { toast } from "sonner";

export default function Home() {
  return (
    <h1>
      Home Page
      <button
        onClick={() => toast("Hello")}
        className="bg-violet-600 text-white rounded-2xl p-3"
      >
        Button
      </button>
    </h1>
  );
}
