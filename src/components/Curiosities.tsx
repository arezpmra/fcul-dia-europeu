import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { curiosities } from '../data';
import { HelpCircle, RefreshCw, Play, PlayCircle, Eye, EyeOff, Award, Sparkles } from 'lucide-react';

export default function Curiosities() {
  const [activeCuriosity, setActiveCuriosity] = useState<string | null>(null);
  
  // Simulation Tab selection: 'lgn' (Lei Grandes Números) or 'tlc' (Teorema Limite Central)
  const [activeSimTab, setActiveSimTab] = useState<'lgn' | 'tlc'>('lgn');

  // Coin toss simulation states (LGN)
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [totalFlips, setTotalFlips] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]); // cumulative heads ratio history
  const [flipSpeeds, setFlipSpeeds] = useState<number>(0);

  // Central Limit Theorem (TLC) states
  const [tlcSampleSize, setTlcSampleSize] = useState<number>(10);
  const [tlcNumSamples, setTlcNumSamples] = useState<number>(500);
  const [tlcDistribution, setTlcDistribution] = useState<string>('uniform');
  const [tlcMeans, setTlcMeans] = useState<number[]>([]);
  const [isTlcRunning, setIsTlcRunning] = useState<boolean>(false);

  const drawSingleSample = (distType: string): number => {
    if (distType === 'uniform') {
      return Math.random() * 10;
    } else if (distType === 'exponential') {
      // Skewed: high density near 0, drops off
      return 10 * Math.pow(Math.random(), 3.5);
    } else if (distType === 'normal') {
      // Box-Muller transform
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      return Math.min(10, Math.max(0, num * 1.5 + 5));
    } else if (distType === 'bernoulli') {
      return Math.random() < 0.5 ? 0 : 10;
    } else if (distType === 'poisson') {
      let L = Math.exp(-2);
      let p = 1.0;
      let k = 0;
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      return Math.min(10, (k - 1) * 2);
    }
    return Math.random() * 10; // Fallback to uniform
  };

  const runTlcSimulation = async () => {
    if (isTlcRunning) return;
    setIsTlcRunning(true);
    
    const means: number[] = [];
    
    for (let s = 0; s < tlcNumSamples; s++) {
      let sum = 0;
      for (let i = 0; i < tlcSampleSize; i++) {
        sum += drawSingleSample(tlcDistribution);
      }
      means.push(sum / tlcSampleSize);
    }
    
    await new Promise((resolve) => setTimeout(resolve, 250));
    setTlcMeans(means);
    setIsTlcRunning(false);
  };

  const resetTlcSimulation = () => {
    setTlcMeans([]);
    setIsTlcRunning(false);
  };

  const getTlcBins = () => {
    const bins = Array(15).fill(0);
    if (tlcMeans.length === 0) return bins;
    
    const binWidth = 10 / 15;
    tlcMeans.forEach((mean) => {
      const binIndex = Math.min(14, Math.floor(mean / binWidth));
      bins[binIndex]++;
    });
    return bins;
  };

  const tlcBins = getTlcBins();
  const maxTlcBinCount = Math.max(...tlcBins, 1);

  const getEmpiricalStats = () => {
    if (tlcMeans.length === 0) return { mean: 5.0, stdDev: 1.0 };
    const meanVal = tlcMeans.reduce((a, b) => a + b, 0) / tlcMeans.length;
    const varVal = tlcMeans.reduce((sum, val) => sum + Math.pow(val - meanVal, 2), 0) / tlcMeans.length;
    return { mean: meanVal, stdDev: Math.sqrt(varVal) };
  };

  const { mean: empiricalMean, stdDev: empiricalStdDev } = getEmpiricalStats();

  const getTlcNormalCurvePath = () => {
    if (tlcMeans.length === 0 || empiricalStdDev === 0) return '';
    const pointsList: string[] = [];
    const numPoints = 60;
    
    const binWidth = 10 / 15;

    for (let i = 0; i <= numPoints; i++) {
      const xVal = (i / numPoints) * 10;
      const xCoord = 10 + (i / numPoints) * 300; // maps [0, 10] to [10, 310] inside SVG (total width 320)
      
      const exponent = -Math.pow(xVal - empiricalMean, 2) / (2 * Math.pow(empiricalStdDev, 2));
      const pdfVal = Math.exp(exponent) / (empiricalStdDev * Math.sqrt(2 * Math.PI));
      
      const expectedCount = tlcNumSamples * pdfVal * binWidth;
      
      const barH = (expectedCount / maxTlcBinCount) * 95;
      const yCoord = 110 - Math.min(95, barH);
      
      pointsList.push(`${xCoord},${yCoord}`);
    }
    return `M ${pointsList.join(' L ')}`;
  };
  
  // Run simulation of coin flips
  const runSimulation = async (count: number) => {
    if (simulationRunning) return;
    setSimulationRunning(true);
    
    let localTotal = totalFlips;
    let localHeads = headsCount;
    let newHistory: number[] = [...history];
    
    // To make it look incredibly cool, we either do it in animation frames or fast chunks
    const batchSize = count <= 100 ? 1 : Math.ceil(count / 20);
    const totalIterations = Math.ceil(count / batchSize);
    
    for (let i = 0; i < totalIterations; i++) {
      for (let j = 0; j < batchSize; j++) {
        const isHead = Math.random() < 0.5;
        localTotal++;
        if (isHead) localHeads++;
      }
      
      const currentRatio = localHeads / localTotal;
      newHistory.push(currentRatio);
      
      // Keep history manageable but representative (max 250 points)
      if (newHistory.length > 250) {
        // Downsample slightly
        newHistory = newHistory.filter((_, idx) => idx % 2 === 0);
      }

      setTotalFlips(localTotal);
      setHeadsCount(localHeads);
      setHistory([...newHistory]);

      // Delay for visual pleasure (only for smaller sets, larger sets run instantly)
      if (count <= 100) {
        await new Promise((resolve) => setTimeout(resolve, 15));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5));
      }
    }
    
    setSimulationRunning(false);
  };

  const resetSimulation = () => {
    setTotalFlips(0);
    setHeadsCount(0);
    setHistory([]);
    setSimulationRunning(false);
  };

  // Convert history array to line chart SVG path coordinates
  // Width: 320, Height: 120. Middle vertical represents 0.5 (heads ratio 50%)
  const svgWidth = 320;
  const svgHeight = 120;
  const expectedY = svgHeight / 2; // 0.5 is at y = 60

  const getPointsPath = () => {
    if (history.length === 0) return '';
    
    const stepX = svgWidth / Math.max(history.length - 1, 1);
    
    return history.map((ratio, index) => {
      const x = index * stepX;
      // Map ratio (0 to 1) to height (110 to 10)
      // ratio = 1 -> y = 10 (top)
      // ratio = 0.5 -> y = 60 (middle)
      // ratio = 0 -> y = 110 (bottom)
      const y = svgHeight - 10 - ratio * (svgHeight - 20);
      return `${x},${y}`;
    }).join(' ');
  };

  const currentHeadsPercent = totalFlips > 0 ? (headsCount / totalFlips) * 100 : 50;

  return (
    <section id="curiosidades" className="py-24 bg-editorial-cream border-b border-editorial-dark/15 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-2">
            <span className="h-[1px] w-8 bg-editorial-dark"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-editorial-dark/60">Fascinante e Inesperado</span>
            <span className="h-[1px] w-8 bg-editorial-dark"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-editorial-dark tracking-tight">
            Curiosidades & Paradoxos Estatísticos
          </h2>
          <p className="text-editorial-dark/70 text-sm md:text-base leading-relaxed font-sans">
            A matemática do acaso prega-nos rasteiras surpreendentes. Explore paradoxos que desafiam o senso comum e experimente as nossas simulações interativas em tempo real.
          </p>
        </div>

        {/* Tab Switcher for Simulations */}
        <div className="flex bg-[#F4F1EA] border border-editorial-dark/30 max-w-lg mx-auto shadow-none">
          <button
            onClick={() => setActiveSimTab('lgn')}
            className={`flex-1 py-3.5 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              activeSimTab === 'lgn'
                ? 'bg-editorial-dark text-editorial-cream font-black'
                : 'text-editorial-dark/60 hover:text-editorial-dark'
            }`}
          >
            Lei dos Grandes Números (LGN)
          </button>
          <button
            onClick={() => setActiveSimTab('tlc')}
            className={`flex-1 py-3.5 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              activeSimTab === 'tlc'
                ? 'bg-editorial-dark text-editorial-cream font-black'
                : 'text-editorial-dark/60 hover:text-editorial-dark'
            }`}
          >
            Teorema do Limite Central (TLC)
          </button>
        </div>

        {/* Dynamic Interactive Panel Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-editorial-cream border-2 border-editorial-dark p-8 md:p-12 rounded-none shadow-none">
          
          {activeSimTab === 'lgn' ? (
            <>
              {/* Simulation Dashboard: LGN */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-editorial-accent font-mono tracking-widest uppercase block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Laboratório de Probabilidade Real
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-editorial-dark">
                    Simulador da Lei dos Grandes Números
                  </h3>
                  <p className="text-xs md:text-sm text-editorial-dark/70 font-sans leading-relaxed">
                    Lançamos moedas virtuais justas (50% probabilidade). Ao início, as flutuações podem ser acentuadas (por ex: 3 caras em 4 lançamentos = 75% caras). Mas à medida que lança mais moedas, veja a taxa convergir precisamente para a linha de <strong className="text-editorial-accent font-black">50.0%</strong>!
                  </p>
                </div>

                {/* Simulated Live Chart Canvas */}
                <div className="bg-[#F4F1EA] p-6 rounded-none border border-editorial-dark/20 relative shadow-none">
                  
                  {/* Chart Coordinates labels */}
                  <div className="absolute top-2 left-3 text-[8px] font-mono text-editorial-dark/60 uppercase font-black tracking-widest">Taxa de Caras</div>
                  
                  <div className="w-full h-32 flex items-center justify-center">
                    {history.length > 0 ? (
                      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                        {/* Y-Axis scale guidelines */}
                        <line x1="0" y1="10" x2={svgWidth} y2="10" stroke="#121212" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="5" y="18" fill="#121212" fillOpacity="0.5" fontSize="8" fontFamily="monospace">100%</text>

                        <line x1="0" y1="110" x2={svgWidth} y2="110" stroke="#121212" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="5" y="108" fill="#121212" fillOpacity="0.5" fontSize="8" fontFamily="monospace">0%</text>

                        {/* Red expected target guideline (50%) */}
                        <line x1="0" y1={expectedY} x2={svgWidth} y2={expectedY} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
                        <text x={svgWidth - 55} y={expectedY - 4} fill="#dc2626" fontSize="8" fontFamily="monospace" fontWeight="bold">Alvo 50.0%</text>

                        {/* Cumulative Ratio line */}
                        <polyline
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={getPointsPath()}
                        />
                        
                        {/* Live indicator dot on the end of the list */}
                        {history.length > 0 && (
                          <circle
                            cx={(history.length - 1) * (svgWidth / Math.max(history.length - 1, 1))}
                            cy={svgHeight - 10 - history[history.length - 1] * (svgHeight - 20)}
                            r="4"
                            fill="#2563eb"
                          />
                        )}
                      </svg>
                    ) : (
                      <div className="text-center text-xs text-editorial-dark/60 italic flex flex-col items-center space-y-2">
                        <span>Clique em lançar moedas para iniciar o gráfico de convergência</span>
                        <span className="text-[10px] text-editorial-dark/50 font-mono">Teorema de Bernoulli em tempo real</span>
                      </div>
                    )}
                  </div>

                  {/* Real-time stats */}
                  <div className="grid grid-cols-3 gap-4 border-t border-editorial-dark/15 pt-4 text-center">
                    <div>
                      <span className="block text-[9px] text-editorial-dark/50 uppercase font-mono tracking-wider">Lançamentos</span>
                      <span className="block text-lg font-bold text-editorial-dark font-mono">{totalFlips}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-editorial-dark/50 uppercase font-mono tracking-wider">Caras / Coroas</span>
                      <span className="block text-xs font-bold text-editorial-dark/80 font-mono mt-1">
                        🪙 {headsCount} / {totalFlips - headsCount}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-editorial-dark/50 uppercase font-mono tracking-wider">Percentagem Caras</span>
                      <span className={`block text-lg font-bold font-mono ${
                        Math.abs(currentHeadsPercent - 50) < 1 ? 'text-emerald-600' : 'text-editorial-accent'
                      }`}>
                        {currentHeadsPercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                </div>

                {/* Launchers triggers */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    disabled={simulationRunning}
                    onClick={() => runSimulation(1)}
                    className="flex-1 min-w-[100px] bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border border-editorial-dark disabled:opacity-50 py-2.5 px-4 rounded-none text-xs font-bold font-mono transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Play className="w-3 h-3" /> <span>+1 Flip</span>
                  </button>
                  <button
                    disabled={simulationRunning}
                    onClick={() => runSimulation(10)}
                    className="flex-1 min-w-[100px] bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border border-editorial-dark disabled:opacity-50 py-2.5 px-4 rounded-none text-xs font-bold font-mono transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Play className="w-3 h-3" /> <span>+10 Flips</span>
                  </button>
                  <button
                    disabled={simulationRunning}
                    onClick={() => runSimulation(100)}
                    className="flex-1 min-w-[100px] bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border border-editorial-dark disabled:opacity-50 py-2.5 px-4 rounded-none text-xs font-bold font-mono transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Play className="w-3 h-3" /> <span>+100 Flips</span>
                  </button>
                  <button
                    disabled={simulationRunning}
                    onClick={() => runSimulation(1000)}
                    className="flex-1 min-w-[100px] bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border border-editorial-dark disabled:opacity-50 py-2.5 px-4 rounded-none text-xs font-bold font-mono transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Play className="w-3 h-3" /> <span>+1000 Flips</span>
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="bg-[#F4F1EA] text-editorial-dark border border-editorial-dark/25 hover:bg-editorial-dark hover:text-editorial-cream p-2.5 rounded-none text-xs font-semibold transition-colors"
                    title="Anular"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Explanation on the side */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#F4F1EA] p-6 rounded-none border border-editorial-dark/20 space-y-4">
                  <div className="bg-editorial-dark p-2.5 rounded-none text-editorial-cream w-fit">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif text-editorial-dark">
                    O Teorema Empírico
                  </h4>
                  <p className="text-xs md:text-sm text-editorial-dark/70 leading-relaxed font-sans">
                    Formulada originalmente por Jacob Bernoulli, a <strong>Lei dos Grandes Números</strong> garante que a frequência relativa de um acontecimento se aproxima da sua probabilidade teórica após sucessivas repetições.
                  </p>
                  <p className="text-xs text-editorial-dark/50 leading-relaxed font-sans">
                    Isto explica porque os casinos lucram consistentemente a longo prazo ou porque as seguradoras conseguem calcular prémios de risco estáveis, mesmo lidando com o comportamento imprevisível de indivíduos singulares.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Simulation Dashboard: TLC (Teorema do Limite Central) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-editorial-accent font-mono tracking-widest uppercase block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Convergência Gaussiana
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-editorial-dark">
                    Simulador do Teorema do Limite Central
                  </h3>
                  <p className="text-xs md:text-sm text-editorial-dark/70 font-sans leading-relaxed">
                    Retiramos <strong className="text-editorial-accent">{tlcNumSamples} amostras independentes</strong> de tamanho <span className="font-mono font-semibold">n</span> de uma população não normal. Observe como a distribuição das médias das amostras converge magicamente para um sino perfeito (Distribuição Normal) à medida que <span className="font-mono font-semibold">n</span> aumenta!
                  </p>
                </div>

                {/* Setup Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F4F1EA] p-4 border border-editorial-dark/15">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase font-mono font-bold tracking-wider text-editorial-dark/55">1. Distribuição de Origem</label>
                    <select
                      value={tlcDistribution}
                      onChange={(e: any) => setTlcDistribution(e.target.value)}
                      className="w-full bg-[#FDFCFB] border border-editorial-dark/25 p-2 rounded-none text-xs focus:outline-none focus:ring-1 focus:ring-editorial-dark font-sans text-editorial-dark"
                    >
                      <option value="uniform">Uniforme (Plana / Sem Picos)</option>
                      <option value="normal">Normal (Sino de Gauss)</option>
                      <option value="exponential">Exponencial (Muito Enviesada)</option>
                      <option value="bernoulli">Bernoulli (Discreta de Dois Estados)</option>
                      <option value="poisson">Poisson (Discreta Assimétrica)</option>
                    </select>

                    {/* Cute Schema representation of Parent Distribution */}
                    <div className="flex items-center gap-2.5 mt-2 bg-[#FDFCFB] p-2 border border-editorial-dark/10">
                      <svg width="50" height="26" viewBox="0 0 80 40" className="overflow-visible bg-[#F4F1EA] border border-editorial-dark/10">
                        <path
                          d={
                            tlcDistribution === 'uniform'
                              ? "M 10,15 L 70,15 L 70,35 L 10,35 Z"
                              : tlcDistribution === 'normal'
                              ? "M 10,35 Q 40,5 70,35 Z"
                              : tlcDistribution === 'exponential'
                              ? "M 10,10 Q 20,32 70,35 L 70,35 L 10,35 Z"
                              : tlcDistribution === 'bernoulli'
                              ? "M 20,35 L 20,10 M 60,35 L 60,20"
                              : "M 10,35 Q 25,5 35,20 Q 55,35 70,35 Z"
                          }
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <div className="text-[8px] text-editorial-dark/60 leading-tight">
                        <span className="font-bold block text-editorial-dark uppercase tracking-wider">População</span>
                        {tlcDistribution === 'uniform' && 'Probabilidade uniforme em [0,10].'}
                        {tlcDistribution === 'normal' && 'Curva de Gauss (sino simétrico).'}
                        {tlcDistribution === 'exponential' && 'Cauda de distribuição assimétrica.'}
                        {tlcDistribution === 'bernoulli' && 'Dois estados possíveis (0 ou 10).'}
                        {tlcDistribution === 'poisson' && 'Eventos contados assimétricos.'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex flex-col justify-between">
                    <div>
                      <label className="block text-[9px] uppercase font-mono font-bold tracking-wider text-editorial-dark/55">2. Tamanho da Amostra (n)</label>
                      <div className="flex gap-2 mt-1">
                        {[1, 2, 5, 30].map((n) => (
                          <button
                            key={n}
                            onClick={() => {
                              setTlcSampleSize(n);
                              // Auto re-simulate when changing N for a delightful immediate responsive feeling
                              if (tlcMeans.length > 0) {
                                // Slightly defer to allow state update or run directly
                                setTimeout(() => {
                                  const means: number[] = [];
                                  for (let s = 0; s < tlcNumSamples; s++) {
                                    let sum = 0;
                                    for (let i = 0; i < n; i++) {
                                      sum += drawSingleSample(tlcDistribution);
                                    }
                                    means.push(sum / n);
                                  }
                                  setTlcMeans(means);
                                }, 20);
                              }
                            }}
                            className={`flex-1 py-1.5 text-xs font-mono font-bold border transition-colors ${
                              tlcSampleSize === n
                                ? 'bg-editorial-dark text-editorial-cream border-editorial-dark'
                                : 'bg-[#FDFCFB] text-editorial-dark border-editorial-dark/20 hover:bg-editorial-dark/5'
                            }`}
                          >
                            n = {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] text-editorial-dark/50 leading-relaxed font-sans block mt-1.5">
                      {tlcSampleSize === 1 && 'n = 1: O histograma replica fielmente a população de origem.'}
                      {tlcSampleSize === 2 && 'n = 2: Começa a agrupar-se no centro (perfil triangular).'}
                      {tlcSampleSize === 5 && 'n = 5: Forma curva de Gauss preliminar e simétrica.'}
                      {tlcSampleSize === 30 && 'n = 30: Curva normal perfeita e estreita de alta precisão.'}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex flex-col justify-between">
                    <div>
                      <label className="block text-[9px] uppercase font-mono font-bold tracking-wider text-editorial-dark/55">3. Número de Amostras (M)</label>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {[10, 100, 500, 5000].map((m) => (
                          <button
                            key={m}
                            onClick={() => {
                              setTlcNumSamples(m);
                              // Auto re-simulate
                              if (tlcMeans.length > 0) {
                                setTimeout(() => {
                                  const means: number[] = [];
                                  for (let s = 0; s < m; s++) {
                                    let sum = 0;
                                    for (let i = 0; i < tlcSampleSize; i++) {
                                      sum += drawSingleSample(tlcDistribution);
                                    }
                                    means.push(sum / tlcSampleSize);
                                  }
                                  setTlcMeans(means);
                                }, 20);
                              }
                            }}
                            className={`flex-1 py-1.5 text-xs font-mono font-bold border transition-colors ${
                              tlcNumSamples === m
                                ? 'bg-editorial-dark text-editorial-cream border-editorial-dark'
                                : 'bg-[#FDFCFB] text-editorial-dark border-editorial-dark/20 hover:bg-editorial-dark/5'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] text-editorial-dark/50 leading-relaxed font-sans block mt-1.5">
                      Quantas vezes retiramos a amostra e calculamos a média.
                    </span>
                  </div>
                </div>

                {/* Simulated Histogram Chart Canvas */}
                <div className="bg-[#F4F1EA] p-6 rounded-none border border-editorial-dark/20 relative shadow-none">
                  
                  {/* Chart Title labels */}
                  <div className="absolute top-2 left-3 text-[8px] font-mono text-editorial-dark/60 uppercase font-black tracking-widest">
                    Histograma das Médias Obtidas ({tlcMeans.length > 0 ? tlcMeans.length : tlcNumSamples} Amostras)
                  </div>

                  <div className="w-full h-32 flex items-center justify-center">
                    {tlcMeans.length > 0 ? (
                      <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
                        {/* Horizontal guidelines */}
                        <line x1="10" y1="10" x2="310" y2="10" stroke="#121212" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="10" y1="110" x2="310" y2="110" stroke="#121212" strokeOpacity="0.3" strokeWidth="1" />
                        
                        {/* Mean indicator line (red vertical) */}
                        <line
                          x1={10 + (empiricalMean / 10) * 300}
                          y1="10"
                          x2={10 + (empiricalMean / 10) * 300}
                          y2="110"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={10 + (empiricalMean / 10) * 300 + 4}
                          y="18"
                          fill="#dc2626"
                          fontSize="7"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          Média = {empiricalMean.toFixed(2)}
                        </text>

                        {/* Render 15 Histogram Bars */}
                        {tlcBins.map((count, index) => {
                          const barW = 18;
                          const xVal = 10 + index * 20 + 1;
                          const barH = (count / maxTlcBinCount) * 95;
                          const yVal = 110 - barH;
                          return (
                            <rect
                              key={index}
                              x={xVal}
                              y={yVal}
                              width={barW}
                              height={Math.max(1, barH)}
                              fill="#2563eb"
                              fillOpacity="0.8"
                              stroke="#121212"
                              strokeWidth="0.8"
                            />
                          );
                        })}

                        {/* Theoretical Normal Fit curve overlay */}
                        {tlcSampleSize > 1 && getTlcNormalCurvePath() && (
                          <path
                            d={getTlcNormalCurvePath()}
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                        )}

                        {/* X-axis ticks */}
                        <text x="10" y="118" fill="#121212" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">0</text>
                        <text x="160" y="118" fill="#121212" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">5</text>
                        <text x="310" y="118" fill="#121212" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">10</text>
                      </svg>
                    ) : (
                      <div className="text-center text-xs text-editorial-dark/60 italic flex flex-col items-center space-y-2">
                        <span>Selecione a distribuição e clique em simular</span>
                        <span className="text-[10px] text-editorial-dark/50 font-mono">Veja a matemática da convergência em tempo real</span>
                      </div>
                    )}
                  </div>

                  {/* Real-time stats */}
                  <div className="grid grid-cols-3 gap-4 border-t border-editorial-dark/15 pt-4 text-center">
                    <div>
                      <span className="block text-[9px] text-editorial-dark/50 uppercase font-mono tracking-wider">N.º de Amostras</span>
                      <span className="block text-base font-bold text-editorial-dark font-mono">{tlcMeans.length > 0 ? tlcMeans.length : 0}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-editorial-dark/50 uppercase font-mono tracking-wider">Média das Médias (μ)</span>
                      <span className="block text-base font-bold text-editorial-dark font-mono">
                        {tlcMeans.length > 0 ? empiricalMean.toFixed(3) : '---'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-editorial-dark/50 uppercase font-mono tracking-wider">Desvio Padrão (σ)</span>
                      <span className="block text-base font-bold text-editorial-accent font-mono">
                        {tlcMeans.length > 0 ? empiricalStdDev.toFixed(3) : '---'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Launchers triggers */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={isTlcRunning}
                    onClick={runTlcSimulation}
                    className="flex-1 bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border border-editorial-dark disabled:opacity-50 py-3 px-4 rounded-none text-xs font-bold font-mono transition-all flex items-center justify-center space-x-1.5"
                  >
                    {isTlcRunning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>A simular...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Simular {tlcNumSamples} Amostras</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetTlcSimulation}
                    className="bg-[#F4F1EA] text-editorial-dark border border-editorial-dark/25 hover:bg-editorial-dark hover:text-editorial-cream p-3 rounded-none text-xs font-semibold transition-colors"
                    title="Reiniciar"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Explanation on the side */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#F4F1EA] p-6 rounded-none border border-editorial-dark/20 space-y-4">
                  <div className="bg-editorial-dark p-2.5 rounded-none text-editorial-cream w-fit">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif text-editorial-dark">
                    A Joia da Coroa
                  </h4>
                  <p className="text-xs md:text-sm text-editorial-dark/70 leading-relaxed font-sans">
                    O <strong>Teorema do Limite Central (TLC)</strong> é um dos pilares de toda a ciência quantitativa moderna. Ele garante que a soma de múltiplas variáveis independentes e idênticas tende inevitavelmente para uma distribuição normal, independentemente da distribuição populacional original!
                  </p>
                  <p className="text-xs text-editorial-dark/50 leading-relaxed font-sans">
                    Isto significa que, mesmo medindo fenómenos caóticos e com picos bizarros, podemos calcular desvios padrão precisos e construir testes de hipóteses rigorosos usando a curva de Gauss.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Curiosities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curiosities.map((item) => {
            const isActive = activeCuriosity === item.id;
            
            return (
              <div
                key={item.id}
                className={`bg-[#FDFCFB] p-8 rounded-none border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'border-editorial-accent shadow-none ring-0'
                    : 'border-editorial-dark p-8 shadow-none hover:bg-[#F4F1EA]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest bg-editorial-dark text-editorial-cream px-2.5 py-1 rounded-none font-bold">
                      {item.category}
                    </span>
                    <HelpCircle className="w-5 h-5 text-editorial-dark/30" />
                  </div>
                  
                  <h4 className="text-xl font-serif text-editorial-dark">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm text-editorial-dark/75 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#F4F1EA] border border-editorial-dark/15 p-4 rounded-none mt-4"
                      >
                        <span className="block text-[9px] font-bold text-editorial-accent uppercase mb-1 font-mono tracking-wider">Como Funciona:</span>
                        <p className="text-xs text-editorial-dark/80 leading-relaxed font-sans">
                          {item.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setActiveCuriosity(isActive ? null : item.id)}
                    className={`text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-colors ${
                      isActive 
                        ? 'text-editorial-accent' 
                        : 'text-editorial-dark hover:text-editorial-accent'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-1.5" /> Ocultar Explicação
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-1.5" /> Revelar Explicação Científica
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
