import React from 'react';
import { motion } from 'motion/react';
import { schoolEvent, mainEvent } from '../data';

export default function Speakers() {
  // Extract speakers from the schoolEvent schedule that have speakerInfo
  // @ts-ignore
  const morningSpeakers = schoolEvent.schedule
    .filter(item => (item as any).speakerInfo)
    .map(item => (item as any).speakerInfo);

  // Extract speakers and moderators from the mainEvent schedule that have speakerInfo/moderatorInfo
  const afternoonSpeakers: any[] = [];
  mainEvent.schedule.forEach(item => {
    if ((item as any).moderatorInfo) {
      afternoonSpeakers.push({
        ...(item as any).moderatorInfo,
        role: 'Moderadora'
      });
    }
    if ((item as any).speakers) {
      (item as any).speakers.forEach((s: any) => {
        if (s.speakerInfo) {
          afternoonSpeakers.push(s.speakerInfo);
        }
      });
    }
  });

  const speakers = [...morningSpeakers, ...afternoonSpeakers];

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-editorial-dark tracking-tight">
          Oradores
        </h2>
        <p className="text-editorial-dark/70 text-sm md:text-base font-sans max-w-2xl mx-auto">
          Conheça os especialistas que irão partilhar o seu conhecimento e perspetivas durante o evento.
        </p>
      </div>

      <div className="space-y-20">
        {speakers.map((speaker, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-start`}
          >
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-[4/5] sm:aspect-square w-full max-w-[280px] mx-auto md:max-w-none overflow-hidden border-2 border-editorial-dark/15 bg-editorial-cream flex items-center justify-center shadow-sm">
                <img 
                  src={speaker.photo} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover object-top transition-all duration-500 filter contrast-[1.02] hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('bg-editorial-dark/5');
                  }}
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-editorial-dark mb-1">{speaker.name}</h3>
                <p className="text-editorial-accent font-mono text-sm tracking-wide font-bold">{speaker.affiliation}</p>
              </div>
              
              <div className="prose prose-sm md:prose-base prose-slate prose-p:font-sans prose-p:leading-relaxed text-editorial-dark/80 max-w-none">
                {speaker.bio.split('\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
