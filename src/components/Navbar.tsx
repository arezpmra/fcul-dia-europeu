import { useState, useEffect } from 'react';
import { Menu, X, BarChart3, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Programa', href: '/#programa' },
    { label: 'Organização', href: '/#organizacao' },
    { label: 'Financiamento', href: '/#apoios' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-editorial-cream/95 backdrop-blur-md shadow-sm py-3 border-b border-editorial-dark/15'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          {/* Espaço para o Logo do Dia Europeu da Estatística */}
          <div className="bg-transparent h-12 sm:h-14 flex items-center justify-center rounded-none overflow-hidden">
             <img 
               src="/logo-eurostat.png" 
               alt="Logo Dia Europeu da Estatística" 
               className="w-auto h-full object-contain"
               onError={(e) => {
                 // Fallback if image is not yet uploaded
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] text-editorial-dark font-mono font-bold leading-none text-center">LOGO<br/>AQUI</span>';
               }}
             />
          </div>
          <div>
            <span className="block text-sm font-black text-editorial-dark uppercase tracking-[0.15em] font-sans leading-tight">
              Dia Europeu da Estatística
            </span>
            <span className="block text-[10px] text-editorial-accent font-mono font-bold tracking-widest leading-none mt-0.5">
              20 OUTUBRO 2026 @ Ciências ULisboa
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-editorial-dark/70 hover:text-editorial-accent hover:underline decoration-1 underline-offset-4 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#inscricao"
            className="bg-editorial-dark text-editorial-cream hover:bg-editorial-cream hover:text-editorial-dark border border-editorial-dark text-xs uppercase font-bold tracking-widest px-5 py-2.5 rounded-none transition-all duration-300"
          >
            Inscrição
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-editorial-dark p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-editorial-cream border-b border-editorial-dark/15 px-6 py-4 space-y-3 absolute top-full left-0 w-full shadow-md">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-xs font-bold uppercase tracking-widest text-editorial-dark/80 hover:text-editorial-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="/#inscricao"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-editorial-dark text-editorial-cream font-bold text-xs uppercase tracking-widest py-3 border border-editorial-dark rounded-none"
            >
              Inscrição
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
