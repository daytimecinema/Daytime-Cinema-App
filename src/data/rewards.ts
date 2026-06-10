export interface Reward {
  id: string;
  name: string;
  cost: number;
  emoji: string;
  blurb: string;
}

export const REWARDS: Reward[] = [
  { id: 'popcorn', name: 'Free Small Popcorn', cost: 800, emoji: '🍿', blurb: 'Redeem at any partner box office before a matinee.' },
  { id: 'soda', name: 'Free Fountain Drink', cost: 600, emoji: '🥤', blurb: 'Any size, any partner concession stand.' },
  { id: 'discount', name: '$2 Off a Matinee Ticket', cost: 1200, emoji: '🎟️', blurb: 'Applied automatically at checkout in the ticket portal.' },
  { id: 'poster', name: 'Vintage Poster Print', cost: 1500, emoji: '🖼️', blurb: 'A reproduction one-sheet from the club archive, mailed to you.' },
  { id: 'double', name: 'Double Feature Pass', cost: 2500, emoji: '🎬', blurb: 'Two back-to-back matinees, one ticket price.' },
  { id: 'giftcard', name: '$5 Cinema Gift Card', cost: 4000, emoji: '💳', blurb: 'Good at all partner theaters.' },
  { id: 'private', name: 'Private Screening Room Hour', cost: 9000, emoji: '👑', blurb: 'The Sunbeam Screening Room, all yours, 10–11 AM.' },
];

/** How members earn. Shown on the Rewards page. */
export const EARN_RULES = [
  { emoji: '🎟️', label: 'Buy a matinee ticket in the portal', pts: 200 },
  { emoji: '🧾', label: 'Upload a ticket stub from any theater', pts: 150 },
  { emoji: '✅', label: 'Log a watch from your queue', pts: 50 },
  { emoji: '🖼️', label: 'Win the daily Six Frames', pts: 'up to 100' },
  { emoji: '🔥', label: 'Daily check-in streak bonus', pts: '10 × streak' },
] as const;

export const PACK_COST = 500;
export const PACK_SIZE = 3;
