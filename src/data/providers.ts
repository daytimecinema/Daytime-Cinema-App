/**
 * Integration layer for showtimes & ticketing providers.
 *
 * Strategy: four data sources + affiliate revenue from day one, indie
 * partnerships as the long-term play.
 *   1. TMDB now-playing        — live today (shared club key)
 *   2. MovieGlu                — real showtimes near the member; free dev tier
 *   3. AMC official API        — AMC theaters + showtimes; vendor key by approval
 *   4. Gracenote (Nielsen)     — licensed full-market feed; enterprise, later
 *   + Fandango / Atom Tickets affiliate links (commission per ticket)
 *   + Veezi — direct ticket sales for independent partner theaters
 *
 * Each provider activates automatically once its credential is pasted in
 * Settings → Integrations (stored in this browser's localStorage). All
 * fetchers fail soft: not configured / network error → empty result and
 * the app falls back to the previous tier.
 */

export const CFG = {
  movieGluClient: 'mfc-mg-client',
  movieGluKey: 'mfc-mg-key',
  movieGluAuth: 'mfc-mg-auth',
  amcKey: 'mfc-amc-key',
  fandangoAff: 'mfc-aff-fandango',
  atomAff: 'mfc-aff-atom',
  veeziToken: 'mfc-veezi-token',
} as const;

export function getCfg(key: string): string {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

export function setCfg(key: string, value: string) {
  try {
    localStorage.setItem(key, value.trim());
  } catch { /* private mode */ }
}

export interface ProviderInfo {
  name: string;
  role: string;
  fields: { label: string; cfg: string; placeholder: string }[];
  setup: string;
  configured(): boolean;
}

export const PROVIDERS: ProviderInfo[] = [
  {
    name: 'MovieGlu',
    role: 'Real showtimes & theaters near members',
    fields: [
      { label: 'Client name', cfg: CFG.movieGluClient, placeholder: 'e.g. MFC_0' },
      { label: 'x-api-key', cfg: CFG.movieGluKey, placeholder: 'from developer.movieglu.com' },
      { label: 'Authorization', cfg: CFG.movieGluAuth, placeholder: 'Basic …' },
    ],
    setup: 'Request a free evaluation key at api-registration.movieglu.com (the form is on the developer subdomain, not their main site). Credentials arrive by email; eval tier is limited to one country with a small request quota. Production is paid — custom pricing, startup rates on request.',
    configured: () => !!(getCfg(CFG.movieGluKey) && getCfg(CFG.movieGluClient)),
  },
  {
    name: 'AMC Theatres API',
    role: 'AMC showtimes + ticketing URLs',
    fields: [{ label: 'Vendor key', cfg: CFG.amcKey, placeholder: 'X-AMC-Vendor-Key' }],
    setup: 'Apply at developers.amctheatres.com (describe the app; approval is manual).',
    configured: () => !!getCfg(CFG.amcKey),
  },
  {
    name: 'Fandango affiliate',
    role: 'Commission on chain tickets',
    fields: [{ label: 'Affiliate / Impact ID', cfg: CFG.fandangoAff, placeholder: 'from impact.com dashboard' }],
    setup: 'Join the Fandango program on impact.com; tracking parameters come from your dashboard.',
    configured: () => !!getCfg(CFG.fandangoAff),
  },
  {
    name: 'Atom Tickets affiliate',
    role: 'Commission on chain tickets',
    fields: [{ label: 'Affiliate ID', cfg: CFG.atomAff, placeholder: 'from their affiliate network' }],
    setup: 'Apply to Atom Tickets’ affiliate program (Impact/CJ).',
    configured: () => !!getCfg(CFG.atomAff),
  },
  {
    name: 'Veezi (indie partners)',
    role: 'Direct ticket sales for independent theaters',
    fields: [{ label: 'Veezi API token', cfg: CFG.veeziToken, placeholder: 'one per partner theater' }],
    setup: 'Each partner theater generates a token in their Veezi back office (getveezi.com) and shares it with the club.',
    configured: () => !!getCfg(CFG.veeziToken),
  },
];

/** Gracenote has no self-serve signup — listed in Settings as a roadmap item. */
export const GRACENOTE_NOTE =
  'Gracenote On Entertainment (Nielsen) — the full licensed showtimes feed the majors use. Enterprise sales contact; revisit at scale.';

/** Outbound ticket links, decorated with affiliate IDs once configured. */
export function ticketLinks(title: string): { name: string; url: string; affiliate: boolean }[] {
  const q = encodeURIComponent(title);
  const fan = getCfg(CFG.fandangoAff);
  const atom = getCfg(CFG.atomAff);
  return [
    { name: 'Fandango', url: `https://www.fandango.com/search?q=${q}${fan ? `&a=${encodeURIComponent(fan)}` : ''}`, affiliate: !!fan },
    { name: 'Atom', url: `https://www.atomtickets.com/search?searchTerm=${q}${atom ? `&aff=${encodeURIComponent(atom)}` : ''}`, affiliate: !!atom },
    { name: 'AMC', url: `https://www.amctheatres.com/search?q=${q}`, affiliate: false },
    { name: 'Regal', url: `https://www.regmovies.com/search?query=${q}`, affiliate: false },
  ];
}

/**
 * MovieGlu films-now-showing. Activates when credentials are pasted in
 * Settings; the header set follows their public API docs. Untested until
 * real sandbox credentials exist — falls back soft on any error.
 */
export async function movieGluNowShowing(): Promise<{ title: string; filmId: number }[]> {
  if (!PROVIDERS[0].configured()) return [];
  try {
    const res = await fetch('https://api-gate2.movieglu.com/filmsNowShowing/?n=12', {
      headers: {
        client: getCfg(CFG.movieGluClient),
        'x-api-key': getCfg(CFG.movieGluKey),
        authorization: getCfg(CFG.movieGluAuth),
        territory: 'US',
        'api-version': 'v200',
        geolocation: '40.7440;-73.9903', // TODO: member geolocation prompt
        'device-datetime': new Date().toISOString(),
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.films ?? []).map((f: any) => ({ title: f.film_name, filmId: f.film_id }));
  } catch {
    return [];
  }
}

/** AMC now-playing — wired up when a vendor key is granted. */
export async function amcNowPlaying(): Promise<{ title: string }[]> {
  if (!getCfg(CFG.amcKey)) return [];
  try {
    const res = await fetch('https://api.amctheatres.com/v2/movies/views/now-playing?page-size=20', {
      headers: { 'X-AMC-Vendor-Key': getCfg(CFG.amcKey) },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?._embedded?.movies ?? []).map((m: any) => ({ title: m.name }));
  } catch {
    return [];
  }
}

/** Indie partner program — the relationship play. Statuses are placeholders until real theaters sign on. */
export const INDIE_PROGRAM = {
  pitch:
    'The club sells direct for independent matinee houses — no middleman, members earn double points, and partners keep the margin chains give away to Fandango.',
  contact: 'partners@matineefilm.club', // TODO: swap for the real partnerships inbox
  statuses: {
    'paradiso-palace': 'Founding partner · demo box office live',
    'sunbeam': 'Founding partner · demo box office live',
    'gilded-curtain': 'Stage partner · demo box office live',
    'civic-daylight': 'In talks · Veezi link pending',
  } as Record<string, string>,
};
