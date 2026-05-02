import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Camera,
  Compass,
  Globe,
  GraduationCap,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Music4,
  Search,
  Sparkles,
  Stamp,
  Store,
  Ticket,
  Train,
  Trophy,
  Wine,
} from 'lucide-react'

const concepts = [
  {
    title: 'Linguistic Landscape',
    icon: Languages,
    blurb: 'The languages, symbols, and visual messages you notice in public space.',
    example: 'A staircase in Lisbon marked only in Portuguese tells you who the sign assumes belongs there.',
    accent: 'from-rose-300 to-orange-200',
  },
  {
    title: 'Perceived Space',
    icon: Compass,
    blurb: 'How a place feels to people when they move through it.',
    example: 'A tiled alley with handwritten signs may feel intimate, local, and slower-paced.',
    accent: 'from-amber-300 to-yellow-200',
  },
  {
    title: 'Conceived Space',
    icon: MapPin,
    blurb: 'How a space is planned, branded, or designed to function.',
    example: 'A tourist map district in Porto is imagined as something visitors should consume easily.',
    accent: 'from-sky-300 to-cyan-200',
  },
  {
    title: 'Lived Space',
    icon: BookOpen,
    blurb: 'What a place becomes through everyday routines and real people using it.',
    example: 'A local cafe with neighborhood notices shows how residents actually inhabit the area.',
    accent: 'from-emerald-300 to-lime-200',
  },
  {
    title: 'Commodification',
    icon: Ticket,
    blurb: 'When culture is packaged and sold like a product or experience.',
    example: 'Sardine gift shops turn a cultural symbol into a polished tourism item.',
    accent: 'from-fuchsia-300 to-pink-200',
  },
  {
    title: 'Authenticity',
    icon: BadgeCheck,
    blurb: 'The feeling that a place is genuine, rooted, or not overly staged.',
    example: 'A small handwritten wine board can feel more authentic than a glossy “traditional experience” sign.',
    accent: 'from-violet-300 to-purple-200',
  },
  {
    title: 'Audience',
    icon: MessageCircle,
    blurb: 'Who the sign seems to be addressing or inviting in.',
    example: 'English on a menu often signals that visitors are a key audience.',
    accent: 'from-teal-300 to-cyan-200',
  },
  {
    title: 'Globalization',
    icon: Globe,
    blurb: 'How global tourism, branding, and language reshape local places.',
    example: 'Wine tours, chain branding, and multilingual storefronts can make a city feel internationally curated.',
    accent: 'from-blue-300 to-indigo-200',
  },
]

