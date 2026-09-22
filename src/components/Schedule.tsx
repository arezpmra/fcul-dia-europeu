import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { schoolEvent, mainEvent } from '../data';
import { Calendar, MapPin, Users, ChevronDown, ChevronUp, Clock, HelpCircle, X } from 'lucide-react';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'school' | 'main'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#programa-tarde' || hash === '#tarde') return 'main';
      if (hash === '#programa-manha' || hash === '#manha') return 'school';
    }
    return 'school';
  });
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedSpeaker, setSelectedSpeaker] = useState<{name: string, bio: string, photo: string, affiliation: string} | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#programa-tarde' || hash === '#tarde') {
        setActiveTab('main');
      } else if (hash === '#programa-manha' || hash === '#manha') {
        setActiveTab('school');
      }
    };

    const handleCustomTab = (e: any) => {
      if (e.detail === 'main' || e.detail === 'school') {
        setActiveTab(e.detail);
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('switch-schedule-tab', handleCustomTab);
    handleHash();

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('switch-schedule-tab', handleCustomTab);
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTabChange = (tab: 'school' | 'main') => {
    setActiveTab(tab);
    const newHash = tab === 'main' ? '#programa-tarde' : '#programa-manha';
    window.history.replaceState(null, '', newHash);
  };

  return (
    <section id="programa" className="py-24 border-b border-editorial-dark/15 scroll-mt-24 relative">
      <div id="programa-manha" className="absolute -top-24 left-0 pointer-events-none" />
      <div id="programa-tarde" className="absolute -top-24 left-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="flex items-center gap-3 justify-center mb-2">
            <span className="h-[1px] w-8 bg-editorial-dark"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-editorial-dark/60">Planeamento</span>
            <span className="h-[1px] w-8 bg-editorial-dark"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-editorial-dark tracking-tight">
            Programa
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#F4F1EA] border border-editorial-dark/30 max-w-md mx-auto mb-12 shadow-none">
          <button
            onClick={() => handleTabChange('school')}
            className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'school'
                ? 'bg-editorial-dark text-editorial-cream font-black'
                : 'text-editorial-dark/60 hover:text-editorial-dark'
            }`}
          >
            Manhã
          </button>
          <button
            onClick={() => handleTabChange('main')}
            className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'main'
                ? 'bg-editorial-dark text-editorial-cream font-black'
                : 'text-editorial-dark/60 hover:text-editorial-dark'
            }`}
          >
            Tarde
          </button>
        </div>

        {/* Active Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'school' ? (
            <motion.div
              key="school-events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Event Metadata Banner */}
              <div className="bg-editorial-cream border-2 border-editorial-dark p-8 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2.5">
                  <span className="inline-block bg-editorial-dark text-editorial-cream text-[9px] font-mono font-bold px-2.5 py-1 rounded-none uppercase tracking-widest">
                    Público Escolar
                  </span>
                  <h3 className="text-2xl font-serif text-editorial-dark">
                    Atividades e MiniPalestras
                  </h3>
                  <p className="text-sm text-editorial-dark/70 max-w-xl font-sans">
                    {schoolEvent.description}
                  </p>
                </div>
                <div className="flex flex-col space-y-1.5 text-xs text-editorial-dark/80 font-mono border-t md:border-t-0 md:border-l border-editorial-dark/20 pt-4 md:pt-0 md:pl-6">
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-editorial-accent" /> {schoolEvent.date}</span>
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-editorial-accent" /> {schoolEvent.timeRange}</span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-editorial-accent" /> 
                    <a href="https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio+C6,+Ci%C3%AAncias+ULisboa" target="_blank" rel="noopener noreferrer" className="hover:text-editorial-accent hover:underline transition-colors">
                      {schoolEvent.location}
                    </a>
                  </span>
                </div>
              </div>

              {/* Timeline list */}
              <div className="relative border-l border-editorial-dark/30 pl-6 ml-4 space-y-8">
                {schoolEvent.schedule.map((item, index) => {
                  const isLecture = item.activity.toLowerCase().includes('palestra');
                  const itemId = `school-${index}`;
                  const isExpanded = !!expandedItems[itemId];

                  return (
                    <div key={itemId} className="relative group">
                      
                      {/* Circle marker */}
                      <span className={`absolute -left-[30px] top-1.5 w-3 h-3 rounded-full border bg-editorial-cream transition-colors ${
                        isLecture 
                          ? 'border-editorial-accent group-hover:bg-editorial-accent' 
                          : 'border-editorial-dark/40 group-hover:bg-editorial-dark'
                      }`}></span>

                      <div className="space-y-2">
                        {/* Time & Activity Header */}
                        <div className="flex flex-wrap items-baseline gap-3">
                          <span className="font-mono text-xs font-bold bg-editorial-dark/5 text-editorial-dark px-2 py-0.5 rounded-none border border-editorial-dark/15">
                            {item.time}
                          </span>
                          <h4 className="text-lg font-serif text-editorial-dark transition-colors">
                            {/* @ts-ignore */}
                            {(item as any).speakerInfo ? (
                              <button 
                                onClick={() => setSelectedSpeaker((item as any).speakerInfo as any)}
                                className="text-left hover:text-editorial-accent hover:underline decoration-1 underline-offset-4 cursor-pointer"
                              >
                                {item.activity}
                              </button>
                            ) : (
                              <span className="group-hover:text-editorial-accent transition-colors">
                                {item.activity}
                              </span>
                            )}
                          </h4>
                          {item.location && (
                            <span className="text-xs text-editorial-dark/50 font-mono">
                              📍 {item.location}
                            </span>
                          )}
                        </div>

                        {/* Title of the lecture if any */}
                        {item.subtitle && (
                          <div className="text-editorial-dark font-medium text-sm font-sans">
                            Título: "{item.subtitle}"
                          </div>
                        )}

                        {/* Expandable Description for Talks */}
                        {isLecture ? (
                          <div className="bg-[#F4F1EA] p-4 rounded-none border border-editorial-dark/10">
                            <button
                              onClick={() => toggleExpand(itemId)}
                              className="flex items-center justify-between w-full text-left text-xs font-bold uppercase tracking-widest text-editorial-dark/70 hover:text-editorial-accent cursor-pointer"
                            >
                              <span>{isExpanded ? 'Ocultar' : 'Ver Mais'}</span>
                              {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                            </button>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden mt-3"
                                >
                                  <p className="text-xs md:text-sm text-editorial-dark/75 leading-relaxed pt-2 border-t border-editorial-dark/15 font-sans">
                                    {item.description}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <p className="text-xs md:text-sm text-editorial-dark/70 leading-relaxed max-w-3xl font-sans">
                            {item.description}
                          </p>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main-events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Event Metadata Banner */}
              <div className="bg-editorial-cream border-2 border-editorial-dark p-8 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2.5">
                  <span className="inline-block bg-editorial-accent text-editorial-cream text-[9px] font-mono font-bold px-2.5 py-1 rounded-none uppercase tracking-widest">
                    Academia e Empresas
                  </span>
                  <h3 className="text-2xl font-serif text-editorial-dark leading-snug">
                    {mainEvent.title}
                  </h3>
                  <p className="text-sm text-editorial-dark/70 max-w-xl font-sans">
                    {mainEvent.description}
                  </p>
                </div>
                <div className="flex flex-col space-y-1.5 text-xs text-editorial-dark/80 font-mono border-t md:border-t-0 md:border-l border-editorial-dark/20 pt-4 md:pt-0 md:pl-6 flex-shrink-0">
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-editorial-accent" /> {mainEvent.date}</span>
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-editorial-accent" /> {mainEvent.timeRange}</span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-editorial-accent" /> 
                    <a href="https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio+C6,+Ci%C3%AAncias+ULisboa" target="_blank" rel="noopener noreferrer" className="hover:text-editorial-accent hover:underline transition-colors">
                      Sala 6.1.36, Edifício C6, Ciências ULisboa
                    </a>
                  </span>
                </div>
              </div>

              {/* Timeline list */}
              <div className="relative border-l border-editorial-dark/30 pl-6 ml-4 space-y-8">
                {mainEvent.schedule.map((item, index) => {
                  const hasSpeakers = item.speakers && item.speakers.length > 0;
                  const itemId = `main-${index}`;

                  return (
                    <div key={itemId} className="relative group">
                      
                      {/* Circle marker */}
                      <span className={`absolute -left-[30px] top-1.5 w-3 h-3 rounded-full border bg-editorial-cream transition-colors ${
                        hasSpeakers 
                          ? 'border-editorial-accent group-hover:bg-editorial-accent' 
                          : 'border-editorial-dark/40 group-hover:bg-editorial-dark'
                      }`}></span>

                      <div className="space-y-3">
                        {/* Time & Activity Header */}
                        <div className="flex flex-wrap items-baseline gap-3">
                          <span className="font-mono text-xs font-bold bg-editorial-dark/5 text-editorial-dark px-2 py-0.5 rounded-none border border-editorial-dark/15">
                            {item.time}
                          </span>
                          <h4 className="text-lg font-serif text-editorial-dark transition-colors">
                            {/* @ts-ignore */}
                            {(item as any).speakerInfo ? (
                              <button 
                                onClick={() => setSelectedSpeaker((item as any).speakerInfo as any)}
                                className="text-left hover:text-editorial-accent hover:underline decoration-1 underline-offset-4 cursor-pointer"
                              >
                                {item.activity}
                              </button>
                            ) : (
                              <span className="group-hover:text-editorial-accent transition-colors">
                                {item.activity}
                              </span>
                            )}
                          </h4>
                        </div>

                        {/* Moderator */}
                        {item.moderator && (
                          <div className="text-sm text-editorial-dark font-sans flex items-center gap-2">
                            <span>Moderadora:</span>
                            {(item as any).moderatorInfo ? (
                              <button
                                onClick={() => setSelectedSpeaker((item as any).moderatorInfo)}
                                className="text-editorial-accent font-black underline decoration-1 underline-offset-4 hover:text-editorial-dark transition-colors cursor-pointer inline-flex items-center gap-1 group/mod"
                                title="Clique para ver a biografia"
                              >
                                <span>{item.moderator}</span>
                              </button>
                            ) : (
                              <strong className="text-editorial-accent font-black underline decoration-1 underline-offset-4">
                                {item.moderator}
                              </strong>
                            )}
                          </div>
                        )}

                        {/* Panel description if any */}
                        {item.description && (
                          <p className="text-xs md:text-sm text-editorial-dark/65 max-w-3xl font-sans">
                            {item.description}
                          </p>
                        )}

                        {/* Extra details (Abertura/Coffee/Encerramento) */}
                        {item.details && (
                          <div className="text-xs md:text-sm text-editorial-dark/80 leading-relaxed max-w-3xl bg-[#F4F1EA] p-4 rounded-none border border-editorial-dark/15 font-sans space-y-3">
                            <p className="font-medium text-editorial-dark">{item.details}</p>
                            {/* @ts-ignore */}
                            {(item as any).openingSpeakers && (
                              <ul className="space-y-2 pt-1 border-t border-editorial-dark/10">
                                {/* @ts-ignore */}
                                {(item as any).openingSpeakers.map((spk: { role: string; name: string }, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm">
                                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none mt-1.5 shrink-0"></span>
                                    <span>
                                      <span className="font-bold text-editorial-dark">{spk.role}:</span>{' '}
                                      <span className="text-editorial-accent font-semibold">{spk.name}</span>
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        {/* Speakers Panel Cards */}
                        {hasSpeakers && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 max-w-4xl">
                            {item.speakers?.map((speaker) => {
                              const hasBio = Boolean((speaker as any).speakerInfo);
                              return (
                                <div
                                  key={speaker.name}
                                  onClick={() => {
                                    if (hasBio) {
                                      setSelectedSpeaker((speaker as any).speakerInfo);
                                    }
                                  }}
                                  className={`bg-editorial-cream p-4 rounded-none border border-editorial-dark/25 transition-all duration-300 shadow-none ${
                                    hasBio 
                                      ? 'hover:border-editorial-accent hover:bg-editorial-warm cursor-pointer group/spk' 
                                      : 'hover:border-editorial-dark hover:bg-editorial-warm'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="block text-[9px] font-mono uppercase tracking-widest text-editorial-accent">
                                      {speaker.gender === 'F' ? 'Oradora' : (speaker.gender === 'M' ? 'Orador' : 'Orador(a)')}
                                    </span>
                                  </div>
                                  <span className={`block text-sm font-bold font-sans ${hasBio ? 'text-editorial-dark group-hover/spk:text-editorial-accent' : 'text-editorial-dark'}`}>
                                    {speaker.name}
                                  </span>
                                  {speaker.org && (
                                    <span className="block text-xs text-editorial-dark/60 mt-0.5 font-sans">
                                      {speaker.org}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      <AnimatePresence>
        {selectedSpeaker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-editorial-dark/60 backdrop-blur-sm"
              onClick={() => setSelectedSpeaker(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-editorial-cream border-2 border-editorial-dark shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
            >
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 right-4 z-10 text-editorial-dark hover:text-editorial-accent bg-editorial-cream p-1 border border-editorial-dark"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-full md:w-2/5 shrink-0 bg-editorial-dark/5 border-b md:border-b-0 md:border-r border-editorial-dark/10 h-72 md:h-auto flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedSpeaker.photo} 
                  alt={selectedSpeaker.name} 
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01]"
                  style={{ imageRendering: 'auto' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<div class="p-8 text-center"><span class="font-serif text-3xl font-bold text-editorial-dark/30">${selectedSpeaker.name.split(' ').map((n: string) => n[0]).join('')}</span></div>`;
                  }}
                />
              </div>
              
              <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto">
                <h3 className="text-3xl md:text-4xl font-serif text-editorial-dark mb-2">{selectedSpeaker.name}</h3>
                <p className="text-editorial-accent font-mono text-sm tracking-wide font-bold mb-6">{selectedSpeaker.affiliation}</p>
                
                <div className="prose prose-sm md:prose-base prose-slate prose-p:font-sans prose-p:leading-relaxed text-editorial-dark/80 max-w-none">
                  {selectedSpeaker.bio.split('\n').map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
