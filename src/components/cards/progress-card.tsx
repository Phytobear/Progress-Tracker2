import React, { useState } from "react";
import { Card, Text, Button, Flex, Box } from "@radix-ui/themes";

interface ProgressCardProps {
  title: string;
}

export function ProgressCard({ title }: ProgressCardProps) {
  const [progress, setProgress] = useState(0);
  const MAX_HOURS = 5;

  const handleTimeClick = (hours: number) => {
    const newProgress = Math.min(progress + (hours / MAX_HOURS) * 100, 100);
    setProgress(newProgress);
  };

  return (
    <Card size="2" style={{ maxWidth: 340 }}>
      <Flex direction="column" gap="3">
        <Text size="5" weight="bold" as="p" className="font-sans">
          {title}
        </Text>

        <Flex gap="3" justify="between">
          <Button
            variant="soft"
            onClick={() => handleTimeClick(0.5)}
            className="flex-1"
          >
            30min
          </Button>
          <Button
            variant="soft"
            onClick={() => handleTimeClick(1)}
            className="flex-1"
          >
            1h
          </Button>
          <Button
            variant="soft"
            onClick={() => handleTimeClick(2)}
            className="flex-1"
          >
            2h
          </Button>
        </Flex>

        <Box className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <Box
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </Box>

        <Text align="center" size="2" color="gray" className="font-mono">
          {Math.round((progress / 100) * MAX_HOURS * 10) / 10}h / {MAX_HOURS}h
        </Text>
      </Flex>
    </Card>
  );
}
