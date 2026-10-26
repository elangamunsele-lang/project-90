import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Info, X } from 'lucide-react';
import TutorCard from '@/components/TutorCard';
import { TUTORS, SUBJECTS } from '@/data/tutors';

export default function FindTutorPage() {
  const [query, setQuery] = useState('');
  const [activeSubjects, setActiveSubjects] = useState<string[]>([]);
  const [sort, setSort] = useState<'rating' | 'rate-low' | 'rate-high'>('rating');

  const toggleSubject = (s: string) =>
    setActiveSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = TUTORS.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.subjects.some((s) => s.toLowerCase().includes(q)) ||
        t.faculty.toLowerCase().includes(q);
      const matchesSubject =
        activeSubjects.length === 0 || activeSubjects.some((s) => t.subjects.includes(s));
      return matchesQuery && matchesSubject;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'rate-low') return a.rate - b.rate;
      return b.rate - a.rate;
    });
    return list;
  }, [query, activeSubjects, sort]);

  const clearAll = () => {
    setQuery('');
    setActiveSubjects([]);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="border-b border-navy-100 bg-navy-50/50">
        <div className="container-page py-10 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Find a Tutor</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Meet our peer tutors
          </h1>
          <p className="mt-3 max-w-2xl text-navy-600">
            Search by subject, name or faculty. All profiles below are sample data for this prototype —
            contact numbers are illustrative and not real.
          </p>

          {/* Search */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by subject, name or faculty…"
                className="input pl-12"
                aria-label="Search tutors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-navy-400 hover:bg-navy-100 hover:text-navy-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="input appearance-none pl-12 pr-10"
                aria-label="Sort tutors"
              >
                <option value="rating">Top rated</option>
                <option value="rate-low">Lowest rate</option>
                <option value="rate-high">Highest rate</option>
              </select>
            </div>
          </div>

          {/* Subject filters */}
          <div className="mt-5 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => {
              const Icon = s.icon;
              const active = activeSubjects.includes(s.label);
              return (
                <button
                  key={s.label}
                  onClick={() => toggleSubject(s.label)}
                  className={`chip transition ${
                    active
                      ? 'bg-navy-800 text-white ring-1 ring-navy-800'
                      : 'bg-white text-navy-700 ring-1 ring-navy-200 hover:border-navy-300 hover:bg-navy-50'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" /> {s.label}
                </button>
              );
            })}
            {(activeSubjects.length > 0 || query) && (
              <button onClick={clearAll} className="chip text-navy-500 hover:bg-navy-100">
                <X className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Notice */}
      <div className="container-page pt-6">
        <div className="flex items-start gap-3 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            <span className="font-semibold">Sample data:</span> All tutor names, rates and WhatsApp numbers
            on this page are illustrative placeholders created for this prototype demonstration.
          </p>
        </div>
      </div>

      {/* Results */}
      <section className="container-page py-8">
        <p className="mb-5 text-sm font-medium text-navy-500">
          {filtered.length} {filtered.length === 1 ? 'tutor' : 'tutors'} found
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 py-16 text-center">
            <p className="font-display text-lg font-bold text-navy-900">No tutors match your search</p>
            <p className="mt-2 text-sm text-navy-500">Try removing a filter or clearing your search.</p>
            <button onClick={clearAll} className="btn-outline mt-5">
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TutorCard key={t.id} tutor={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
