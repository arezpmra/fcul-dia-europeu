import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowDown, Database, Landmark, Percent } from 'lucide-react';

export default function Hero() {
  const scrollToSession = (session: 'school' | 'main') => {
    const hash = session === 'main' ? '#programa-tarde' : '#programa-manha';
    window.history.pushState(null, '', hash);
    window.dispatchEvent(new CustomEvent('switch-schedule-tab', { detail: session }));
    const el = document.getElementById('programa');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden border-b border-editorial-dark/15">
      
      {/* Background Decorative Grid - subtle newspaper columns */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#12121208_1px,transparent_1px),linear-gradient(to_bottom,#12121208_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center space-y-12">
        
        {/* Main Title */}
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00539F]/10 border border-[#00539F]/30 text-[#00539F] text-xs font-mono font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 bg-[#00539F] rounded-full animate-pulse"></span>
            10.º Aniversário do Dia Europeu da Estatística
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif text-[#00539F] leading-[1.05] tracking-tighter"
          >
            Dia Europeu da <br />
            Estatística 2026
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-editorial-dark/80 leading-relaxed font-sans max-w-2xl mx-auto space-y-3"
          >
            <p>
              No âmbito do Dia Europeu da Estatística, assinalado a 20 de outubro, o Departamento de Ciências Matemáticas da Faculdade de Ciências da Universidade de Lisboa, a Sociedade Portuguesa de Estatística e o Centro de Estatística e Aplicações promovem um dia dedicado à celebração e divulgação da Estatística.
            </p>
            <p>
              A iniciativa pretende promover o diálogo entre escolas, universidades, profissionais e instituições, contribuindo para valorizar a Estatística e pensar o futuro da sua formação em Portugal.
            </p>
            <div className="pt-2">
              <a
                href="https://ec.europa.eu/eurostat/web/european-statistical-system/european-statistics-day"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-editorial-accent hover:text-editorial-dark border-b border-editorial-accent hover:border-editorial-dark pb-0.5 transition-colors"
              >
                <span>Página Oficial do Dia Europeu da Estatística (Eurostat)</span>
                <span className="text-sm leading-none">↗</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dual Cards representing the two sessions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left pt-6">
          
          {/* Card 1: Manhã */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onClick={() => scrollToSession('school')}
            className="bg-editorial-cream border-2 border-editorial-dark p-8 rounded-none shadow-none hover:bg-editorial-warm transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-editorial-dark/80 group-hover:text-editorial-accent transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-widest">MANHÃ</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-editorial-dark group-hover:text-editorial-accent transition-colors duration-200">
                Sessão com Escolas e Jovens
              </h2>
              <p className="text-sm text-editorial-dark/75 leading-relaxed font-sans">
                Destinado a estudantes do 3.º ciclo do ensino básico e do ensino secundário: uma manhã de descoberta com a exposição “Explorística”, em colaboração com o Instituto Nacional de Estatística (INE), e palestras dedicadas à Estatística.
              </p>
              <div className="pt-2 flex flex-col space-y-1 text-xs text-editorial-dark/60 font-mono border-t border-editorial-dark/10 pt-4">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-editorial-dark/70" /> 
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio+C6,+Ci%C3%AAncias+ULisboa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-editorial-accent hover:underline transition-colors"
                  >
                    Sala SAS LAB, Edifício C6, Ciências ULisboa
                  </a>
                </span>
                <span>⏱ Horário: 10h00 às 12h30</span>
              </div>
              <div className="pt-4">
                <a
                  href="#programa-manha"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSession('school');
                  }}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-editorial-dark border-b border-editorial-dark group-hover:text-editorial-accent group-hover:border-editorial-accent transition-colors"
                >
                  Programa <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Tarde */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            onClick={() => scrollToSession('main')}
            className="bg-editorial-cream border-2 border-editorial-dark p-8 rounded-none shadow-none hover:bg-editorial-warm transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-editorial-dark/80 group-hover:text-editorial-accent transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-widest">TARDE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-editorial-dark group-hover:text-editorial-accent transition-colors duration-200">
                Academia e Empresas 
              </h2>
              <p className="text-sm text-editorial-dark/75 leading-relaxed font-sans">
                A sessão conta com duas mesas-redondas: uma centrada no perfil e nas competências valorizados por organizações e instituições e outra dedicada à formação em Estatística ao nível dos 1.º e 2.º ciclos do ensino superior. 
              </p>
              <div className="pt-2 flex flex-col space-y-1 text-xs text-editorial-dark/60 font-mono border-t border-editorial-dark/10 pt-4">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-editorial-dark/70" /> 
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio+C6,+Ci%C3%AAncias+ULisboa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-editorial-accent hover:underline transition-colors"
                  >
                    Sala 6.1.36, Edifício C6, Ciências ULisboa
                  </a>
                </span>
                <span>⏱ Horário: 14h30 às 18h30</span>
              </div>
              <div className="pt-4">
                <a
                  href="#programa-tarde"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSession('main');
                  }}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-editorial-dark border-b border-editorial-dark group-hover:text-editorial-accent group-hover:border-editorial-accent transition-colors"
                >
                  Programa <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Floating statistics/metrics - Styled as custom flat table footer strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto bg-editorial-warm p-6 rounded-none border-t border-b border-editorial-dark/50 items-center justify-center"
        >
          <div className="text-center border-r border-editorial-dark/20 last:border-0 h-full flex items-center justify-center">
            <span className="block text-xl md:text-2xl font-serif italic text-editorial-dark font-medium leading-tight">1 Dia</span>
          </div>
          <div className="text-center md:border-r border-editorial-dark/20 last:border-0 h-full flex items-center justify-center">
            <span className="block text-xl md:text-2xl font-serif italic text-editorial-accent font-medium leading-tight">3 Palestras</span>
          </div>
          <div className="text-center border-r border-editorial-dark/20 last:border-0 h-full flex items-center justify-center px-1">
            <span className="block text-xl md:text-2xl font-serif italic text-editorial-dark font-medium leading-tight">2 Mesas Redondas</span>
          </div>
          <div className="text-center last:border-0 h-full flex items-center justify-center px-1">
            <span className="block text-xl md:text-2xl font-serif italic text-editorial-accent font-medium leading-tight">Explorística</span>
          </div>
        </motion.div>

        {/* Navigation CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-6 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#inscricao"
            className="bg-editorial-dark text-editorial-cream border border-editorial-dark font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none hover:bg-editorial-cream hover:text-editorial-dark transition-all duration-300"
          >
            Inscrição
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="pt-10 inline-flex flex-col items-center space-y-2 text-editorial-dark/60 cursor-pointer text-xs font-mono"
        >
          <span className="text-[10px] uppercase tracking-widest font-black">Desça para explorar</span>
          <ArrowDown className="w-4 h-4 text-editorial-accent" />
        </motion.div>

      </div>
    </section>
  );
}
