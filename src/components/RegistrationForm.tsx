import { motion } from 'motion/react';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';

export default function RegistrationForm() {
  return (
    <section id="inscricao" className="py-24 border-b border-editorial-dark/15 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-editorial-dark w-12 md:w-16"></div>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-editorial-dark/60 font-sans">
              GARANTE O SEU LUGAR
            </span>
            <div className="h-px bg-editorial-dark w-12 md:w-16"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-editorial-dark tracking-tight">
            Inscrição no Evento
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-editorial-dark p-8 md:p-12 relative max-w-2xl mx-auto text-center shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]"
        >
          {/* Decorative pins */}
          <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-editorial-dark/20"></div>
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-editorial-dark/20"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-editorial-dark/20"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-editorial-dark/20"></div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-sm font-mono text-editorial-dark/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-editorial-accent" />
              <span>20 de Outubro</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-editorial-dark/30 rounded-full"></div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-editorial-accent" />
              <a href="https://www.google.com/maps/search/?api=1&query=Ci%C3%AAncias+ULisboa,+Lisboa" target="_blank" rel="noopener noreferrer" className="hover:text-editorial-accent hover:underline transition-colors">
                Ciências ULisboa, Lisboa
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch max-w-xl mx-auto">
            <div className="flex flex-col items-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfIRiEAjRmkgFEEQNcSK22mGVr0WOuDQlOLZNJ9MihHcb6LwQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border-2 border-editorial-dark font-black text-xs md:text-sm uppercase tracking-widest py-4 px-6 rounded-none transition-all w-full shadow-sm"
              >
                Inscrição: Manhã <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
              <span className="text-[11px] font-sans text-editorial-dark/65 mt-2 text-center">
                Sessão com Escolas e Jovens · Explorística
              </span>
            </div>
            
            <div className="flex flex-col items-center">
              <a
                href="http://docs.google.com/forms/d/e/1FAIpQLSes6Q2CHWHBoQDX4xUqa0nKvjwAs_0E7rJsHDmRbt7O6_vq_Q/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border-2 border-editorial-dark font-black text-xs md:text-sm uppercase tracking-widest py-4 px-6 rounded-none transition-all w-full shadow-sm"
              >
                Inscrição: Tarde <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
              <span className="text-[11px] font-sans text-editorial-dark/65 mt-2 text-center">
                Mesas Redondas · Academia, Empresas e Comunidade
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
