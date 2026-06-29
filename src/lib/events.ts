// Gallery event data — consumed by the Gallery scroller and the Event overlay.
// Ported from the reference design's buildEvents(). Images are intentionally
// CSS-gradient placeholders ("sample images — send us yours").

export interface EventPhoto {
  grad: string
}

export interface EventItem {
  key: string
  kicker: string
  title: string
  /** Short label shown on the gallery card. */
  card: string
  desc: string
  /** Card balloon gradient + sway timing. */
  grad: string
  highlight: string // accent tone for the card's knot/string
  sway: string // animation shorthand for the card balloon
  photos: EventPhoto[]
}

const mk = (
  key: string,
  kicker: string,
  title: string,
  card: string,
  desc: string,
  grad: string,
  highlight: string,
  sway: string,
  tones: string[],
): EventItem => ({
  key,
  kicker,
  title,
  card,
  desc,
  grad,
  highlight,
  sway,
  photos: Array.from({ length: 6 }, (_, i) => ({ grad: tones[i % tones.length] })),
})

export const EVENTS: EventItem[] = [
  mk(
    'wedding',
    'חתונות ואירוסין',
    'עיצוב חתונה · שער כניסה',
    'עיצוב חתונה',
    'שערים, חופות וקירות בלונים רומנטיים בגווני רוז ושמנת שמלווים את הרגע הכי מיוחד.',
    'linear-gradient(150deg,#F6DAD4,#DD9DA1)',
    '#C77F92',
    'swayA 6.6s ease-in-out infinite',
    [
      'linear-gradient(150deg,#F6DAD4,#DD9DA1)',
      'linear-gradient(150deg,#F7E1DB,#E2A7AE)',
      'linear-gradient(150deg,#FBEAE6,#E8B9B0)',
    ],
  ),
  mk(
    'goldwall',
    'קירות בלונים',
    'קיר בלונים זהב',
    'קיר בלונים זהב',
    'קירות אורגניים בגווני זהב ושמנת — רקע מושלם לכל צילום ולכל פינת צילום באירוע.',
    'linear-gradient(150deg,#F4E6CE,#E4C99F)',
    '#B58F3C',
    'swayB 7.4s ease-in-out -1s infinite',
    [
      'linear-gradient(150deg,#F4E6CE,#E4C99F)',
      'linear-gradient(150deg,#FAF0D6,#E9D2A6)',
      'linear-gradient(150deg,#F1E0BE,#DCC290)',
    ],
  ),
  mk(
    'brit',
    'ברית ובריתה',
    'פינת בריתה',
    'פינת בריתה',
    'פינות מתוקות ועדינות בגווני פסטל וזהב לקבלת הרך הנולד באהבה.',
    'linear-gradient(150deg,#F7E1DB,#E8B5A6)',
    '#C98979',
    'swayC 6.2s ease-in-out -.5s infinite',
    [
      'linear-gradient(150deg,#F7E1DB,#E8B5A6)',
      'linear-gradient(150deg,#FBEAE2,#EAC0AE)',
      'linear-gradient(150deg,#F3DACE,#DFA890)',
    ],
  ),
  mk(
    'birthday',
    'ימי הולדת',
    'קשת יום הולדת',
    'קשת יום הולדת',
    'קשתות, מספרים וקירות בלונים שהופכים כל גיל לחגיגה צבעונית ובלתי נשכחת.',
    'linear-gradient(150deg,#F3E3D0,#E6C49C)',
    '#C2A14B',
    'swayA 7.8s ease-in-out -2s infinite',
    [
      'linear-gradient(150deg,#F3E3D0,#E6C49C)',
      'linear-gradient(150deg,#F8E7D6,#E9C2A0)',
      'linear-gradient(150deg,#F6DCD0,#E3B69A)',
    ],
  ),
  mk(
    'numbers',
    'מספרי ענק',
    'מספרי ענק · זהב',
    'מספרי ענק',
    'מספרי בלונים בגובה שמושכים את כל העיניים — מושלמים לגיל, לתאריך ולמיתוג.',
    'linear-gradient(150deg,#F6DCD6,#DFA6A0)',
    '#C77F92',
    'swayB 6.9s ease-in-out -1.5s infinite',
    [
      'linear-gradient(150deg,#F6DCD6,#DFA6A0)',
      'linear-gradient(150deg,#F4D6CE,#DC9E97)',
      'linear-gradient(150deg,#FBE6E0,#E7B3AA)',
    ],
  ),
  mk(
    'babyshower',
    'בייבי שאוור',
    'בייבי שאוור',
    'בייבי שאוור',
    'עיצובים רכים וחלומיים בוורוד ושמנת לחגיגת ההיריון והקבלה.',
    'linear-gradient(150deg,#FAE6E6,#ECB9C2)',
    '#D99FA9',
    'swayC 7.2s ease-in-out -.8s infinite',
    [
      'linear-gradient(150deg,#FAE6E6,#ECB9C2)',
      'linear-gradient(150deg,#FBEAEF,#EFC2CD)',
      'linear-gradient(150deg,#F7DDE4,#E6AAB8)',
    ],
  ),
]

export const EVENTS_BY_KEY: Record<string, EventItem> = Object.fromEntries(
  EVENTS.map((e) => [e.key, e]),
)

// ponytail: one runnable sanity check the build will trip if data drifts.
if (import.meta.env?.DEV) {
  const expected = ['wedding', 'goldwall', 'brit', 'birthday', 'numbers', 'babyshower']
  console.assert(
    expected.every((k) => EVENTS_BY_KEY[k]) && EVENTS.length === 6,
    '[events] expected all 6 event keys present',
  )
}
