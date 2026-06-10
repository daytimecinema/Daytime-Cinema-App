export type Rarity = 'matinee' | 'classic' | 'gold' | 'directors-cut';

export interface Film {
  id: string;
  title: string;
  year: number;
  kind: 'film' | 'stage';
  genres: string[];
  runtime: number;
  rated: string;
  director: string;
  cast: string[];
  synopsis: string;
  score: number;
  rarity: Rarity;
  streamingOn: string[];
  poster: { from: string; to: string; emoji: string };
  /** Override query when looking this title up on TMDB. */
  tmdb?: string;
  /** Real poster art URL (TMDB) when known. */
  posterUrl?: string;
}

export const FILMS: Film[] = [
  {
    id: 'singin-rain', title: "Singin' in the Rain", year: 1952, kind: 'film',
    genres: ['Musical', 'Comedy'], runtime: 103, rated: 'G',
    director: 'Gene Kelly & Stanley Donen',
    cast: ['Gene Kelly', 'Debbie Reynolds', "Donald O'Connor"],
    synopsis: 'A silent-film star stumbles through the talkie revolution with tap shoes, an umbrella, and the best mood in Hollywood.',
    score: 98, rarity: 'directors-cut', streamingOn: ['Max', 'Apple TV'],
    poster: { from: '#5ea9dd', to: '#f7e26b', emoji: '☔' },
  },
  {
    id: 'casablanca', title: 'Casablanca', year: 1942, kind: 'film',
    genres: ['Romance', 'Drama'], runtime: 102, rated: 'PG',
    director: 'Michael Curtiz', cast: ['Humphrey Bogart', 'Ingrid Bergman', 'Paul Henreid'],
    synopsis: 'A cynical café owner in wartime Morocco rediscovers the one cause he never stopped fighting for.',
    score: 99, rarity: 'directors-cut', streamingOn: ['Max'],
    poster: { from: '#3b3a52', to: '#c9a86a', emoji: '🛩️' },
  },
  {
    id: 'roman-holiday', title: 'Roman Holiday', year: 1953, kind: 'film',
    genres: ['Romance', 'Comedy'], runtime: 118, rated: 'G',
    director: 'William Wyler', cast: ['Audrey Hepburn', 'Gregory Peck'],
    synopsis: 'A runaway princess takes one perfect, sunlit day off in Rome with a reporter who should know better.',
    score: 95, rarity: 'gold', streamingOn: ['Paramount+'],
    poster: { from: '#f2b8a0', to: '#8fc1a9', emoji: '🛵' },
  },
  {
    id: 'some-like-it-hot', title: 'Some Like It Hot', year: 1959, kind: 'film',
    genres: ['Comedy'], runtime: 121, rated: 'PG',
    director: 'Billy Wilder', cast: ['Marilyn Monroe', 'Tony Curtis', 'Jack Lemmon'],
    synopsis: 'Two musicians witness a mob hit and flee to Florida in an all-girl band. Nobody is perfect.',
    score: 96, rarity: 'gold', streamingOn: ['Prime Video'],
    poster: { from: '#f4d35e', to: '#ee964b', emoji: '🎷' },
  },
  {
    id: 'wizard-oz', title: 'The Wizard of Oz', year: 1939, kind: 'film',
    genres: ['Fantasy', 'Musical'], runtime: 102, rated: 'G',
    director: 'Victor Fleming', cast: ['Judy Garland', 'Frank Morgan', 'Ray Bolger'],
    synopsis: 'A Kansas farm girl is blown over the rainbow and learns there is no place like home.',
    score: 97, rarity: 'directors-cut', streamingOn: ['Max'],
    poster: { from: '#7ec850', to: '#f7e26b', emoji: '🌪️' },
  },
  {
    id: 'rear-window', title: 'Rear Window', year: 1954, kind: 'film',
    genres: ['Thriller', 'Mystery'], runtime: 112, rated: 'PG',
    director: 'Alfred Hitchcock', cast: ['James Stewart', 'Grace Kelly', 'Thelma Ritter'],
    synopsis: 'A photographer with a broken leg and a long lens becomes convinced his neighbor committed murder.',
    score: 98, rarity: 'directors-cut', streamingOn: ['Peacock'],
    poster: { from: '#274060', to: '#e8702a', emoji: '🔭' },
  },
  {
    id: '12-angry-men', title: '12 Angry Men', year: 1957, kind: 'film',
    genres: ['Drama'], runtime: 96, rated: 'PG',
    director: 'Sidney Lumet', cast: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
    synopsis: 'One juror, one sweltering room, and eleven minds slowly changed by reasonable doubt.',
    score: 97, rarity: 'gold', streamingOn: ['Prime Video', 'Tubi'],
    poster: { from: '#9b9b93', to: '#4a4e69', emoji: '⚖️' },
  },
  {
    id: 'vertigo', title: 'Vertigo', year: 1958, kind: 'film',
    genres: ['Thriller', 'Romance'], runtime: 128, rated: 'PG',
    director: 'Alfred Hitchcock', cast: ['James Stewart', 'Kim Novak'],
    synopsis: 'A retired detective with a fear of heights spirals into obsession over a woman who may not exist.',
    score: 96, rarity: 'gold', streamingOn: ['Apple TV'],
    poster: { from: '#1d7a5f', to: '#e63946', emoji: '🌀' },
  },
  {
    id: 'the-apartment', title: 'The Apartment', year: 1960, kind: 'film',
    genres: ['Comedy', 'Drama', 'Romance'], runtime: 125, rated: 'PG',
    director: 'Billy Wilder', cast: ['Jack Lemmon', 'Shirley MacLaine', 'Fred MacMurray'],
    synopsis: 'An insurance clerk lends his apartment to executives and his heart to the elevator operator. Shut up and deal.',
    score: 95, rarity: 'gold', streamingOn: ['Prime Video'],
    poster: { from: '#5d5d81', to: '#bfcde0', emoji: '🗝️' },
  },
  {
    id: 'tiffanys', title: "Breakfast at Tiffany's", year: 1961, kind: 'film',
    genres: ['Romance', 'Comedy'], runtime: 115, rated: 'PG',
    director: 'Blake Edwards', cast: ['Audrey Hepburn', 'George Peppard'],
    synopsis: 'Holly Golightly window-shops for a life that fits, croissant in hand at dawn on Fifth Avenue.',
    score: 88, rarity: 'classic', streamingOn: ['Paramount+'],
    poster: { from: '#0abab5', to: '#1c1c1c', emoji: '💎' },
  },
  {
    id: 'west-side-story', title: 'West Side Story', year: 1961, kind: 'film',
    genres: ['Musical', 'Romance'], runtime: 153, rated: 'PG',
    director: 'Robert Wise & Jerome Robbins', cast: ['Natalie Wood', 'Richard Beymer', 'Rita Moreno'],
    synopsis: 'Romeo and Juliet snap their fingers through the turf wars of the Upper West Side.',
    score: 93, rarity: 'gold', streamingOn: ['Disney+'],
    poster: { from: '#c1121f', to: '#3a0ca3', emoji: '🌃' },
  },
  {
    id: 'lawrence-arabia', title: 'Lawrence of Arabia', year: 1962, kind: 'film',
    genres: ['Adventure', 'Drama'], runtime: 227, rated: 'PG',
    director: 'David Lean', cast: ["Peter O'Toole", 'Omar Sharif', 'Alec Guinness'],
    synopsis: 'A restless British officer crosses the uncrossable desert and loses himself in the legend he becomes.',
    score: 96, rarity: 'gold', streamingOn: ['Netflix'],
    poster: { from: '#f4a259', to: '#bc4b51', emoji: '🐪' },
  },
  {
    id: 'my-fair-lady', title: 'My Fair Lady', year: 1964, kind: 'film',
    genres: ['Musical', 'Romance'], runtime: 170, rated: 'G',
    director: 'George Cukor', cast: ['Audrey Hepburn', 'Rex Harrison'],
    synopsis: 'A phonetics professor bets he can pass a flower girl off as a duchess. The rain in Spain ensues.',
    score: 90, rarity: 'classic', streamingOn: ['Paramount+'],
    poster: { from: '#e0aaff', to: '#7b2cbf', emoji: '🌸' },
  },
  {
    id: 'sound-of-music', title: 'The Sound of Music', year: 1965, kind: 'film',
    genres: ['Musical', 'Family'], runtime: 174, rated: 'G',
    director: 'Robert Wise', cast: ['Julie Andrews', 'Christopher Plummer'],
    synopsis: 'A governess with a guitar turns seven whistled-at children into a choir as the hills come alive.',
    score: 92, rarity: 'classic', streamingOn: ['Disney+'],
    poster: { from: '#80b918', to: '#bfd200', emoji: '⛰️' },
  },
  {
    id: 'the-graduate', title: 'The Graduate', year: 1967, kind: 'film',
    genres: ['Comedy', 'Drama'], runtime: 106, rated: 'PG-13',
    director: 'Mike Nichols', cast: ['Dustin Hoffman', 'Anne Bancroft', 'Katharine Ross'],
    synopsis: 'Just one word: plastics. A drifting college grad is seduced by the future and Mrs. Robinson.',
    score: 89, rarity: 'classic', streamingOn: ['Max'],
    poster: { from: '#2b2d42', to: '#ef9b6d', emoji: '🩴' },
  },
  {
    id: '2001', title: '2001: A Space Odyssey', year: 1968, kind: 'film',
    genres: ['Sci-Fi'], runtime: 149, rated: 'G',
    director: 'Stanley Kubrick', cast: ['Keir Dullea', 'Gary Lockwood'],
    synopsis: 'From bone to satellite in one cut: a monolith, a mission, and a computer who is sorry, Dave.',
    score: 94, rarity: 'gold', streamingOn: ['Max'],
    poster: { from: '#000000', to: '#d00000', emoji: '🛰️' },
  },
  {
    id: 'godfather', title: 'The Godfather', year: 1972, kind: 'film',
    genres: ['Crime', 'Drama'], runtime: 175, rated: 'R',
    director: 'Francis Ford Coppola', cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    synopsis: 'The reluctant youngest son of a crime dynasty is offered a destiny he cannot refuse.',
    score: 98, rarity: 'directors-cut', streamingOn: ['Paramount+'],
    poster: { from: '#1c1c1c', to: '#9d0208', emoji: '🌹' },
  },
  {
    id: 'chinatown', title: 'Chinatown', year: 1974, kind: 'film',
    genres: ['Mystery', 'Noir'], runtime: 130, rated: 'R',
    director: 'Roman Polanski', cast: ['Jack Nicholson', 'Faye Dunaway', 'John Huston'],
    synopsis: 'A private eye follows the water and finds the rot under sun-bleached Los Angeles.',
    score: 94, rarity: 'gold', streamingOn: ['Paramount+'],
    poster: { from: '#d4a373', to: '#432818', emoji: '🚰' },
  },
  {
    id: 'jaws', title: 'Jaws', year: 1975, kind: 'film',
    genres: ['Thriller', 'Adventure'], runtime: 124, rated: 'PG',
    director: 'Steven Spielberg', cast: ['Roy Scheider', 'Robert Shaw', 'Richard Dreyfuss'],
    synopsis: 'A beach town sheriff who hates the water needs a bigger boat.',
    score: 93, rarity: 'gold', streamingOn: ['Peacock'],
    poster: { from: '#0077b6', to: '#caf0f8', emoji: '🦈' },
  },
  {
    id: 'annie-hall', title: 'Annie Hall', year: 1977, kind: 'film',
    genres: ['Comedy', 'Romance'], runtime: 93, rated: 'PG',
    director: 'Woody Allen', cast: ['Diane Keaton', 'Woody Allen'],
    synopsis: 'A neurotic comedian autopsies a love affair in flashbacks, subtitles, and la-dee-da.',
    score: 88, rarity: 'classic', streamingOn: ['Prime Video'],
    poster: { from: '#e9edc9', to: '#a98467', emoji: '🎾' },
  },
  {
    id: 'cinema-paradiso', title: 'Cinema Paradiso', year: 1988, kind: 'film',
    genres: ['Drama', 'Romance'], runtime: 155, rated: 'PG',
    director: 'Giuseppe Tornatore', cast: ['Philippe Noiret', 'Salvatore Cascio'],
    synopsis: 'A Sicilian boy grows up in the projection booth of his village cinema. The kisses were saved.',
    score: 95, rarity: 'gold', streamingOn: ['Apple TV'],
    poster: { from: '#ffb703', to: '#5e503f', emoji: '🎞️' },
  },
  {
    id: 'spirited-away', title: 'Spirited Away', year: 2001, kind: 'film',
    genres: ['Animation', 'Fantasy'], runtime: 125, rated: 'PG',
    director: 'Hayao Miyazaki', cast: ['Rumi Hiiragi', 'Miyu Irino'],
    synopsis: 'A sulky ten-year-old must work in a bathhouse for spirits to win her parents back from a curse.',
    score: 97, rarity: 'directors-cut', streamingOn: ['Max'],
    poster: { from: '#d62828', to: '#003049', emoji: '🐉' },
  },
  {
    id: 'amelie', title: 'Amélie', year: 2001, kind: 'film',
    genres: ['Comedy', 'Romance'], runtime: 122, rated: 'R',
    director: 'Jean-Pierre Jeunet', cast: ['Audrey Tautou', 'Mathieu Kassovitz'],
    synopsis: 'A shy Montmartre waitress secretly engineers small miracles for everyone but herself.',
    score: 91, rarity: 'classic', streamingOn: ['Prime Video'],
    poster: { from: '#2a9d8f', to: '#e76f51', emoji: '🥄' },
  },
  {
    id: 'la-la-land', title: 'La La Land', year: 2016, kind: 'film',
    genres: ['Musical', 'Romance'], runtime: 128, rated: 'PG-13',
    director: 'Damien Chazelle', cast: ['Ryan Gosling', 'Emma Stone'],
    synopsis: 'A jazz purist and an almost-actress fall in love in a Los Angeles that still dances at magic hour.',
    score: 91, rarity: 'classic', streamingOn: ['Netflix'],
    poster: { from: '#5e60ce', to: '#ffd166', emoji: '🌆' },
  },
  {
    id: 'parasite', title: 'Parasite', year: 2019, kind: 'film',
    genres: ['Thriller', 'Drama'], runtime: 132, rated: 'R',
    director: 'Bong Joon-ho', cast: ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'],
    synopsis: 'A basement-dwelling family folds itself, one perfect con at a time, into a glass house on a hill.',
    score: 96, rarity: 'gold', streamingOn: ['Max'],
    poster: { from: '#283618', to: '#dda15e', emoji: '🪨' },
  },
  {
    id: 'eeaao', title: 'Everything Everywhere All at Once', year: 2022, kind: 'film',
    genres: ['Sci-Fi', 'Comedy'], runtime: 139, rated: 'R',
    director: 'Daniels', cast: ['Michelle Yeoh', 'Ke Huy Quan', 'Stephanie Hsu'],
    synopsis: 'A laundromat owner being audited becomes the multiverse’s last hope between googly eyes and bagels.',
    score: 95, rarity: 'gold', streamingOn: ['Showtime'],
    poster: { from: '#ff006e', to: '#3a86ff', emoji: '🥯' },
  },
  // ——— Filmed stage productions ———
  {
    id: 'hamilton', title: 'Hamilton', year: 2020, kind: 'stage',
    genres: ['Musical', 'History'], runtime: 160, rated: 'PG-13',
    director: 'Thomas Kail', cast: ['Lin-Manuel Miranda', 'Leslie Odom Jr.', 'Phillipa Soo'],
    synopsis: 'The ten-dollar founding father raps his way from orphan to architect of a nation, filmed live on Broadway.',
    score: 97, rarity: 'directors-cut', streamingOn: ['Disney+'],
    poster: { from: '#dba111', to: '#1c1c1c', emoji: '⭐' },
  },
  {
    id: 'nt-frankenstein', tmdb: 'National Theatre Live: Frankenstein', title: 'Frankenstein (NT Live)', year: 2011, kind: 'stage',
    genres: ['Drama', 'Horror'], runtime: 130, rated: 'PG-13',
    director: 'Danny Boyle', cast: ['Benedict Cumberbatch', 'Jonny Lee Miller'],
    synopsis: 'The Creature opens its eyes on a bare stage and demands an answer from its maker, captured live at the National Theatre.',
    score: 92, rarity: 'gold', streamingOn: ['NT at Home'],
    poster: { from: '#3c096c', to: '#80ffdb', emoji: '⚡' },
  },
  {
    id: 'phantom-rah', tmdb: 'The Phantom of the Opera at the Royal Albert Hall', title: 'The Phantom of the Opera at the Royal Albert Hall', year: 2011, kind: 'stage',
    genres: ['Musical', 'Romance'], runtime: 137, rated: 'PG',
    director: 'Nick Morris & Laurence Connor', cast: ['Ramin Karimloo', 'Sierra Boggess'],
    synopsis: 'The music of the night fills the Royal Albert Hall for the 25th-anniversary staging of the masked legend.',
    score: 89, rarity: 'classic', streamingOn: ['Prime Video'],
    poster: { from: '#10002b', to: '#c9184a', emoji: '🎭' },
  },
  {
    id: 'newsies', tmdb: 'Newsies: The Broadway Musical', title: 'Newsies: The Broadway Musical', year: 2017, kind: 'stage',
    genres: ['Musical', 'Family'], runtime: 149, rated: 'G',
    director: 'Jeff Calhoun & Brett Sullivan', cast: ['Jeremy Jordan', 'Kara Lindsay'],
    synopsis: 'The newsboys of 1899 leap, flip, and strike their way onto every front page, filmed live with the original star.',
    score: 88, rarity: 'classic', streamingOn: ['Disney+'],
    poster: { from: '#bc6c25', to: '#fefae0', emoji: '🗞️' },
  },
  {
    id: 'kinky-boots', tmdb: 'Kinky Boots: The Musical', title: 'Kinky Boots: The Musical', year: 2019, kind: 'stage',
    genres: ['Musical', 'Comedy'], runtime: 134, rated: 'PG-13',
    director: 'Brett Sullivan', cast: ['Matt Henry', 'Killian Donnelly'],
    synopsis: 'A failing shoe factory finds salvation in six-inch scarlet heels, filmed live in the West End.',
    score: 86, rarity: 'classic', streamingOn: ['BroadwayHD'],
    poster: { from: '#d90429', to: '#ffccd5', emoji: '👢' },
  },
  {
    id: 'fleabag-ntlive', tmdb: 'National Theatre Live: Fleabag', title: 'Fleabag (NT Live)', year: 2019, kind: 'stage',
    genres: ['Comedy', 'Drama'], runtime: 80, rated: 'R',
    director: 'Vicky Jones', cast: ['Phoebe Waller-Bridge'],
    synopsis: 'One woman, one stool, and every terrible thought you were not supposed to hear out loud, live from Wyndham’s Theatre.',
    score: 93, rarity: 'gold', streamingOn: ['Prime Video'],
    poster: { from: '#e85d75', to: '#2b2d42', emoji: '🐹' },
  },
  {
    id: 'american-in-paris', tmdb: 'An American in Paris: The Musical', title: 'An American in Paris: The Musical', year: 2018, kind: 'stage',
    genres: ['Musical', 'Romance'], runtime: 138, rated: 'G',
    director: 'Christopher Wheeldon', cast: ['Robert Fairchild', 'Leanne Cope'],
    synopsis: 'A G.I. painter and a ballerina waltz through post-war Paris to Gershwin, filmed live in the West End.',
    score: 87, rarity: 'classic', streamingOn: ['BroadwayHD'],
    poster: { from: '#4361ee', to: '#f8edeb', emoji: '🗼' },
  },
];

/** Films added at runtime (TMDB search, Letterboxd import). */
const DYNAMIC = new Map<string, Film>();

export function registerFilms(films: Film[]) {
  for (const f of films) DYNAMIC.set(f.id, f);
}

export const filmById = (id: string): Film => {
  const f = FILMS.find((x) => x.id === id) ?? DYNAMIC.get(id);
  if (f) return f;
  // Stale id from an older import — render a harmless placeholder.
  return {
    id, title: 'Unknown title', year: 0, kind: 'film', genres: [], runtime: 0,
    rated: '—', director: '—', cast: [], synopsis: '', score: 0, rarity: 'matinee',
    streamingOn: [], poster: { from: '#2c3440', to: '#14181c', emoji: '🎬' },
  };
};

export const RARITY_LABEL: Record<Rarity, string> = {
  'matinee': 'Matinee',
  'classic': 'Classic',
  'gold': 'Golden Hour',
  'directors-cut': "Director's Cut",
};

export const RARITY_ORDER: Rarity[] = ['matinee', 'classic', 'gold', 'directors-cut'];
