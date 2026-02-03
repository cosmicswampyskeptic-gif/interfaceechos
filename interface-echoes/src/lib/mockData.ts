export type EpisodeType = 'story' | 'poetry' | 'excerpt'

export interface Character {
    id: string
    name: string
    avatar: string // URL or emoji
    bio: string
}

export interface Comment {
    id: string
    episodeId: string
    author: string // Character Name
    text: string
    highlightedText: string // The text in the story this comment is attached to
}

export interface Episode {
    id: string
    title: string
    slug: string
    date: string
    type: EpisodeType
    summary: string
    executiveSummary: string // "Author's Intent"
    songUrl?: string // For the header player
    content: string // Markdown or HTML-like string for now
    bannerUrl: string
    comments: Comment[]
}

export const CHARACTERS: Record<string, Character> = {
    dog: {
        id: 'dog',
        name: 'Starry-Eyed Golden Retriever',
        avatar: '🐕',
        bio: 'Optimistic to a fault. Believes the heat death of the universe is just a nap.'
    },
    roach: {
        id: 'roach',
        name: 'The Cockroach',
        avatar: '🪳',
        bio: 'Survivor. Cynic. Has seen things you people wouldn\'t believe.'
    },
    wizard: {
        id: 'wizard',
        name: 'The Wizard',
        avatar: '🧙‍♂️',
        bio: 'Seeks magic in the mundane. Often disappointed, occasionally awestruck.'
    }
}

export const EPISODES: Episode[] = [
    {
        id: '1',
        title: 'The Starry-Eyed Wagging Golden Retriever',
        slug: 'starry-eyed-retriever',
        date: 'Feb 02, 2026',
        type: 'story',
        summary: 'A story about optimism at the end of time.',
        executiveSummary: 'This episode explores the concept of "toxic positivity" vs "radical hope". The dog represents the choice to be happy despite evidence.',
        songUrl: 'https://www.youtube.com/watch?v=iYYRH4apXDo', // Space Oddity
        bannerUrl: '/headers/space.jpg',
        content: `
      The universe didn't end with a bang, but with a whimper. 
      It was the sound of a thousand stars flickering out, one by one, like candles in a drafty room.
      
      I looked at the Golden Retriever. He was still wagging his tail. Even as the entropy consumed the void, 
      he found a reason to be happy. Perhaps it was just the treat in my pocket, or perhaps he knew something I didn't.
      
      "Don't worry," he seemed to say, his eyes reflecting the dying light of a supernova. "It's just a phase."
    `,
        comments: [
            {
                id: 'c1',
                episodeId: '1',
                author: 'The Cockroach',
                text: 'Drafty room? In space? Pure literary affectation.',
                highlightedText: 'drafty room'
            },
            {
                id: 'c2',
                episodeId: '1',
                author: 'The Wizard',
                text: 'The treat is a metaphor for fleeting joy.',
                highlightedText: 'treat in my pocket'
            }
        ]
    },
    {
        id: '2',
        title: 'Ode to the Vending Machine',
        slug: 'vending-machine',
        date: 'Feb 05, 2026',
        type: 'poetry',
        summary: 'A sonnet for the mechanical provider.',
        executiveSummary: 'An exercise in finding the divine in the industrial. Also I was really hungry.',
        songUrl: 'https://www.youtube.com/watch?v=4N3N1MlvVc4', // Mad World
        bannerUrl: '/headers/machine.jpg',
        content: `
      Humming box of light and coil,
      Dispenser of the sacred snack.
      For three quarters and some toil,
      You give, and ask for nothing back.
      
      Except when you get stuck via B4,
      Then I hate you forevermore.
    `,
        comments: []
    },
    {
        id: '3',
        title: 'Excerpt: The Anthropocene Reviewed',
        slug: 'anthropocene-excerpt',
        date: 'Jan 28, 2026',
        type: 'excerpt',
        summary: 'Thoughts on scratch \\'n sniff stickers.',
    executiveSummary: 'Why we try to preserve the ephemeral.',
        bannerUrl: '/headers/book.jpg',
        content: `
      "We are, I think, a species that wants to be remembered. We want to leave a mark. We want to say, 'I was here. I mattered.' But the universe is vast and indifferent."
    `,
        comments: []
    }
]
