"use client";

import { useState, useEffect } from "react";
import { Card } from "@radix-ui/themes";

interface ProgressCardProps {
  title: string;
  initialHours: number;
  onProgressUpdate: (hours: number) => void;
  onReset: () => void;
  onDelete: () => void;
}

export default function ProgressCard({
  title,
  initialHours,
  onProgressUpdate,
  onReset,
  onDelete,
}: ProgressCardProps) {
  const [hours, setHours] = useState(initialHours);

  useEffect(() => {
    setHours(initialHours);
  }, [initialHours]);

  const handleTimeClick = (increment: number) => {
    const newHours = Math.min(5, hours + increment);
    setHours(newHours);
    onProgressUpdate(newHours);
  };

  const progress = (hours / 5) * 100;

  return (
    <Card className="p-4">
      <div className="mb-4">
        <div className="text-lg font-bold mb-1">{title}</div>
        <div className="text-sm text-gray-500">{hours} / 5 hours</div>
      </div>

      <div className="h-1 bg-gray-200 rounded-full mb-4">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleTimeClick(0.5)}
          className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          30min
        </button>
        <button
          onClick={() => handleTimeClick(1)}
          className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          1h
        </button>
        <button
          onClick={() => handleTimeClick(2)}
          className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          2h
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
        <button
          onClick={onReset}
          className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Reset
        </button>
      </div>
    </Card>
  );
}
