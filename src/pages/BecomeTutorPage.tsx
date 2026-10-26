import { useState } from 'react';
import { CheckCircle2, Phone, Info, Send, User, Mail, BookOpen, Wallet, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { SUBJECTS } from '@/data/tutors';
import { supabase } from '@/lib/supabase';

type Form = {
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  experience: string;
  rate: string;
  availability: string;
  company: string; // honeypot — must stay empty
};

const EMPTY: Form = {
  name: '',
  email: '',
  phone: '',
  subjects: [],
  experience: '',
  rate: '',
  availability: '',
  company: '',
};

export default function BecomeTutorPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleSubject = (s: string) =>
    setForm((f) => {
      const subjects = f.subjects.includes(s)
        ? f.subjects.filter((x) => x !== s)
        : [...f.subjects, s];
      setErrors((e) => ({ ...e, subjects: undefined }));
      return { ...f, subjects };
    });

  const validate = (): boolean => {
    const next: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) next.name = 'Please enter your full name.';
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (!email && !phone) {
      next.email = 'Add either a university email or a contact number.';
    } else {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        next.email = 'Enter a valid email address.';
      if (phone && !/^[0-9+\s()-]{6,}$/.test(phone))
        next.phone = 'Enter a valid contact number.';
    }
    if (form.subjects.length === 0) next.subjects = 'Pick at least one subject.';
    if (!form.experience.trim()) next.experience = 'Tell us briefly about your experience.';
    if (!form.rate) {
      next.rate = 'Enter an hourly rate.';
    } else if (Number(form.rate) <= 0 || Number(form.rate) > 1000) {
      next.rate = 'Enter a realistic rate in ZMW (1–1000).';
    }
    if (!form.availability.trim()) next.availability = 'Tell us when you are free.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    // Honeypot: if filled, silently show the confirmation without submitting.
    if (form.company.trim() !== '') {
      setSubmitted(true);
      return;
    }

    if (!supabase) {
      setServerError('Applications are temporarily unavailable. Please try again later.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.rpc('submit_tutor_application', {
        p_name: form.name.trim(),
        p_email: form.email.trim() || null,
        p_phone: form.phone.trim() || null,
        p_subjects: form.subjects,
        p_experience: form.experience.trim(),
        p_rate: Number(form.rate),
        p_availability: form.availability.trim(),
        p_honeypot: null,
      });
      if (error) {
        setServerError(error.message || 'We could not submit your application. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Network error — please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setServerError(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="animate-fade-in container-page py-16 lg:py-24">
        <div className="mx-auto max-w-xl">
          <div className="card overflow-hidden">
            <div className="bg-navy-900 px-8 py-10 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-400 text-navy-900">
                <CheckCircle2 className="h-9 w-9" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-extrabold text-white">
                Application received!
              </h2>
              <p className="mt-2 text-navy-100">
                Thanks, {form.name.split(' ')[0] || 'there'} — your tutor application has been securely
                saved. The Project 90 team will review it and reach out.
              </p>
            </div>
            <div className="px-8 py-8">
              <div className="rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-800">
                <p className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Stored securely.</strong> Your application was saved to the Project 90
                    database. Your details are private and are only visible to the Project 90 review
                    team — not to other website visitors.
                  </span>
                </p>
              </div>

              <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-navy-500">
                What you submitted
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4 border-b border-navy-100 pb-2">
                  <dt className="text-navy-500">Name</dt>
                  <dd className="font-semibold text-navy-900">{form.name}</dd>
                </div>
                {form.email && (
                  <div className="flex justify-between gap-4 border-b border-navy-100 pb-2">
                    <dt className="text-navy-500">Email</dt>
                    <dd className="font-semibold text-navy-900">{form.email}</dd>
                  </div>
                )}
                {form.phone && (
                  <div className="flex justify-between gap-4 border-b border-navy-100 pb-2">
                    <dt className="text-navy-500">Phone</dt>
                    <dd className="font-semibold text-navy-900">{form.phone}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 border-b border-navy-100 pb-2">
                  <dt className="text-navy-500">Subjects</dt>
                  <dd className="text-right font-semibold text-navy-900">{form.subjects.join(', ')}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-navy-100 pb-2">
                  <dt className="text-navy-500">Hourly rate</dt>
                  <dd className="font-semibold text-navy-900">ZMW {form.rate}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-navy-500">Availability</dt>
                  <dd className="text-right font-semibold text-navy-900">{form.availability}</dd>
                </div>
              </dl>

              <button onClick={reset} className="btn-primary mt-7 w-full">
                Submit another application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="border-b border-navy-100 bg-navy-50/50">
        <div className="container-page py-10 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Become a Tutor</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Share your knowledge, earn on campus
          </h1>
          <p className="mt-3 max-w-2xl text-navy-600">
            Fill in the details below to register as a Project 90 tutor. Your information helps students
            find and contact you for sessions.
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong>Privacy:</strong> Applications are saved securely to the Project 90 database and are
              only visible to the Project 90 review team. Other website visitors cannot read them.
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="card relative p-6 sm:p-8">
            {/* Name */}
            <Field label="Full name" icon={User} required error={errors.name}>
              <input
                className="input"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Chanda Bwalya"
                aria-invalid={!!errors.name}
              />
            </Field>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="University email" icon={Mail} error={errors.email} hint="Or use a contact number.">
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@cbu.ac.zm"
                  aria-invalid={!!errors.email}
                />
              </Field>
              <Field label="Contact number" icon={Phone} error={errors.phone} hint="WhatsApp preferred.">
                <input
                  className="input"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="26097 000 0000"
                  aria-invalid={!!errors.phone}
                />
              </Field>
            </div>
            <p className="-mt-2 text-xs text-navy-400">
              Provide at least one of email or phone so students can reach you.
            </p>

            {/* Subjects */}
            <Field label="Subjects you can teach" icon={BookOpen} required error={errors.subjects} className="mt-6">
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => {
                  const Icon = s.icon;
                  const active = form.subjects.includes(s.label);
                  return (
                    <button
                      type="button"
                      key={s.label}
                      onClick={() => toggleSubject(s.label)}
                      className={`chip transition ${
                        active
                          ? 'bg-navy-800 text-white ring-1 ring-navy-800'
                          : 'bg-white text-navy-700 ring-1 ring-navy-200 hover:bg-navy-50'
                      }`}
                      aria-pressed={active}
                    >
                      <Icon className="h-3.5 w-3.5" /> {s.label}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Experience */}
            <Field
              label="Your experience"
              icon={BookOpen}
              required
              error={errors.experience}
              className="mt-6"
              hint="A short bio students will read on your profile."
            >
              <textarea
                className="input min-h-[110px] resize-y"
                value={form.experience}
                onChange={(e) => update('experience', e.target.value)}
                placeholder="e.g. 3rd-year Engineering student. I've helped classmates pass MATH 201 and run weekend revision sessions…"
                aria-invalid={!!errors.experience}
              />
            </Field>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Expected hourly rate (ZMW)" icon={Wallet} required error={errors.rate}>
                <input
                  className="input"
                  inputMode="numeric"
                  value={form.rate}
                  onChange={(e) => update('rate', e.target.value.replace(/[^\d]/g, ''))}
                  placeholder="e.g. 45"
                  aria-invalid={!!errors.rate}
                />
              </Field>
              <Field label="Availability" icon={Clock} required error={errors.availability} hint="e.g. Weekday evenings, Sat mornings.">
                <input
                  className="input"
                  value={form.availability}
                  onChange={(e) => update('availability', e.target.value)}
                  placeholder="e.g. Weekday evenings, weekends"
                  aria-invalid={!!errors.availability}
                />
              </Field>
            </div>

            {serverError && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Honeypot: visually hidden, must stay empty. Real users never see it. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label>
                Company
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col-reverse items-center justify-between gap-3 border-t border-navy-100 pt-6 sm:flex-row">
              <p className="flex items-center gap-2 text-xs text-navy-400">
                <AlertCircle className="h-4 w-4" /> Fields marked * are required.
              </p>
              <button type="submit" disabled={submitting} className="btn-gold w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Submitting…</>
                ) : (
                  <><Send className="h-5 w-5" /> Submit application</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  required,
  error,
  hint,
  className = '',
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-navy-800">
        <Icon className="h-4 w-4 text-navy-400" />
        {label}
        {required && <span className="text-gold-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-navy-400">{hint}</p>}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
