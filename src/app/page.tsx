"use client";

import { useState, useEffect } from "react";
import { Card } from "@radix-ui/themes";
import ProgressCard from "@/components/cards/progress-card";

interface SkillProgress {
  title: string;
  hours: number;
}

export default function Home() {
  const [skills, setSkills] = useState<SkillProgress[]>([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const handleDelete = (title: string) => {
    setSkills((prev) => prev.filter((skill) => skill.title !== title));
  };

  useEffect(() => {
    const savedSkills = localStorage.getItem("progress-tracker-skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("progress-tracker-skills", JSON.stringify(skills));
  }, [skills]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillName.trim()) {
      setSkills((prev) => [...prev, { title: newSkillName.trim(), hours: 0 }]);
      setNewSkillName("");
      setIsAddingSkill(false);
    }
  };

  const handleProgressUpdate = (title: string, hours: number) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.title === title ? { ...skill, hours } : skill))
    );
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Progress Tracker</h1>
          {!isAddingSkill && (
            <button
              onClick={() => setIsAddingSkill(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Skill
            </button>
          )}
        </div>

        {isAddingSkill && (
          <Card className="mb-6 p-4">
            <form onSubmit={handleAddSkill} className="flex gap-4">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Enter skill name"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingSkill(false);
                  setNewSkillName("");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <ProgressCard
              key={skill.title}
              title={skill.title}
              initialHours={skill.hours}
              onProgressUpdate={(hours: number) =>
                handleProgressUpdate(skill.title, hours)
              }
              onReset={() => handleProgressUpdate(skill.title, 0)}
              onDelete={() => handleDelete(skill.title)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
