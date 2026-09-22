import { motion } from 'motion/react';
import { Users, Building2 } from 'lucide-react';

export default function Organization() {
  return (
    <section id="organizacao" className="py-24 border-b border-editorial-dark/15 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-editorial-dark w-12 md:w-16"></div>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-editorial-dark/60 font-sans">
              QUEM SOMOS
            </span>
            <div className="h-px bg-editorial-dark w-12 md:w-16"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-editorial-dark tracking-tight">
            Organização
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Comissão Organizadora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-editorial-cream/90 backdrop-blur-sm border-2 border-editorial-dark p-8 md:p-10 rounded-none shadow-none relative"
          >
            <div className="absolute -top-6 left-8 bg-editorial-dark text-editorial-cream p-3 rounded-none">
              <Users className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-serif text-editorial-dark mb-6 mt-2">
              Comissão Organizadora
            </h3>

            <div className="space-y-6">
              {/* Docentes */}
              <div>
                <span className="block text-xs font-mono font-bold uppercase tracking-widest text-editorial-accent mb-3">
                  Docentes
                </span>
                <ul className="space-y-2.5 text-sm font-sans text-editorial-dark/80">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none"></span>
                    <span>Eunice Carrasquinha</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none"></span>
                    <span>Fernanda Diamantinho</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none"></span>
                    <span>Helena Mouriño</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none"></span>
                    <span>Lígia Rodrigues</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none"></span>
                    <span>Lisete Sousa</span>
                  </li>
                </ul>
              </div>

              <div className="h-px bg-editorial-dark/10 w-full" />

              {/* Alunos */}
              <div>
                <span className="block text-xs font-mono font-bold uppercase tracking-widest text-editorial-accent mb-3">
                  Alunos
                </span>
                <ul className="space-y-2.5 text-sm font-sans text-editorial-dark/80">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none"></span>
                    <span>Pedro Arez</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none"></span>
                    <span>Alexandra Santos</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Instituições Organizadoras */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-editorial-cream/90 backdrop-blur-sm border-2 border-editorial-dark p-8 md:p-10 rounded-none shadow-none relative"
          >
            <div className="absolute -top-6 left-8 bg-editorial-dark text-editorial-cream p-3 rounded-none">
              <Building2 className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-serif text-editorial-dark mb-6 mt-2">
              Instituições Organizadoras
            </h3>
            
            <ul className="space-y-6 text-sm font-sans text-editorial-dark/80">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none mt-2 shrink-0"></span>
                <span>Departamento de Ciências Matemáticas (DCM)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none mt-2 shrink-0"></span>
                <span>Sociedade Portuguesa de Estatística (SPE)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-editorial-accent rounded-none mt-2 shrink-0"></span>
                <span>Centro de Estatística e Aplicações da Universidade de Lisboa (CEAUL)</span>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
