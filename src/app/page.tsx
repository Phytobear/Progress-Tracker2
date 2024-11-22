"use client";

import { Container, Heading, Grid } from "@radix-ui/themes";
import { ProgressCard } from "@/components/cards/progress-card";

const skills = ["JavaScript", "Python", "Tailwind", "Obsidian"];

export default function Home() {
  return (
    <Container size="4" py="6">
      <Heading size="6" mb="5" className="font-sans">
        Daily Progress Tracker
      </Heading>

      <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4">
        {skills.map((skill) => (
          <ProgressCard key={skill} title={skill} />
        ))}
      </Grid>
    </Container>
  );
}
