/** Normalise a Zambian number to wa.me format (digits only, country code, no leading 0). */
export function toWhatsAppNumber(raw: string, countryCode = '260'): string {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  else if (d.startsWith('0')) d = countryCode + d.slice(1);
  else if (d.length === 9) d = countryCode + d;
  return d;
}