const challenges = [
  {
    id: 1,
    title: 'Portuguese Only',
    city: 'Anywhere',
    difficulty: 'Easy',
    points: 30,
    icon: Languages,
    stamp: 'Language Lock',
    badge: 'Sign Spotter',
    mission: 'Find a sign written only in Portuguese and think about who is expected to understand it.',
    prompt: 'What does Portuguese-only signage communicate about belonging in this space?',
    reflection: 'Who seems included here without explanation?',
    choices: [
      {
        question: 'Why might Portuguese appear alone on this sign?',
        answer: 'All of the above',
        options: ['Because locals use it daily', 'Because the message feels obvious to insiders', 'Because translation is unnecessary here', 'All of the above'],
      },
      {
        question: 'Who is the likely intended audience?',
        answer: 'Local residents',
        options: ['Local residents', 'Short-term tourists', 'International consumers', 'Impossible to tell'],
      },
    ],
  },
  {
    id: 2,
    title: 'Tourist English',
    city: 'Lisbon',
    difficulty: 'Easy',
    points: 35,
    icon: Camera,
    stamp: 'Welcome Glitch',
    badge: 'Audience Decoder',
    mission: 'Spot English used to attract or guide tourists in a restaurant, shop, or attraction.',
    prompt: 'How does English change who feels invited into the space?',
    reflection: 'Does English make the place more accessible, more commercial, or both?',
    choices: [
      {
        question: 'Why might English appear on this sign?',
        answer: 'All of the above',
        options: ['To attract tourists', 'To appear modern or global', 'To improve accessibility', 'All of the above'],
      },
      {
        question: 'What is the function of the language here?',
        answer: 'Commercial',
        options: ['Informational', 'Commercial', 'Private', 'Accidental'],
      },
    ],
  },
  {
    id: 3,
    title: 'Local vs Tourist Menu',
    city: 'Anywhere',
    difficulty: 'Medium',
    points: 45,
    icon: Menu,
    stamp: 'Menu Mirror',
    badge: 'Cultural Decoder',
    mission: 'Compare a local menu with a tourist-facing one. Notice wording, pricing, and visual style.',
    prompt: 'What changes when a meal is presented for visitors instead of everyday regulars?',
    reflection: 'Which menu feels like it explains the culture, and which one assumes you already know it?',
    choices: [
      {
        question: 'Who is the intended audience for the tourist menu?',
        answer: 'Tourists',
        options: ['Local residents', 'Tourists', 'Delivery drivers', 'Suppliers'],
      },
      {
        question: 'What concept best fits this comparison?',
        answer: 'Audience',
        options: ['Audience', 'Silence', 'Weather', 'Transit'],
      },
    ],
  },
  {
    id: 4,
    title: 'Sardine Spotting',
    city: 'Anywhere',
    difficulty: 'Medium',
    points: 40,
    icon: Sparkles,
    stamp: 'Souvenir Scale',
    badge: 'Symbol Hunter',
    mission: 'Find a sardine shop, ceramic display, or playful Portuguese symbol turned into a product.',
    prompt: 'When does a national symbol become a brand?',
    reflection: 'Does the item feel celebratory, stereotyped, or both at once?',
    choices: [
      {
        question: 'What concept best applies here?',
        answer: 'Commodification',
        options: ['Commodification', 'Lived Space', 'Transit Design', 'Code Switching'],
      },
      {
        question: 'How does the space feel?',
        answer: 'Mixed',
        options: ['Local', 'Touristy', 'Mixed', 'Impossible to classify'],
      },
    ],
  },
  {
    id: 5,
    title: 'Wine & Authenticity',
    city: 'Porto',
    difficulty: 'Hard',
    points: 55,
    icon: Wine,
    stamp: 'Cellar Seal',
    badge: 'Authenticity Tracker',
    mission: 'Find a wine sign, cellar ad, tasting board, or boutique bottle display and read it critically.',
    prompt: 'How is Portuguese wine being sold: as heritage, luxury, story, or spectacle?',
    reflection: 'What details make the branding feel rooted or staged?',
    choices: [
      {
        question: 'What is the language doing most strongly here?',
        answer: 'Commercial',
        options: ['Informational', 'Commercial', 'Secretive', 'Neutral'],
      },
      {
        question: 'Does this space feel authentic?',
        answer: 'Mixed',
        options: ['Yes', 'No', 'Mixed', 'Too hard to say'],
      },
    ],
  },
  {
    id: 6,
    title: 'Multilingual Moment',
    city: 'Anywhere',
    difficulty: 'Hard',
    points: 60,
    icon: Globe,
    stamp: 'Polyglot Postcard',
    badge: 'Global Reader',
    mission: 'Find a place with three or more languages visible at once.',
    prompt: 'What does multilingual signage say about mobility, tourism, and power?',
    reflection: 'Which languages look central and which look secondary?',
    choices: [
      {
        question: 'Who is the targeted audience?',
        answer: 'Both',
        options: ['Only locals', 'Only tourists', 'Both', 'No one in particular'],
      },
      {
        question: 'Which concept best applies here?',
        answer: 'Globalization',
        options: ['Authenticity', 'Globalization', 'Silence', 'Isolation'],
      },
    ],
  },
  {
    id: 7,
    title: 'Soundscape Mission',
    city: 'Anywhere',
    difficulty: 'Medium',
    points: 40,
    icon: Music4,
    stamp: 'Echo Ticket',
    badge: 'Street Listener',
    mission: 'Observe spoken language, live music, announcements, or performance in a public space.',
    prompt: 'Public space is not only visual. What does the soundscape add to the meaning of the place?',
    reflection: 'Did the space sound local, curated for tourism, or layered with both?',
    choices: [
      {
        question: 'What dominated the space most?',
        answer: 'Speech',
        options: ['Speech', 'Music', 'Silence', 'Traffic only'],
      },
      {
        question: 'What concept best applies here?',
        answer: 'Lived Space',
        options: ['Lived Space', 'Commodification', 'Brand Silence', 'Minimalism'],
      },
    ],
  },
  {
    id: 8,
    title: 'Hidden Local Space',
    city: 'Lisbon',
    difficulty: 'Medium',
    points: 50,
    icon: Store,
    stamp: 'Neighborhood Note',
    badge: 'Local Space Finder',
    mission: 'Find a spot that clearly seems designed for locals rather than visitors.',
    prompt: 'What clues make this space feel like it belongs to everyday community life?',
    reflection: 'What is present here that a tourist-oriented place might avoid or translate away?',
    choices: [
      {
        question: 'Does this space feel:',
        answer: 'Local',
        options: ['Local', 'Touristy', 'Mixed', 'Impossible to classify'],
      },
      {
        question: 'Who belongs here most obviously?',
        answer: 'Local residents',
        options: ['Local residents', 'Cruise visitors', 'Influencers', 'Day-trippers only'],
      },
    ],
  },
  {
    id: 9,
    title: 'Tourist Trap Detector',
    city: 'Porto',
    difficulty: 'Hard',
    points: 55,
    icon: Search,
    stamp: 'Glossy Alert',
    badge: 'Tourist Trap Detective',
    mission: 'Find a hyper-touristy area and identify the signs of packaging, branding, or staged tradition.',
    prompt: 'What makes a place feel overly curated for visitors?',
    reflection: 'Is “touristy” always fake, or can it still communicate something meaningful?',
    choices: [
      {
        question: 'How would you classify this space?',
        answer: 'Touristy',
        options: ['Local', 'Touristy', 'Mixed', 'Hidden'],
      },
      {
        question: 'What concept best applies?',
        answer: 'Commodification',
        options: ['Commodification', 'Silence', 'Underdevelopment', 'Privacy'],
      },
    ],
  },
  {
    id: 10,
    title: 'Symbols Over Words',
    city: 'Anywhere',
    difficulty: 'Easy',
    points: 30,
    icon: Stamp,
    stamp: 'Icon Ink',
    badge: 'Visual Decoder',
    mission: 'Find signs that rely mostly on icons, graphics, arrows, or images instead of language.',
    prompt: 'How do symbols cross language boundaries while still shaping behavior?',
    reflection: 'Do visuals make the sign more universal or more controlling?',
    choices: [
      {
        question: 'What function do these visuals serve?',
        answer: 'All of the above',
        options: ['Informational', 'Symbolic', 'Commercial', 'All of the above'],
      },
      {
        question: 'Why might symbols be preferred here?',
        answer: 'To reach many audiences quickly',
        options: ['To reach many audiences quickly', 'To avoid communicating anything', 'To hide meaning', 'To reduce decoration'],
      },
    ],
  },
  {
    id: 11,
    title: 'Transit Language',
    city: 'Anywhere',
    difficulty: 'Medium',
    points: 45,
    icon: Train,
    stamp: 'Platform Pass',
    badge: 'Mobility Mapper',
    mission: 'Analyze language choices in a train station, metro stop, tram map, or ticket machine.',
    prompt: 'How do transit signs balance efficiency, accessibility, and imagined users?',
    reflection: 'Does the transit system expect locals, visitors, or a mix of both?',
    choices: [
      {
        question: 'Who is the main audience?',
        answer: 'Both',
        options: ['Commuters only', 'Tourists only', 'Both', 'Station staff'],
      },
      {
        question: 'What is the function of language here?',
        answer: 'Informational',
        options: ['Informational', 'Decorative', 'Private', 'Emotional'],
      },
    ],
  },
  {
    id: 12,
    title: 'Global vs Local Brands',
    city: 'Anywhere',
    difficulty: 'Hard',
    points: 60,
    icon: Trophy,
    stamp: 'Brand Border',
    badge: 'Linguistic Landscape Explorer',
    mission: 'Compare a local Portuguese business with a global brand in the same area.',
    prompt: 'What visual and language choices signal “local identity” versus “global familiarity”?',
    reflection: 'Which brand seems to ask for trust through place, and which through recognition?',
    choices: [
      {
        question: 'What concept best applies here?',
        answer: 'Globalization',
        options: ['Globalization', 'Silence', 'Isolation', 'Weather'],
      },
      {
        question: 'What does the comparison reveal most?',
        answer: 'Different ideas of audience and identity',
        options: ['Nothing meaningful', 'Different ideas of audience and identity', 'Only price differences', 'Only color trends'],
      },
    ],
  },
]

