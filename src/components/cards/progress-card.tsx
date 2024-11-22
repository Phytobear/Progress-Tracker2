"use client";

import React, { useState, useEffect } from "react";
import { Card, Flex } from "@radix-ui/themes";

interface ProgressCardProps {
  title: string;
}

export function ProgressCard({ title }: ProgressCardProps) {
  const [hours, setHours] = useState(0);
  const MAX_HOURS = 5;

  useEffect(() => {
    const savedHours = localStorage.getItem(`progress-${title}`);
    if (savedHours) {
      setHours(parseFloat(savedHours));
    }
  }, [title]);

  const handleTimeClick = (addedHours: number) => {
    setHours((prevHours) => {
      const newHours = Math.min(prevHours + addedHours, MAX_HOURS);
      localStorage.setItem(`progress-${title}`, newHours.toString());
      return newHours;
    });
  };

  const handleReset = () => {
    setHours(0);
    localStorage.removeItem(`progress-${title}`);
  };

  const progressPercentage = (hours / MAX_HOURS) * 100;

  return (
    <Card size="2" style={{ maxWidth: 340 }}>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <div className="font-sans text-xl font-bold">{title}</div>
          <button
            onClick={handleReset}
            className="text-xs text-red-500 hover:text-red-600 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
          >
            Clear
          </button>
        </Flex>

        <Flex gap="3" justify="between">
          <button
            onClick={() => handleTimeClick(0.5)}
            className="flex-1 px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            30min
          </button>
          <button
            onClick={() => handleTimeClick(1)}
            className="flex-1 px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            1h
          </button>
          <button
            onClick={() => handleTimeClick(2)}
            className="flex-1 px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            2h
          </button>
        </Flex>

        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="text-center font-mono text-sm text-gray-500">
          {hours.toFixed(1)}h / {MAX_HOURS}h
        </div>
      </Flex>
    </Card>
  );
}
