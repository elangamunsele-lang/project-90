import { useEffect, useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useRouter } from '@/router/router';
import type { Route } from '@/router/router';

const LINKS: { label: string; to: Route }[] = [
  { label: 'Home', to: 'home' },
  { label: 'Find a Tutor', to: 'find-tutor' },
  { label: 'Become a Tutor', to: 'become-tutor' },
];

export default function Navbar() {
  const { route, navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (to: Route) => {
    navigate(to);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-card' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5 focus:outline-none"
          aria-label="Project 90 home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-800 text-gold-400 shadow-card">
            <GraduationCap className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-navy-900">
              Project 90
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600">
              CBU Tutoring
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.to}
              onClick={() => go(l.to)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                route === l.to
                  ? 'bg-navy-800 text-white'
                  : 'text-navy-700 hover:bg-navy-50'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => go('become-tutor')} className="btn-gold ml-2 px-5 py-2.5 text-sm">
            Get Started
          </button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl text-navy-800 hover:bg-navy-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden md:hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-page flex flex-col gap-1 pb-4 pt-1">
          {LINKS.map((l) => (
            <button
              key={l.to}
              onClick={() => go(l.to)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                route === l.to ? 'bg-navy-800 text-white' : 'text-navy-700 hover:bg-navy-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