const reflectionPrompts = [
  'What did this space communicate without directly saying it?',
  'Who belongs in this space?',
  'What language choices felt intentional?',
  'What made a place feel authentic?',
  'How did tourism shape language here?',
]

const cityThemes = {
  Lisbon: [
    'Portuguese authenticity and neighborhood identity',
    'Local signage tucked into lived-in streets',
    'Tradition visible in ordinary daily routines',
    'A stronger feeling of insider knowledge in some spaces',
  ],
  Porto: [
    'English-heavy tourism and international reach',
    'Wine branding and curated heritage storytelling',
    'Commodified experiences packaged for visitors',
    'Global branding sitting beside local symbolism',
  ],
}

const noteDefaults = {
  languagesSeen: 'Portuguese + English',
  spaceType: 'Cafe / restaurant',
  audience: 'Both',
  vibe: 'Layered and lively',
  dominantLanguage: 'Portuguese',
  touristLocal: 'Mixed',
  surprise: '',
  accessibility: 'Yes',
  authentic: 'Mixed',
}

function classNames(...parts) {
  return parts.filter(Boolean).join(' ')
}

function Sticker({ children, className = '' }) {
  return (
    <div className={classNames('sticker-edge rounded-[22px] bg-white/90 px-3 py-2 shadow-[0_10px_30px_rgba(27,37,59,0.12)]', className)}>
      {children}
    </div>
  )
}

function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div className={classNames('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <div className="font-display text-xs uppercase tracking-[0.35em] text-rose-500">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl text-slate-900 md:text-5xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">{subtitle}</p>
    </div>
  )
}

function HeroMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[34px] border border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.94),_rgba(255,239,222,0.92),_rgba(206,242,255,0.85))] p-6 shadow-[0_28px_80px_rgba(35,48,76,0.15)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.45)_35%,transparent_70%)]" />
      <div className="absolute -right-12 top-10 h-32 w-32 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute left-2 top-16 h-24 w-24 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="absolute right-6 top-6 hidden gap-3 md:flex">
        {[
          { icon: Wine, label: 'Wine' },
          { icon: Camera, label: 'Photos' },
          { icon: Music4, label: 'Fado' },
          { icon: Train, label: 'Transit' },
        ].map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              animate={{ y: [0, -6, 0], rotate: [0, 2, -1, 0] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
              className="sticker-edge flex items-center gap-2 rounded-2xl bg-white/88 px-3 py-2 text-sm font-medium text-slate-700 shadow-lg"
            >
              <Icon size={16} className="text-rose-500" />
              {item.label}
            </motion.div>
          )
        })}
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-md">
            <GraduationCap size={16} className="text-teal-600" />
            Study abroad scavenger hunt
          </div>
          <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[0.95] text-slate-900 md:text-7xl">
            Portugal Sign Quest
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            Explore Portugal through language, culture, tourism, and hidden stories.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#challenge-board" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">
              Start the Hunt
            </a>
            <a href="#concepts" className="rounded-full border border-slate-200 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5">
              Learn the Concepts
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Sticker className="rotate-[-3deg]">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Mood</div>
              <div className="font-display text-lg text-rose-500">Scrapbook x city quest</div>
            </Sticker>
            <Sticker className="rotate-[2deg]">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Lens</div>
              <div className="font-display text-lg text-teal-600">Travel, identity, signs</div>
            </Sticker>
          </div>
        </div>

        <div className="relative">
          <svg viewBox="0 0 460 480" className="mx-auto w-full max-w-[430px]">
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffcc7b" />
                <stop offset="45%" stopColor="#ff8e7b" />
                <stop offset="100%" stopColor="#6fd6d4" />
              </linearGradient>
            </defs>
            <path
              d="M241 18c18 32 22 53 18 79-5 30-20 56-15 78 5 22 25 42 23 66-1 26-26 47-31 74-6 32 16 59 8 88-7 26-35 39-41 67-4 18 2 35 14 52-57-10-92-35-112-70-19-33-18-65-7-96 10-30 30-56 33-89 4-35-12-63-17-95-5-33 3-62 18-90 17-31 40-54 109-64z"
              fill="url(#mapGradient)"
              opacity="0.95"
            />
            <path
              d="M212 32c12 26 13 45 11 68-3 30-14 57-10 80 4 21 19 38 17 59-2 20-18 40-22 63-4 29 12 54 6 80-6 24-26 39-30 61"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <motion.path
              d="M238 134 C255 160, 290 207, 266 286 C256 314, 232 348, 230 379"
              fill="none"
              stroke="#214255"
              strokeWidth="4"
              strokeDasharray="8 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            <motion.circle
              cx="240"
              cy="142"
              r="10"
              fill="#0f172a"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35 }}
            />
            <motion.circle
              cx="232"
              cy="378"
              r="10"
              fill="#0f172a"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.75 }}
            />
            <text x="264" y="138" fontSize="18" fontWeight="700" fill="#0f172a">Porto</text>
            <text x="254" y="374" fontSize="18" fontWeight="700" fill="#0f172a">Lisbon</text>
          </svg>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
            className="absolute left-0 top-14 rotate-[-8deg]"
          >
            <Sticker>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <BookOpen size={16} className="text-amber-500" />
                Passport stamp vibes
              </div>
            </Sticker>
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
            className="absolute bottom-6 right-4 rotate-[7deg]"
          >
            <Sticker>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Sparkles size={16} className="text-rose-500" />
                Find stories in signs
              </div>
            </Sticker>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function ProgressPanel({ xp, completedCount, title, percent, badges }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Sticker className="rotate-[-2deg]">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">XP</div>
        <div className="font-display text-3xl text-slate-900">{xp}</div>
      </Sticker>
      <Sticker className="rotate-[1deg]">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Completed</div>
        <div className="font-display text-3xl text-slate-900">{completedCount}/12</div>
      </Sticker>
      <Sticker className="rotate-[-1deg]">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Unlocked Title</div>
        <div className="font-display text-2xl text-teal-700">{title}</div>
      </Sticker>
      <div className="rounded-[28px] border border-white/70 bg-white/88 p-4 shadow-lg">
        <div className="flex items-center justify-between text-sm font-medium text-slate-600">
          <span>Passport Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="mt-3 h-4 rounded-full bg-slate-100">
          <motion.div
            className="h-4 rounded-full bg-[linear-gradient(90deg,#ff8f70,#ffd56b,#69d2cf)]"
            animate={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.slice(-3).map((badge) => (
            <div key={badge} className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepCard({ icon: Icon, title, text, number, color }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: number % 2 === 0 ? -1 : 1 }}
      className="relative rounded-[28px] border border-white/70 bg-white/88 p-6 shadow-[0_18px_40px_rgba(44,55,91,0.1)]"
    >
      <div className={classNames('absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-slate-900', color)}>
        {number}
      </div>
      <div className={classNames('flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-inner', color)}>
        <Icon className="text-slate-900" />
      </div>
      <h3 className="mt-5 font-display text-2xl text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600">{text}</p>
    </motion.div>
  )
}

function ConceptCard({ concept }) {
  const Icon = concept.icon
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      className="[perspective:1200px] text-left"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[240px] rounded-[28px] [transform-style:preserve-3d]"
      >
        <div className={classNames('absolute inset-0 rounded-[28px] border border-white/70 bg-gradient-to-br p-5 shadow-lg [backface-visibility:hidden]', concept.accent)}>
          <div className="flex h-full flex-col rounded-[24px] bg-white/82 p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon size={22} />
              </div>
              <div className="rounded-full bg-slate-900/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Tap to flip
              </div>
            </div>
            <h3 className="mt-6 font-display text-2xl text-slate-900">{concept.title}</h3>
            <p className="mt-3 text-slate-600">{concept.blurb}</p>
            <div className="mt-auto rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
              Think of this as your mini fieldwork lens.
            </div>
          </div>
        </div>

        <div className={classNames('absolute inset-0 rounded-[28px] border border-white/70 bg-gradient-to-br p-5 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]', concept.accent)}>
          <div className="flex h-full flex-col rounded-[24px] bg-white/82 p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Real-life Portugal example</div>
            <p className="mt-4 text-lg leading-7 text-slate-700">{concept.example}</p>
            <div className="mt-auto rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-600">
              Ask yourself: what audience, identity, or story is this space making visible?
            </div>
          </div>
        </div>
      </motion.div>
    </button>
  )
}

