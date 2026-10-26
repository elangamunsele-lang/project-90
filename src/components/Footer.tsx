import { GraduationCap, Mail, MapPin } from 'lucide-react';
import { useRouter } from '@/router/router';
import type { Route } from '@/router/router';

export default function Footer() {
  const { navigate } = useRouter();
  const year = new Date().getFullYear();
  const go = (to: Route) => navigate(to);
  return (
    <footer className="mt-20 bg-navy-950 text-navy-100">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-gold-400 ring-1 ring-white/10">
                <GraduationCap className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <div className="leading-tight">
                <p className="font-display text-lg font-extrabold text-white">Project 90</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
                  Learn Together. Grow Together.
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-200">
              A peer-to-peer tutoring marketplace built for students at Copperbelt University.
              Find help when you need it, or earn by teaching what you know.
            </p>
            <div className="mt-5 flex flex-col gap-1.5 text-sm text-navy-200">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" /> Copperbelt University, Kitwe, Zambia
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-400" /> hello@project90.example
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><button onClick={() => go('home')} className="hover:text-white transition">Home</button></li>
              <li><button onClick={() => go('find-tutor')} className="hover:text-white transition">Find a Tutor</button></li>
              <li><button onClick={() => go('become-tutor')} className="hover:text-white transition">Become a Tutor</button></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">About</p>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
              <li>Student-run marketplace</li>
              <li>Peer tutoring for CBU</li>
              <li>Pay in ZMW, per session</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-navy-300">
            © {year} Project 90 — Prototype. All tutor profiles and contact details shown are sample data for demonstration only.
          </p>
        </div>
      </div>
    </footer>
  );
}
