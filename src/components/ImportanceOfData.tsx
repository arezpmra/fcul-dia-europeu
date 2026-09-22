import { useState } from 'react';
import { motion } from 'motion/react';
import { dataImportancePoints } from '../data';
import { BrainCircuit, ShieldCheck, Stethoscope, Cpu, Percent, BarChart, GraduationCap } from 'lucide-react';

const iconsMap: { [key: string]: any } = {
  BrainCircuit: BrainCircuit,
  ShieldCheck: ShieldCheck,
  Stethoscope: Stethoscope,
  Cpu: Cpu,
  GraduationCap: GraduationCap
};

// Values for confidence levels
const confidencePresets = [
  { level: 90, zScore: 1.645, alpha: 10, color: '#f59e0b', desc: 'Comum em sondagens e pesquisas preliminares de mercado.' },
  { level: 95, zScore: 1.960, alpha: 5, color: '#3b82f6', desc: 'O padrão dourado na maioria das publicações científicas e sociais.' },
  { level: 99, zScore: 2.576, alpha: 1, color: '#10b981', desc: 'Utilizado em cenários críticos como testes clínicos farmacêuticos ou aeroespacial.' }
];

export default function ImportanceOfData() {
  const [selectedConfidence, setSelectedConfidence] = useState(presetByIndex(1)); // default 95%
  
  function presetByIndex(index: number) {
    return confidencePresets[index];
  }

  // Draw Gaussian Curve Path
  // Mean = 100, StdDev = 20, Range: x from 20 to 180 (SVG coordinates)
  // y = Amplitude * e^(-(x-Mean)^2 / (2 * StdDev^2))
  const amplitude = 90;
  const mean = 100;
  const stdDev = 22;
  const svgWidth = 200;
  const svgHeight = 120;

  // Generate points for the path
  const points: [number, number][] = [];
  for (let x = 0; x <= svgWidth; x++) {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    const y = svgHeight - 10 - amplitude * Math.exp(exponent);
    points.push([x, y]);
  }

  const dPath = `M ${points[0][0]} ${svgHeight - 10} ` + 
                points.map(p => `L ${p[0]} ${p[1]}`).join(' ') + 
                ` L ${svgWidth} ${svgHeight - 10} Z`;

  // Shaded tail thresholds based on z-score
  // x = Mean +/- z * StdDev
  // Scale z to standard deviation coordinates. For standard normal z-score, x = mean + z * scale
  // Scale factor: stdDev is equivalent to z = 1. Let's make it look proportional
  const leftZCoord = mean - (selectedConfidence.zScore / 3) * 3 * stdDev;
  const rightZCoord = mean + (selectedConfidence.zScore / 3) * 3 * stdDev;

  const shadedPoints: [number, number][] = [];
  for (let x = 0; x <= svgWidth; x++) {
    if (x >= leftZCoord && x <= rightZCoord) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
      const y = svgHeight - 10 - amplitude * Math.exp(exponent);
      shadedPoints.push([x, y]);
    }
  }

  const shadedPath = shadedPoints.length > 0 
    ? `M ${shadedPoints[0][0]} ${svgHeight - 10} ` + 
      shadedPoints.map(p => `L ${p[0]} ${p[1]}`).join(' ') + 
      ` L ${shadedPoints[shadedPoints.length - 1][0]} ${svgHeight - 10} Z`
    : '';

  return (
    <section id="importancia" className="py-24 bg-editorial-cream border-b border-editorial-dark/15 scroll-mt-16 relative">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#12121204_1px,transparent_1px),linear-gradient(to_bottom,#12121204_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-2">
            <span className="h-[1px] w-8 bg-editorial-dark"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-editorial-dark/60">Ciência e Sociedade</span>
            <span className="h-[1px] w-8 bg-editorial-dark"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-editorial-dark tracking-tight">
            A Importância dos Dados
          </h2>
          <p className="text-editorial-dark/70 text-sm md:text-base leading-relaxed font-sans">
            Sem estatística e análise estruturada, os supercomputadores e a inteligência artificial limitam-se a criar conjeturas. São os dados que fundamentam as decisões mais críticas do nosso mundo
          </p>
        </div>

        {/* Dynamic Interactive Panel: Statistics in Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-editorial-cream border-2 border-editorial-dark p-8 md:p-12 rounded-none shadow-none">
          
          {/* Explanation text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-editorial-accent font-mono tracking-widest uppercase block">
                Laboratório Interativo de Estatística
              </span>
              <h3 className="text-2xl md:text-4xl font-serif text-editorial-dark leading-tight">
                Simulação de Intervalo de Confiança
              </h3>
            </div>
            <p className="text-sm text-editorial-dark/75 leading-relaxed font-sans">
              Na investigação e ciência de dados, nunca temos 100% de certeza sobre uma população total. Usamos amostras e estimamos <strong>Intervalos de Confiança</strong>. 
            </p>

            <div className="bg-[#FDFCFB] p-4 border border-editorial-dark/15 my-4 shadow-[4px_4px_0px_0px_rgba(20,20,20,0.05)]">
              <h4 className="text-[10px] uppercase font-mono font-bold tracking-widest text-editorial-accent mb-2">Interpretação Frequencista</h4>
              <p className="text-sm text-editorial-dark/80 leading-relaxed font-sans">
                <strong>Em termos práticos:</strong> Se retirarmos 100 amostras diferentes com a mesma dimensão e calcularmos um Intervalo de Confiança a 95% para cada uma, esperamos que 95 desses intervalos contenham o valor real que queremos estimar.
              </p>
            </div>

            <p className="text-xs text-editorial-dark/60 font-sans">
              Escolha um nível de confiança abaixo para ver como a área crítica se expande, alterando o nível de significância (<span className="font-semibold font-mono">α</span>) e o valor crítico (<span className="font-semibold font-mono">z*</span>).
            </p>

            {/* Selector buttons */}
            <div className="flex flex-wrap gap-3">
              {confidencePresets.map((preset) => (
                <button
                  key={preset.level}
                  onClick={() => setSelectedConfidence(preset)}
                  className={`px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-300 border ${
                    selectedConfidence.level === preset.level
                      ? 'bg-editorial-dark text-editorial-cream border-editorial-dark'
                      : 'bg-[#F4F1EA] text-editorial-dark border-editorial-dark/20 hover:bg-editorial-dark hover:text-editorial-cream'
                  }`}
                >
                  {preset.level}% Confiança
                </button>
              ))}
            </div>

            {/* Presets descriptive text */}
            <motion.p
              key={selectedConfidence.level}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs italic text-editorial-dark/85 bg-[#F4F1EA] p-4 rounded-none border border-editorial-dark/15 font-serif"
            >
              💡 <strong>Aplicação:</strong> {selectedConfidence.desc}
            </motion.p>
          </div>

          {/* Interactive Chart Visualizer */}
          <div className="lg:col-span-7 flex flex-col md:flex-row items-center md:items-stretch gap-8 bg-[#F4F1EA] p-6 md:p-8 rounded-none border border-editorial-dark/25">
            
            {/* SVG Graph */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] uppercase tracking-wider font-mono font-black text-editorial-dark/65">
                Curva de Distribuição Normal (Gauss)
              </span>
              
              <div className="relative w-full max-w-[280px]">
                <svg viewBox="0 0 200 120" className="w-full h-auto overflow-visible">
                  {/* Grid Lines */}
                  <line x1="20" y1="110" x2="180" y2="110" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="100" y1="10" x2="100" y2="110" stroke="#121212" strokeOpacity="0.25" strokeDasharray="2 2" />
                  <text x="100" y="118" fill="#121212" fillOpacity="0.6" fontSize="6" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Média (μ)</text>

                  {/* Main distribution path */}
                  <path d={dPath} fill="none" stroke="#121212" strokeWidth="2" />
                  
                  {/* Shaded Confidence Area */}
                  {shadedPath && (
                    <motion.path 
                      key={selectedConfidence.level}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 0.4 }}
                      d={shadedPath} 
                      fill={selectedConfidence.color} 
                    />
                  )}

                  {/* Marginal error boundary markers */}
                  <line x1={leftZCoord} y1="106" x2={leftZCoord} y2="114" stroke={selectedConfidence.color} strokeWidth="1.5" />
                  <line x1={rightZCoord} y1="106" x2={rightZCoord} y2="114" stroke={selectedConfidence.color} strokeWidth="1.5" />
                  <text x={leftZCoord} y="101" fill={selectedConfidence.color} fontSize="5" textAnchor="middle" fontWeight="bold">-{selectedConfidence.zScore}</text>
                  <text x={rightZCoord} y="101" fill={selectedConfidence.color} fontSize="5" textAnchor="middle" fontWeight="bold">+{selectedConfidence.zScore}</text>

                  {/* Confidence text floating on top */}
                  <rect x="75" y="45" width="50" height="15" rx="0" fill="#121212" fillOpacity="0.9" />
                  <text x="100" y="54" fill="#FDFCFB" fontSize="6" fontWeight="bold" letterSpacing="0.1em" textAnchor="middle" fontFamily="monospace">
                    {selectedConfidence.level}% CENTRAL
                  </text>
                </svg>
              </div>

              <div className="flex justify-between w-full text-[9px] text-editorial-dark/60 font-mono border-t border-editorial-dark/15 pt-3">
                <span>← Cauda Inferior ({selectedConfidence.alpha / 2}%)</span>
                <span>Cauda Superior ({selectedConfidence.alpha / 2}%) →</span>
              </div>
            </div>

            {/* Calculated Values Dashboard */}
            <div className="w-full md:w-56 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="bg-[#FDFCFB] p-3.5 rounded-none border border-editorial-dark/20 shadow-none">
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-editorial-dark/50">Nível de Confiança</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-2xl font-serif italic text-editorial-dark">{selectedConfidence.level}%</span>
                    <span className="text-[10px] text-editorial-dark/45 font-mono font-bold">(1 - α)</span>
                  </div>
                </div>

                <div className="bg-[#FDFCFB] p-3.5 rounded-none border border-editorial-dark/20 shadow-none">
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-editorial-dark/50">Nível de Significância (Alpha)</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-xl font-mono font-bold text-editorial-dark">{selectedConfidence.alpha}%</span>
                    <span className="text-[10px] text-editorial-dark/45 font-mono">(α = {selectedConfidence.alpha / 100})</span>
                  </div>
                </div>

                <div className="bg-[#FDFCFB] p-3.5 rounded-none border border-editorial-dark/20 shadow-none">
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-editorial-dark/50">Valor Crítico (z-score)</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-xl font-mono font-bold text-editorial-accent">±{selectedConfidence.zScore.toFixed(3)}</span>
                    <span className="text-[10px] text-editorial-dark/45 font-mono">(z*)</span>
                  </div>
                </div>
              </div>

              <div className="text-[9px] leading-tight text-editorial-dark/45 italic">
                *Cálculo efetuado com base na distribuição normal padrão bicaudal.
              </div>
            </div>

          </div>
        </div>

        {/* Benefits Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataImportancePoints.map((point, index) => {
            const IconComponent = iconsMap[point.icon];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-editorial-cream border border-editorial-dark/30 p-6 rounded-none shadow-none hover:bg-[#F4F1EA] transition-all duration-300 space-y-4"
              >
                <div className="bg-editorial-dark p-3 rounded-none text-editorial-cream w-fit">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-editorial-dark">
                  {point.title}
                </h4>
                <p className="text-xs md:text-sm text-editorial-dark/70 font-sans leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
