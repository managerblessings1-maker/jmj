import React from 'react';
import { Skill } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ICONS } from '../constants';

interface SkillsViewProps {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ skills, setSkills }) => {
  
  const toggleStage = (skillId: string, stageId: string) => {
    const updatedSkills = skills.map(skill => {
      if (skill.id !== skillId) return skill;
      
      const updatedStages = skill.stages.map(stage => 
        stage.id === stageId ? { ...stage, isCompleted: !stage.isCompleted } : stage
      );
      
      const completedCount = updatedStages.filter(s => s.isCompleted).length;
      const progress = Math.round((completedCount / updatedStages.length) * 100);
      
      return { ...skill, stages: updatedStages, progress };
    });
    setSkills(updatedSkills);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-white">Skill Development</h2>
        <Button size="sm" icon={<ICONS.Plus size={16} />}>New Skill</Button>
      </div>

      <div className="grid gap-6">
        {skills.map(skill => (
          <Card key={skill.id} className="relative overflow-visible">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-orange-500 tracking-wider uppercase bg-orange-500/10 px-2 py-1 rounded mb-2 inline-block">
                  {skill.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{skill.title}</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-500">{skill.progress}%</div>
                <div className="text-xs text-zinc-500">Mastery</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-zinc-800 rounded-full mb-6">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-700"
                style={{ width: `${skill.progress}%` }}
              />
            </div>

            {/* Timeline Stages */}
            <div className="relative pl-4 space-y-6 border-l border-zinc-800 ml-2">
              {skill.stages.map((stage, idx) => (
                <div key={stage.id} className="relative group cursor-pointer" onClick={() => toggleStage(skill.id, stage.id)}>
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                    stage.isCompleted 
                      ? 'bg-orange-500 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' 
                      : 'bg-zinc-900 border-zinc-600 group-hover:border-orange-500'
                  }`} />
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium transition-colors ${
                      stage.isCompleted ? 'text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}>
                      {stage.title}
                    </span>
                    {stage.isCompleted && <ICONS.Check size={14} className="text-orange-500" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Footer */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-500">
                {skill.stages.filter(s => s.isCompleted).length} of {skill.stages.length} stages completed
              </span>
              {skill.videoUrl && (
                <a 
                  href={skill.videoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <ICONS.Play size={14} />
                  Watch Tutorials
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};