import { Search, Handshake, ShieldCheck, Sparkles, ArrowRight, Users, BookOpen, Wallet, CheckCircle2 } from 'lucide-react';
import { useRouter } from '@/router/router';

const HERO_IMG =
  'https://images.pexels.com/photos/10744384/pexels-photo-10744384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const STEPS = [
  {
    icon: Search,
    title: 'Search a tutor',
    body: 'Browse peer tutors by subject, year and rate. Read short bios and see who fits your schedule.',
  },
  {
    icon: Handshake,
    title: 'Reach out on WhatsApp',
    body: 'Tap Contact on any tutor profile to open WhatsApp with a pre-filled message. Agree on time and meeting point.',
  },
  {
    icon: CheckCircle2,
    title: 'Meet & learn',
    body: 'Hold your session — on campus, online or wherever suits you both. Pay your tutor directly in ZMW.',
  },
];

const STATS = [
  { icon: Users, label: 'Peer tutors', value: '8+' },
  { icon: BookOpen, label: 'Subjects', value: '12' },
  { icon: Wallet, label: 'From ZMW', value: '35/hr' },
];

export default function HomePage() {
  const { navigate } = useRouter();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        </div>
        <div className="container-page relative">
          <div className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
            <div className="animate-fade-up">
              <span className="chip bg-white/10 text-gold-300 ring-1 ring-white/15 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Starting at Copperbelt University
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Learn Together. <span className="text-gold-400">Grow Together.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
                Project 90 is a student tutoring marketplace where CBU students find academic help
                from peers — and where strong students earn by teaching what they know.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => navigate('find-tutor')} className="btn-gold">
                  <Search className="h-5 w-5" /> Find a Tutor
                </button>
                <button onClick={() => navigate('become-tutor')} className="btn bg-white/10 px-6 py-3 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20">
                  Become a Tutor <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-up">
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className={`rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur ${
                        i === 1 ? 'translate-y-6' : ''
                      }`}
                    >
                      <Icon className="h-7 w-7 text-gold-400" />
                      <p className="mt-3 font-display text-2xl font-extrabold text-white">{s.value}</p>
                      <p className="text-xs font-medium uppercase tracking-wide text-navy-200">{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">The problem</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Hard courses, tight budgets, scattered help.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              Across CBU, students bump into difficult modules with nowhere to turn — lecturers are
              stretched thin, private tutors are expensive, and good help is usually a friend-of-a-friend.
              Meanwhile, strong students who could earn from teaching never get a channel to reach those who need them.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">
              Project 90 brings them together on one campus-first platform — affordable, peer-powered,
              and paid in Zambian Kwacha.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: 'Trusted peers', body: 'Tutors are fellow CBU students who understand your courses.' },
              { icon: Wallet, title: 'Fair rates', body: 'Sessions priced in ZMW, set by tutors themselves.' },
              { icon: BookOpen, title: 'Real subjects', body: 'From Mathematics to Programming and Languages.' },
              { icon: Users, title: 'Two-way value', body: 'Get help today, teach and earn tomorrow.' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="card p-5 hover:-translate-y-1 hover:shadow-cardhover">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-navy-900">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-50/60 py-16 lg:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Three simple steps to get help
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="card relative p-6">
                  <span className="absolute -top-3 right-5 grid h-9 w-9 place-items-center rounded-full bg-gold-400 font-display text-sm font-extrabold text-navy-900 shadow-card">
                    {i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-800 text-gold-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => navigate('find-tutor')} className="btn-primary">
              <Search className="h-5 w-5" /> Browse tutors
            </button>
            <button onClick={() => navigate('become-tutor')} className="btn-outline">
              Start tutoring <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-14 text-center shadow-card sm:px-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-navy-500/30 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Got knowledge worth sharing?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-100">
              Join the first cohort of Project 90 tutors at CBU. Set your rate, pick your subjects,
              and start earning while you help your classmates pass.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={() => navigate('become-tutor')} className="btn-gold">
                Become a Tutor <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => navigate('find-tutor')} className="btn bg-white/10 px-6 py-3 text-white ring-1 ring-white/20 hover:bg-white/20">
                Find a Tutor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
