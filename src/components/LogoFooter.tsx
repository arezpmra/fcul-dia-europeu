export default function LogoFooter() {
  return (
    <footer id="apoios" className="bg-editorial-dark text-editorial-cream py-16 px-6 border-t-2 border-editorial-dark">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Apoio Institucional e Financiamento */}
        <div className="space-y-6">
          <h3 className="text-center text-xs font-bold tracking-widest text-editorial-cream/60 uppercase font-mono">
            Apoio Institucional e Financiamento
          </h3>
          
          {/* Banner com logos FCUL, SPE, CEAUL e DCM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center bg-[#FDFCFB] p-8 md:p-10 rounded-none border border-editorial-dark/20 shadow-none">
            
            {/* Ciências ULisboa Logo */}
            <a href="https://ciencias.ulisboa.pt/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <img 
                src="/logo-fcul.png" 
                alt="Ciências ULisboa" 
                className="max-h-20 max-w-full object-contain"
                title="Para o logótipo aparecer, faça upload do ficheiro como 'logo-fcul.png' na pasta 'public'"
              />
            </a>

            {/* SPE LOGO */}
            <a href="https://www.spestatistica.pt/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <img 
                src="/logo-spe.png" 
                alt="Sociedade Portuguesa de Estatística" 
                className="max-h-20 max-w-full object-contain"
                title="Para o logótipo aparecer, faça upload do ficheiro como 'logo-spe.png' na pasta 'public'"
              />
            </a>

            {/* CEAUL LOGO */}
            <a href="http://ceaul.org" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <img 
                src="/logo-ceaul.png" 
                alt="CEAUL - Centro de Estatística e Aplicações" 
                className="max-h-20 max-w-full object-contain"
                title="Para o logótipo aparecer, faça upload do ficheiro como 'logo-ceaul.png' na pasta 'public'"
              />
            </a>

            {/* DCM LOGO */}
            <a href="https://ciencias.ulisboa.pt/sobre-nos/a-faculdade/departamentos/ciencias-matematicas" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <img 
                src="/logo-dcm.png" 
                alt="DCM - Departamento de Ciências Matemáticas" 
                className="max-h-20 max-w-full object-contain"
                title="Para o logótipo aparecer, faça upload do ficheiro como 'logo-dcm.png' na pasta 'public'"
              />
            </a>

          </div>
        </div>

        {/* Texto oficial de Financiamento FCT e NextGenerationEU */}
        <div className="bg-[#121212] p-6 md:p-8 rounded-none border border-editorial-cream/10 max-w-4xl mx-auto text-center space-y-4">
          <p className="text-xs md:text-sm text-editorial-cream/80 leading-relaxed font-sans">
            Financiado por fundos nacionais através da FCT – Fundação para a Ciência e a Tecnologia, I.P., no âmbito da Unidade de Investigação CEAUL, UID/00006/2025, DOI:{' '}
            <a 
              href="https://doi.org/10.54499/UID/00006/2025" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-editorial-accent hover:underline break-all"
            >
              https://doi.org/10.54499/UID/00006/2025
            </a>{' '}
            e pela União Europeia – NextGenerationEU, UID/PRR/00006/2025, DOI:{' '}
            <a 
              href="https://doi.org/10.54499/UID/PRR/00006/2025" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-editorial-accent hover:underline break-all"
            >
              https://doi.org/10.54499/UID/PRR/00006/2025
            </a>.
          </p>
        </div>

        {/* Banner com logos FCT, PRR, República Portuguesa, União Europeia */}
        <div className="bg-[#FDFCFB] p-6 md:p-8 rounded-none border border-editorial-dark/10 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center md:justify-around max-w-4xl mx-auto shadow-none">
          
          {/* FCT Logo */}
          <a href="https://www.fct.pt/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <img 
              src="/logo-fct.png" 
              alt="FCT – Fundação para a Ciência e a Tecnologia, I.P." 
              className="max-h-16 max-w-full object-contain"
              title="Faça upload do ficheiro como 'logo-fct.png' na pasta 'public'"
            />
          </a>

          {/* Combined PRR, República Portuguesa, União Europeia Banner */}
          <a href="https://recuperarportugal.gov.pt/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <img 
              src="/logo-financiamento.png" 
              alt="Financiamento PRR - República Portuguesa - União Europeia" 
              className="max-h-16 max-w-full object-contain"
              title="Faça upload do ficheiro como 'logo-financiamento.png' na pasta 'public'"
            />
          </a>

        </div>

        {/* Bottom copyright */}
        <div className="text-center pt-8 border-t border-editorial-cream/10 text-editorial-cream/40 text-xs font-sans space-y-2">
          <p>© 2026 Faculdade de Ciências da Universidade de Lisboa. Todos os direitos reservados.</p>
          <p className="text-editorial-cream/60">
            Desenvolvido por <strong className="text-editorial-cream font-medium">Pedro Arez</strong> e <strong className="text-editorial-cream font-medium">Alexandra Santos</strong>
          </p>
          <p className="text-[10px] text-editorial-cream/30 mt-1">Comissão Organizadora: SPE / CEAUL / DCM</p>
        </div>

      </div>
    </footer>
  );
}
