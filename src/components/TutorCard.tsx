import { Star } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import type { Tutor } from '@/data/tutors';
import { toWhatsAppNumber } from '@/lib/whatsapp';
import { subjectIcon } from '@/data/tutors';

function Avatar({ tutor, size = 'md' }: { tutor: Tutor; size?: 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'h-16 w-16 text-xl' : 'h-12 w-12 text-base';
  return (
    <span
      className={`grid ${dims} place-items-center rounded-2xl font-display font-bold text-white shadow-card ${tutor.avatarColor}`}
    >
      {tutor.avatarInitials}
    </span>
  );
}

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  const wa = `https://wa.me/${toWhatsAppNumber(tutor.whatsapp)}?text=${encodeURIComponent(
    `Hello ${tutor.name}, I found your profile on Project 90 and would like to book a tutoring session in ${tutor.subjects[0]}.`
  )}`;

  return (
    <article className="card group flex h-full flex-col p-5 hover:-translate-y-1 hover:shadow-cardhover">
      <div className="flex items-start gap-4">
        <Avatar tutor={tutor} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-bold text-navy-900">{tutor.name}</h3>
          <p className="truncate text-sm text-navy-500">{tutor.faculty}</p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-gold-600">{tutor.year}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-sm text-navy-600">
        <span className="flex items-center gap-1 font-semibold text-navy-800">
          <Star className="h-4 w-4 fill-gold-400 text-gold-400" /> {tutor.rating.toFixed(1)}
        </span>
        <span className="text-navy-300">•</span>
        <span>{tutor.sessions} sessions</span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600 line-clamp-4">{tutor.bio}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tutor.subjects.map((s) => {
          const Icon = subjectIcon[s] ?? Star;
          return (
            <span key={s} className="chip bg-navy-50 text-navy-700 ring-1 ring-navy-100">
              <Icon className="h-3.5 w-3.5" /> {s}
            </span>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
        <div>
          <span className="font-display text-xl font-extrabold text-navy-900">ZMW {tutor.rate}</span>
          <span className="text-xs font-medium text-navy-400">/ hour</span>
        </div>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-[#25D366] px-4 py-2.5 text-sm text-white hover:bg-[#1ebe5b] focus-visible:ring-[#25D366]"
        >
          <MessageCircle className="h-4 w-4" /> Contact
        </a>
      </div>
    </article>
  );
}
