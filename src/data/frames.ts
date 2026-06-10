import { hashStr } from './theaters';

/**
 * Daily "Six Frames" puzzle (inspired by framed.wtf): six stylized frames
 * from one film, revealed one at a time. Each frame is a CSS-rendered
 * "still" — a color wash plus the props in shot — so no copyrighted
 * imagery ships with the app.
 */
export interface PuzzleFrame {
  sky: string;      // top gradient color
  ground: string;   // bottom gradient color
  props: string;    // emoji "set dressing" for the shot
  caption: string;  // what the camera sees
}

export interface FramePuzzle {
  answerId: string; // film id in catalog
  frames: PuzzleFrame[];
}

export const PUZZLES: FramePuzzle[] = [
  {
    answerId: 'singin-rain',
    frames: [
      { sky: '#22577a', ground: '#38a3a5', props: '💡', caption: 'A lamppost glows on a wet studio street.' },
      { sky: '#22577a', ground: '#57cc99', props: '☔🌧️', caption: 'A man closes his umbrella as the downpour starts.' },
      { sky: '#2b2d42', ground: '#8d99ae', props: '🎬🎤', caption: 'A silent-movie set panics over a microphone.' },
      { sky: '#ffd166', ground: '#ef476f', props: '🛋️🎩', caption: 'Two hoofers tip a couch over mid-song.' },
      { sky: '#118ab2', ground: '#073b4c', props: '👞💦', caption: 'Tap shoes stomp straight through a puddle.' },
      { sky: '#5ea9dd', ground: '#f7e26b', props: '☔😄👮', caption: 'A drenched man hands his umbrella to a passerby as a cop stares.' },
    ],
  },
  {
    answerId: 'jaws',
    frames: [
      { sky: '#90e0ef', ground: '#0077b6', props: '🛟', caption: 'A crowded beach on the Fourth of July.' },
      { sky: '#caf0f8', ground: '#023e8a', props: '🏊‍♀️🌊', caption: 'Legs kick above a deep blue nothing.' },
      { sky: '#fffae5', ground: '#0096c7', props: '🛥️🪝', caption: 'Three men chum the water off a small boat.' },
      { sky: '#ffd60a', ground: '#003566', props: '🛢️🛢️', caption: 'Two yellow barrels surface where they should not.' },
      { sky: '#001d3d', ground: '#000814', props: '🌊🚤', caption: 'Something enormous bumps the hull at night.' },
      { sky: '#0077b6', ground: '#caf0f8', props: '🦈😱', caption: 'A fin rises. They are going to need a bigger boat.' },
    ],
  },
  {
    answerId: 'wizard-oz',
    frames: [
      { sky: '#b5b8a3', ground: '#8a817c', props: '🚜', caption: 'A gray Kansas farmyard, sepia and still.' },
      { sky: '#5f6f52', ground: '#3a3a3a', props: '🌪️🏠', caption: 'A twister lifts a whole house off the plains.' },
      { sky: '#7ec850', ground: '#f7e26b', props: '🌈🏘️', caption: 'A door opens onto a world in Technicolor.' },
      { sky: '#ffd60a', ground: '#fb8500', props: '🧱👠', caption: 'Ruby slippers step onto a yellow brick road.' },
      { sky: '#80ed99', ground: '#22577a', props: '🏰✨', caption: 'An emerald city glitters past a poppy field.' },
      { sky: '#7ec850', ground: '#f7e26b', props: '🦁🤖🎓🐕', caption: 'A girl, a lion, a tin man, and a scarecrow link arms.' },
    ],
  },
  {
    answerId: 'hamilton',
    frames: [
      { sky: '#1c1c1c', ground: '#dba111', props: '🕯️', caption: 'A bare wooden stage, two turntables, candlelight.' },
      { sky: '#264653', ground: '#dba111', props: '📜🪶', caption: 'A man writes like he is running out of time.' },
      { sky: '#9d0208', ground: '#1c1c1c', props: '🎺🇺🇸', caption: 'Redcoats and rebels rap battle in a cabinet meeting.' },
      { sky: '#10002b', ground: '#dba111', props: '👑😏', caption: 'A petulant king croons that you will be back.' },
      { sky: '#003049', ground: '#669bbc', props: '🔫🌅', caption: 'Two men count ten paces at dawn in Weehawken.' },
      { sky: '#dba111', ground: '#1c1c1c', props: '⭐🎭', caption: 'The company asks who lives, who dies, who tells your story.' },
    ],
  },
  {
    answerId: 'spirited-away',
    frames: [
      { sky: '#8ecae6', ground: '#606c38', props: '🚗', caption: 'A family takes a wrong turn to an abandoned theme park.' },
      { sky: '#d62828', ground: '#003049', props: '🏮🌉', caption: 'Lanterns flare to life across a bathhouse bridge at dusk.' },
      { sky: '#003049', ground: '#d62828', props: '🐷🍜', caption: 'Her parents will not stop eating. Something is wrong.' },
      { sky: '#2a9d8f', ground: '#264653', props: '🛁🐸', caption: 'A new worker scrubs the biggest tub for a stink spirit.' },
      { sky: '#cdb4db', ground: '#5a189a', props: '👺💰', caption: 'A masked spirit offers fistfuls of gold. No Face follows.' },
      { sky: '#90e0ef', ground: '#0077b6', props: '🚂🌊', caption: 'A train glides across a flooded sea toward the sixth stop.' },
    ],
  },
  {
    answerId: 'parasite',
    frames: [
      { sky: '#6c757d', ground: '#343a40', props: '🪟🧦', caption: 'Socks dry in a semi-basement window at street level.' },
      { sky: '#a3b18a', ground: '#588157', props: '📶📱', caption: 'Free wi-fi is found in the corner by the toilet.' },
      { sky: '#dad7cd', ground: '#a3b18a', props: '🏡🍑', caption: 'A glass house on a hill needs a tutor. Then a driver. Then more.' },
      { sky: '#283618', ground: '#1b263b', props: '⛈️🪜', caption: 'A doorbell rings on the rainiest night of the year.' },
      { sky: '#1b263b', ground: '#0d1b2a', props: '🕳️💡', caption: 'A staircase goes much further down than anyone knew.' },
      { sky: '#283618', ground: '#dda15e', props: '🪨🎂', caption: 'A scholar’s rock and a garden party end everything.' },
    ],
  },
  {
    answerId: 'casablanca',
    frames: [
      { sky: '#3b3a52', ground: '#c9a86a', props: '🌍✈️', caption: 'Refugee Europe funnels through one Moroccan city.' },
      { sky: '#1c1c1c', ground: '#c9a86a', props: '🍸🎹', caption: 'Everybody comes to Rick’s. The pianist knows one song he must not play.' },
      { sky: '#9d0208', ground: '#1c1c1c', props: '📄💼', caption: 'Two letters of transit are worth killing for.' },
      { sky: '#3d405b', ground: '#81b29a', props: '🇫🇷🎶', caption: 'A café drowns out occupiers with La Marseillaise.' },
      { sky: '#22223b', ground: '#9a8c98', props: '🥃😞', caption: 'Of all the gin joints in all the world, she walks into his.' },
      { sky: '#4a4e69', ground: '#c9ada7', props: '🛩️🌫️🎩', caption: 'A foggy runway, a sacrifice, and a beautiful friendship begins.' },
    ],
  },
  {
    answerId: 'rear-window',
    frames: [
      { sky: '#f4a261', ground: '#7f5539', props: '🌡️', caption: 'A Greenwich Village courtyard swelters through a heat wave.' },
      { sky: '#e9c46a', ground: '#264653', props: '🦵📷', caption: 'A photographer in a cast has nothing to do but look.' },
      { sky: '#264653', ground: '#1d3557', props: '🪟🪟🪟', caption: 'Every window across the courtyard is its own little movie.' },
      { sky: '#1d3557', ground: '#0d1b2a', props: '🌧️🧳', caption: 'A salesman makes three trips out with his case at 2 a.m.' },
      { sky: '#2b2d42', ground: '#8d99ae', props: '💍👗', caption: 'A society girlfriend climbs a fire escape to find a wedding ring.' },
      { sky: '#274060', ground: '#e8702a', props: '🔭💡😨', caption: 'The man across the way looks up — straight into the lens.' },
    ],
  },
  {
    answerId: 'la-la-land',
    frames: [
      { sky: '#48cae4', ground: '#adb5bd', props: '🚗🎺', caption: 'A gridlocked freeway ramp erupts into song.' },
      { sky: '#ffd166', ground: '#ef476f', props: '☕🎬', caption: 'A barista sprints across a studio backlot to an audition.' },
      { sky: '#5e60ce', ground: '#ffd166', props: '🌆👞', caption: 'Two almost-strangers tap dance above the city at magic hour.' },
      { sky: '#10002b', ground: '#5e60ce', props: '🌌💃', caption: 'A planetarium waltz drifts up into the stars.' },
      { sky: '#9d0208', ground: '#001219', props: '🎹😔', caption: 'A jazz purist plays the gig he swore he never would.' },
      { sky: '#5e60ce', ground: '#ffd166', props: '🎹💚🚪', caption: 'Years later, she walks into a club called Seb’s.' },
    ],
  },
  {
    answerId: 'fleabag-ntlive',
    frames: [
      { sky: '#2b2d42', ground: '#e85d75', props: '🪑', caption: 'One red stool under one hard spotlight.' },
      { sky: '#e85d75', ground: '#2b2d42', props: '☕😬', caption: 'A job interview goes catastrophically wrong from the first button.' },
      { sky: '#6d597a', ground: '#355070', props: '🐹💔', caption: 'A guinea-pig-themed café is failing, and it is not about the café.' },
      { sky: '#b56576', ground: '#6d597a', props: '🎨👩', caption: 'A sister, a stolen sculpture, and a very tense family dinner.' },
      { sky: '#355070', ground: '#1d1e2c', props: '🍷😉', caption: 'She keeps glancing at us. We are in on every joke.' },
      { sky: '#e85d75', ground: '#2b2d42', props: '🚌💡', caption: 'The laughing stops at a bus stop, and the truth comes out.' },
    ],
  },
  {
    answerId: '2001',
    frames: [
      { sky: '#f4a259', ground: '#bc4b51', props: '🦴', caption: 'At the dawn of man, a bone spins up into the sky.' },
      { sky: '#000814', ground: '#001d3d', props: '🛰️🌍', caption: 'The bone becomes a satellite. A waltz begins.' },
      { sky: '#001d3d', ground: '#000000', props: '⬛🌕', caption: 'A black monolith hums on the surface of the moon.' },
      { sky: '#0d1b2a', ground: '#1b263b', props: '🔴🎛️', caption: 'A ship’s computer watches lips move through a window.' },
      { sky: '#000000', ground: '#d00000', props: '🚪✨', caption: 'A pod plunges through corridors of impossible light.' },
      { sky: '#d00000', ground: '#000000', props: '👶🌌', caption: 'A child of the stars turns its gaze toward Earth.' },
    ],
  },
  {
    answerId: 'amelie',
    frames: [
      { sky: '#2a9d8f', ground: '#e76f51', props: '🥄🍮', caption: 'A spoon cracks the caramel crust of a crème brûlée.' },
      { sky: '#e9c46a', ground: '#2a9d8f', props: '📦🧸', caption: 'A tin box of childhood treasures is found behind a wall.' },
      { sky: '#264653', ground: '#2a9d8f', props: '🪞☕', caption: 'A Montmartre café waitress watches everyone’s lives but hers.' },
      { sky: '#8ab17d', ground: '#babb74', props: '🦆🗿', caption: 'A garden gnome starts mailing home photos from abroad.' },
      { sky: '#e76f51', ground: '#f4a261', props: '📸🎠', caption: 'A photo-booth mystery man leads her on a scavenger hunt past a carousel.' },
      { sky: '#2a9d8f', ground: '#e76f51', props: '🛵💚', caption: 'Two shy people finally stop scheming and just ride.' },
    ],
  },
];

/** Deterministically pick today's puzzle. */
export function puzzleForDate(dateKey: string): FramePuzzle {
  return PUZZLES[hashStr('six-frames-' + dateKey) % PUZZLES.length];
}

export const MAX_GUESSES = 6;