function ChallengeCard({ challenge, state, onToggleComplete, onAnswer, onOpen }) {
  const Icon = challenge.icon
  const solvedQuestions = Object.keys(state.answers).length

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(155deg,rgba(255,255,255,0.97),rgba(255,245,230,0.92),rgba(225,247,251,0.9))] p-5 shadow-[0_18px_50px_rgba(48,57,87,0.12)]"
    >
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-rose-200/50 blur-2xl" />
      <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-cyan-200/40 blur-2xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-slate-900 text-white shadow-md">
            <Icon size={24} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-2xl text-slate-900">{challenge.title}</h3>
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
                {challenge.city}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span>{challenge.difficulty}</span>
              <span>{challenge.points} pts</span>
              <span>{challenge.stamp}</span>
            </div>
          </div>
        </div>
        {state.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: -8 }}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
          >
            Complete
          </motion.div>
        )}
      </div>

      <p className="relative mt-5 text-slate-700">{challenge.mission}</p>

      <div className="relative mt-5 rounded-[24px] bg-slate-900 px-4 py-4 text-white">
        <div className="text-xs uppercase tracking-[0.22em] text-white/65">Critical Lens</div>
        <p className="mt-2 text-sm leading-6 text-white/90">{challenge.prompt}</p>
      </div>

      <div className="relative mt-5 space-y-4">
        {challenge.choices.map((choice, index) => (
          <div key={choice.question} className="rounded-[24px] border border-slate-200 bg-white/90 p-4">
            <div className="text-sm font-semibold text-slate-900">{choice.question}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {choice.options.map((option) => {
                const answer = state.answers[index]
                const isPicked = answer === option
                const isCorrect = choice.answer === option
                const showResult = Boolean(answer)
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onAnswer(challenge.id, index, option)}
                    className={classNames(
                      'rounded-full px-3 py-2 text-sm font-medium transition',
                      showResult && isCorrect && 'bg-emerald-500 text-white shadow',
                      showResult && isPicked && !isCorrect && 'bg-rose-500 text-white shadow',
                      !showResult && 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                      showResult && !isPicked && !isCorrect && 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {state.answers[index] && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={classNames(
                  'mt-3 text-sm font-medium',
                  state.answers[index] === choice.answer ? 'text-emerald-700' : 'text-rose-700'
                )}
              >
                {state.answers[index] === choice.answer ? 'Nice read. You earned bonus XP.' : `Close one. A strong lens here is: ${choice.answer}.`}
              </motion.p>
            )}
          </div>
        ))}
      </div>

      <div className="relative mt-5 rounded-[24px] border border-dashed border-slate-300 bg-white/75 p-4">
        <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Reflection Prompt</div>
        <p className="mt-2 text-sm text-slate-700">{challenge.reflection}</p>
      </div>

      <div className="relative mt-5">
        <div className="flex items-center justify-between text-sm font-medium text-slate-600">
          <span>Progress tracker</span>
          <span>{state.progress}%</span>
        </div>
        <div className="mt-2 h-3 rounded-full bg-slate-100">
          <motion.div
            animate={{ width: `${state.progress}%` }}
            className="h-3 rounded-full bg-[linear-gradient(90deg,#ff8f70,#ffd56b,#69d2cf)]"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleComplete(challenge.id)}
            className={classNames(
              'rounded-full px-4 py-2 text-sm font-semibold shadow transition hover:-translate-y-0.5',
              state.completed ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'
            )}
          >
            {state.completed ? 'Completed Stamp Earned' : 'Mark Complete'}
          </button>
          <button
            type="button"
            onClick={() => onOpen(challenge)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
          >
            Focus Mode
          </button>
          <div className="rounded-full bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800">
            {solvedQuestions}/{challenge.choices.length} questions solved
          </div>
          <div className="rounded-full bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700">
            Badge: {challenge.badge}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function FieldNotes({ draft, setDraft, notes, onSave, onExport }) {
  return (
    <section className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-xl">
      <SectionTitle
        eyebrow="Mini Research Mode"
        title="Field Notes"
        subtitle="Log what you notice as if you’re building a tiny linguistic landscape journal in real time."
      />

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={onSave}
          className="grid gap-4 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,247,237,0.95),rgba(241,250,252,0.95))] p-5"
        >
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Languages seen
            <select
              value={draft.languagesSeen}
              onChange={(event) => setDraft((prev) => ({ ...prev, languagesSeen: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              <option>Portuguese only</option>
              <option>Portuguese + English</option>
              <option>3+ languages</option>
              <option>Portuguese + another language</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Type of space
            <select
              value={draft.spaceType}
              onChange={(event) => setDraft((prev) => ({ ...prev, spaceType: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              <option>Cafe / restaurant</option>
              <option>Transit</option>
              <option>Shopfront</option>
              <option>Tourist attraction</option>
              <option>Neighborhood corner</option>
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Intended audience
              <select
                value={draft.audience}
                onChange={(event) => setDraft((prev) => ({ ...prev, audience: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <option>Locals</option>
                <option>Tourists</option>
                <option>Both</option>
                <option>Hard to tell</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Tone / vibe
              <select
                value={draft.vibe}
                onChange={(event) => setDraft((prev) => ({ ...prev, vibe: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <option>Layered and lively</option>
                <option>Local and quiet</option>
                <option>Polished and touristy</option>
                <option>Mixed and hard to classify</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Most dominant language
              <select
                value={draft.dominantLanguage}
                onChange={(event) => setDraft((prev) => ({ ...prev, dominantLanguage: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <option>Portuguese</option>
                <option>English</option>
                <option>Balanced mix</option>
                <option>Visual symbols more than words</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Tourist or local?
              <select
                value={draft.touristLocal}
                onChange={(event) => setDraft((prev) => ({ ...prev, touristLocal: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <option>Local</option>
                <option>Touristy</option>
                <option>Mixed</option>
                <option>Impossible to classify</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            What surprised you?
            <textarea
              value={draft.surprise}
              onChange={(event) => setDraft((prev) => ({ ...prev, surprise: event.target.value }))}
              className="min-h-[100px] rounded-2xl border border-slate-200 bg-white px-4 py-3"
              placeholder="A tiny detail, a weird translation, a menu tone, a symbol that stood out..."
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Did English change accessibility?
              <select
                value={draft.accessibility}
                onChange={(event) => setDraft((prev) => ({ ...prev, accessibility: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <option>Yes</option>
                <option>No</option>
                <option>A little</option>
                <option>Not relevant</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Did the space feel authentic?
              <select
                value={draft.authentic}
                onChange={(event) => setDraft((prev) => ({ ...prev, authentic: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <option>Yes</option>
                <option>No</option>
                <option>Mixed</option>
                <option>Not sure</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg">
              Save Field Note
            </button>
            <button type="button" onClick={onExport} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
              Export Notes
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,245,232,0.92))] p-5 shadow-lg"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {note.spaceType}
                </div>
                <div className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
                  {note.languagesSeen}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{note.createdAt}</div>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                <div><span className="font-semibold">Audience:</span> {note.audience}</div>
                <div><span className="font-semibold">Vibe:</span> {note.vibe}</div>
                <div><span className="font-semibold">Dominant language:</span> {note.dominantLanguage}</div>
                <div><span className="font-semibold">Tourist/local:</span> {note.touristLocal}</div>
                <div><span className="font-semibold">Accessibility shift:</span> {note.accessibility}</div>
                <div><span className="font-semibold">Authenticity:</span> {note.authentic}</div>
              </div>
              <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{note.surprise || 'No surprise logged yet, but the vibe was noted.'}</p>
            </motion.div>
          ))}
          {notes.length === 0 && (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
              Your field notes will stack up here like passport pages.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PortoLisbonComparison({ focus, setFocus }) {
  return (
    <section className="rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,243,236,0.95),rgba(238,250,251,0.92))] p-6 shadow-xl">
      <SectionTitle
        eyebrow="Compare Cities"
        title="Porto vs Lisbon"
        subtitle="Toggle between two city vibes and notice how tourism, identity, and branding show up differently."
      />

      <div className="mt-6 flex flex-wrap gap-3">
        {['Lisbon', 'Porto'].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setFocus(city)}
            className={classNames(
              'rounded-full px-5 py-3 text-sm font-semibold transition',
              focus === city ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-700 shadow-sm'
            )}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div layout className={classNames('rounded-[30px] border p-6 shadow-lg', focus === 'Lisbon' ? 'border-rose-200 bg-white' : 'border-white/70 bg-white/80')}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-3xl text-slate-900">Lisbon</h3>
            <div className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
              hillside identity
            </div>
          </div>
          <div className="mt-5 rounded-[26px] bg-[linear-gradient(145deg,#ffd6c8,#fff2cf,#ffffff)] p-5">
            <div className="rounded-[22px] border border-white/70 bg-white/80 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Map Snippet</div>
              <div className="mt-4 h-40 rounded-[20px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,160,122,0.45),transparent_40%),linear-gradient(135deg,rgba(255,236,221,0.96),rgba(255,255,255,0.92))] p-4">
                <div className="flex h-full flex-col justify-between rounded-[18px] border border-dashed border-rose-300 p-4">
                  <div className="font-display text-2xl text-slate-900">Alfama, Mouraria, side streets</div>
                  <div className="text-sm text-slate-600">Portuguese-first signage, neighborhood texture, small-scale place identity.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {cityThemes.Lisbon.map((theme) => (
              <motion.div key={theme} whileHover={{ x: 5 }} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {theme}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div layout className={classNames('rounded-[30px] border p-6 shadow-lg', focus === 'Porto' ? 'border-cyan-200 bg-white' : 'border-white/70 bg-white/80')}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-3xl text-slate-900">Porto</h3>
            <div className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
              curated heritage
            </div>
          </div>
          <div className="mt-5 rounded-[26px] bg-[linear-gradient(145deg,#d4f0ef,#fef3d0,#ffffff)] p-5">
            <div className="rounded-[22px] border border-white/70 bg-white/80 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Map Snippet</div>
              <div className="mt-4 h-40 rounded-[20px] bg-[radial-gradient(circle_at_80%_25%,rgba(96,209,206,0.42),transparent_38%),linear-gradient(135deg,rgba(234,252,251,0.96),rgba(255,255,255,0.92))] p-4">
                <div className="flex h-full flex-col justify-between rounded-[18px] border border-dashed border-cyan-300 p-4">
                  <div className="font-display text-2xl text-slate-900">Ribeira, wine cellars, riverfront</div>
                  <div className="text-sm text-slate-600">English-heavy messaging, wine storytelling, packaged authenticity.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {cityThemes.Porto.map((theme) => (
              <motion.div key={theme} whileHover={{ x: -5 }} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {theme}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-8 rounded-[28px] bg-slate-900 px-5 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/60">Interactive Comparison Slider</div>
            <div className="mt-2 text-lg text-white/90">Current focus: {focus}</div>
          </div>
          <div className="w-full max-w-md">
            <input
              type="range"
              min="0"
              max="1"
              step="1"
              value={focus === 'Lisbon' ? 0 : 1}
              onChange={(event) => setFocus(event.target.value === '0' ? 'Lisbon' : 'Porto')}
              className="w-full accent-amber-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ReflectionJournal({ entries, draft, setDraft, onSavePrompt }) {
  return (
    <section className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-xl">
      <SectionTitle
        eyebrow="Reflection Journal"
        title="Pause and Read the Space"
        subtitle="Short reflections turn scavenger hunt moments into bigger questions about belonging, power, and cultural storytelling."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(239,251,251,0.96),rgba(255,247,238,0.94))] p-5">
          <div className="space-y-3">
            {reflectionPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, prompt }))}
                className={classNames(
                  'w-full rounded-2xl px-4 py-4 text-left text-sm font-medium transition',
                  draft.prompt === prompt ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'
                )}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-white/80 p-4 text-sm text-slate-600">
            Pick a prompt, type a quick response, and it stays in local React state like a digital notebook page.
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5">
            <label className="block text-xs uppercase tracking-[0.24em] text-slate-500">Selected prompt</label>
            <div className="mt-2 font-display text-2xl text-slate-900">{draft.prompt}</div>
            <textarea
              value={draft.response}
              onChange={(event) => setDraft((prev) => ({ ...prev, response: event.target.value }))}
              placeholder="Write what the space seemed to say beneath the surface..."
              className="mt-4 min-h-[180px] w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700"
            />
            <button
              type="button"
              onClick={onSavePrompt}
              className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Save Reflection
            </button>
          </div>

          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-[26px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(254,246,232,0.92))] p-5 shadow-lg"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{entry.date}</div>
                <div className="mt-2 font-semibold text-slate-900">{entry.prompt}</div>
                <p className="mt-3 text-sm leading-7 text-slate-700">{entry.response}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {entries.length === 0 && (
            <div className="rounded-[26px] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
              Your saved reflections will appear here.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function FocusModal({ challenge, state, onClose }) {
  if (!challenge) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          onClick={(event) => event.stopPropagation()}
          className="max-h-[88vh] w-full max-w-2xl overflow-auto rounded-[34px] bg-[linear-gradient(160deg,rgba(255,255,255,0.99),rgba(255,245,232,0.97),rgba(236,251,252,0.95))] p-6 shadow-[0_25px_90px_rgba(15,23,42,0.35)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Focus Mode
              </div>
              <h3 className="mt-4 font-display text-4xl text-slate-900">{challenge.title}</h3>
              <p className="mt-3 text-slate-700">{challenge.mission}</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow">
              Close
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[26px] bg-white/85 p-5 shadow-sm">
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Critical Lens</div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{challenge.prompt}</p>
            </div>
            <div className="rounded-[26px] bg-slate-900 p-5 text-white shadow-sm">
              <div className="text-xs uppercase tracking-[0.22em] text-white/60">Stamp Earned</div>
              <div className="mt-3 font-display text-2xl">{challenge.stamp}</div>
              <div className="mt-2 text-sm text-white/80">Progress: {state.progress}%</div>
            </div>
          </div>

          <div className="mt-5 rounded-[26px] border border-dashed border-slate-300 bg-white/80 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Reflection Prompt</div>
            <p className="mt-3 text-sm leading-7 text-slate-700">{challenge.reflection}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [challengeState, setChallengeState] = useState(() =>
    Object.fromEntries(
      challenges.map((challenge) => [
        challenge.id,
        {
          completed: false,
          answers: {},
          progress: 0,
          bonusAwarded: [],
        },
      ])
    )
  )
  const [notesDraft, setNotesDraft] = useState(noteDefaults)
  const [notes, setNotes] = useState([])
  const [journalDraft, setJournalDraft] = useState({
    prompt: reflectionPrompts[0],
    response: '',
  })
  const [journalEntries, setJournalEntries] = useState([])
  const [cityFocus, setCityFocus] = useState('Lisbon')
  const [focusChallenge, setFocusChallenge] = useState(null)
  const [exportPulse, setExportPulse] = useState(false)

  const completedCount = useMemo(
    () => Object.values(challengeState).filter((item) => item.completed).length,
    [challengeState]
  )

  const xp = useMemo(() => {
    return challenges.reduce((total, challenge) => {
      const state = challengeState[challenge.id]
      const completionXP = state.completed ? challenge.points : 0
      const questionXP = Object.entries(state.answers).reduce((sum, [index, selected]) => {
        const isCorrect = challenge.choices[Number(index)].answer === selected
        return sum + (isCorrect ? 10 : 0)
      }, 0)
      return total + completionXP + questionXP
    }, 0)
  }, [challengeState])

  const badges = useMemo(() => {
    return challenges
      .filter((challenge) => challengeState[challenge.id].completed)
      .map((challenge) => challenge.badge)
  }, [challengeState])

  const completionPercent = Math.round((completedCount / challenges.length) * 100)

  const unlockedTitle = useMemo(() => {
    if (xp >= 480) return 'Cultural Decoder'
    if (xp >= 360) return 'Linguistic Landscape Explorer'
    if (xp >= 250) return 'Tourist Trap Detective'
    if (xp >= 160) return 'Local Space Finder'
    return 'Sign Spotter'
  }, [xp])

  function updateProgress(id, answers, completed) {
    const challenge = challenges.find((item) => item.id === id)
    const questionShare = Math.round((Object.keys(answers).length / challenge.choices.length) * 70)
    const completionShare = completed ? 30 : 0
    return Math.min(100, questionShare + completionShare)
  }

  function handleAnswer(challengeId, questionIndex, option) {
    setChallengeState((current) => {
      const state = current[challengeId]
      const nextAnswers = { ...state.answers, [questionIndex]: option }
      return {
        ...current,
        [challengeId]: {
          ...state,
          answers: nextAnswers,
          progress: updateProgress(challengeId, nextAnswers, state.completed),
        },
      }
    })
  }

  function handleToggleComplete(challengeId) {
    setChallengeState((current) => {
      const state = current[challengeId]
      const completed = !state.completed
      return {
        ...current,
        [challengeId]: {
          ...state,
          completed,
          progress: updateProgress(challengeId, state.answers, completed),
        },
      }
    })
  }

  function handleSaveNote(event) {
    event.preventDefault()
    setNotes((current) => [
      {
        id: `note-${Date.now()}`,
        ...notesDraft,
        createdAt: new Date().toLocaleDateString(),
      },
      ...current,
    ])
    setNotesDraft(noteDefaults)
  }

  function handleExportNotes() {
    setExportPulse(true)
    window.setTimeout(() => setExportPulse(false), 900)
  }

  function handleSaveJournalPrompt() {
    if (!journalDraft.response.trim()) return
    setJournalEntries((current) => [
      {
        id: `entry-${Date.now()}`,
        prompt: journalDraft.prompt,
        response: journalDraft.response.trim(),
        date: new Date().toLocaleString(),
      },
      ...current,
    ])
    setJournalDraft((current) => ({ ...current, response: '' }))
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff8ef_0%,#fefefe_26%,#eefbfb_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#0f172a_0.8px,transparent_0.8px)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top_left,rgba(255,188,128,0.45),transparent_34%),radial-gradient(circle_at_top_right,rgba(129,230,217,0.35),transparent_30%)]" />

      <main className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="pt-2">
          <HeroMap />
        </section>

        <ProgressPanel
          xp={xp}
          completedCount={completedCount}
          title={unlockedTitle}
          percent={completionPercent}
          badges={badges}
        />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-xl">
            <SectionTitle
              eyebrow="How It Works"
              title="Play it like a city scavenger hunt"
              subtitle="Move through Lisbon or Porto, spot signs and spaces, then decode what they reveal about language, tourism, identity, and belonging."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <StepCard
                icon={Compass}
                number="1"
                title="Pick a Challenge"
                text="Choose a mission from the board and head into the city looking for a clue."
                color="from-amber-200 to-rose-200"
              />
              <StepCard
                icon={MapPin}
                number="2"
                title="Explore the City"
                text="Wander through stations, cafes, viewpoints, menus, and storefronts with a researcher’s eye."
                color="from-cyan-200 to-teal-200"
              />
              <StepCard
                icon={Search}
                number="3"
                title="Decode the Meaning"
                text="Answer playful critical-thinking prompts and notice who the space seems built for."
                color="from-lime-200 to-yellow-200"
              />
            </div>
          </div>

          <div className="rounded-[34px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,241,230,0.95),rgba(240,251,252,0.93))] p-6 shadow-xl">
            <SectionTitle
              eyebrow="Passport Rewards"
              title="Stamps, badges, and titles"
              subtitle="Each completed mission levels up your passport and unlocks a more observant way of reading public space."
            />
            <div className="mt-6 grid gap-3">
              {[
                'Sign Spotter',
                'Local Space Finder',
                'Tourist Trap Detective',
                'Linguistic Landscape Explorer',
                'Cultural Decoder',
              ].map((label, index) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between rounded-2xl bg-white/85 px-4 py-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                      {index + 1}
                    </div>
                    <span className="font-medium text-slate-700">{label}</span>
                  </div>
                  <ArrowRight size={18} className="text-slate-400" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="concepts" className="rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,246,238,0.95),rgba(239,251,252,0.95))] p-6 shadow-xl">
          <SectionTitle
            eyebrow="Concept Deck"
            title="Think Like a Linguistic Landscape Researcher"
            subtitle="These ideas stay short, practical, and fieldwork-friendly. Flip the cards for a quick Portugal example."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {concepts.map((concept) => (
              <ConceptCard key={concept.title} concept={concept} />
            ))}
          </div>
        </section>

        <section id="challenge-board" className="rounded-[36px] border border-white/70 bg-white/88 p-6 shadow-xl">
          <SectionTitle
            eyebrow="Main Feature"
            title="Challenge Board"
            subtitle="Twelve playful missions mix observation, multiple choice, and reflection so the site teaches through interaction instead of long academic blocks."
          />

          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                state={challengeState[challenge.id]}
                onToggleComplete={handleToggleComplete}
                onAnswer={handleAnswer}
                onOpen={setFocusChallenge}
              />
            ))}
          </div>
        </section>

        <FieldNotes
          draft={notesDraft}
          setDraft={setNotesDraft}
          notes={notes}
          onSave={handleSaveNote}
          onExport={handleExportNotes}
        />

        <PortoLisbonComparison focus={cityFocus} setFocus={setCityFocus} />

        <ReflectionJournal
          entries={journalEntries}
          draft={journalDraft}
          setDraft={setJournalDraft}
          onSavePrompt={handleSaveJournalPrompt}
        />

        <section className="relative overflow-hidden rounded-[40px] border border-white/70 bg-slate-900 px-6 py-16 text-center text-white shadow-[0_28px_80px_rgba(15,23,42,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,211,122,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(91,223,217,0.18),transparent_30%)]" />
          <div className="relative mx-auto max-w-4xl">
            <div className="font-display text-4xl leading-tight md:text-6xl">
              Go outside. Look closer.
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/82 md:text-2xl">
              Every sign tells a story about identity, belonging, tourism, power, and culture.
            </p>
            <p className="mx-auto mt-6 max-w-3xl font-display text-2xl text-amber-300 md:text-4xl">
              Portugal isn’t just something you visit. It’s something you learn to read.
            </p>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {exportPulse && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="fixed bottom-6 right-6 z-40 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            Export Notes simulated. Passport pages ready.
          </motion.div>
        )}
      </AnimatePresence>

      <FocusModal
        challenge={focusChallenge}
        state={focusChallenge ? challengeState[focusChallenge.id] : null}
        onClose={() => setFocusChallenge(null)}
      />
    </div>
  )
}
