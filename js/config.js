/* ============================================================
   BEAUTY SALON — CENTRAL BUSINESS CONFIGURATION
   ------------------------------------------------------------
   DEMO TEMPLATE — every business detail is edited in ONE place.
   To brand this site for a real salon, change the values below
   (brand, location, phone, WhatsApp, social, hours, prices).

   • whatsapp  : country code + number, WITHOUT "+", "00" or spaces.
   • phone     : full international number for tel: links.
   • phoneDisplay : the number as shown to visitors.
   • instagram / facebook : full profile URLs.
   • mapsUrl   : link used by "Open in Google Maps".
   • brand     : wordmark + business name (demo placeholders).
   • location  : address + area served (demo placeholders).
   • openingHours : shown in the Contact section (keep true salon hours).
   • hoursNote    : small line under the hours list.
   • rating / reviewCount : Google review data used in Trust strip + Reviews.
   • prices       : shown in "Menu & Prices" (cat = category chip name).
                    RATES BELOW ARE SAMPLE PLACEHOLDERS — confirm with the salon.
   • timeSlots    : Book button → WhatsApp form slot choices.
   • siteUrl    : real production domain. Leave EMPTY ('') until the real
                  domain is known — canonical & og:url are then skipped so
                  no fake domain ships to production.
   ============================================================ */
var GLAZ = {
  whatsapp: '920000000000',                          // TODO: replace with real WhatsApp number
  whatsappMessage: 'Hello! I would like to book an appointment.',
  phone: '+920000000000',                            // TODO: replace with real salon phone
  phoneDisplay: '+92 000 0000000',                   // TODO: replace with real salon phone
  instagram: 'https://instagram.com/',               // TODO: replace with real profile URL
  facebook: 'https://facebook.com/',                 // TODO: replace with real profile URL
  mapsUrl: '',                                       // Google Maps link for the "Open in Google Maps" button (empty = hidden)
  siteUrl: '',                                       // e.g. 'https://www.your-domain.com'

  /* ---- BRAND (demo name — replace for each salon) ---- */
  brand: {
    line1: 'Luxe',            // first word of the wordmark
    line2: 'Bloom',           // second word of the wordmark
    amp: true,                // true to show "&" between the two words
    name: 'Luxe & Bloom Beauty Salon',  // full business name (title / SEO / footer)
    wordmark: 'Luxe & Bloom', // short wordmark used in buttons & aria-labels
    sub: 'Beauty Salon'       // tagline under the wordmark
  },

  /* ---- LOCATION (LEAVE ALL EMPTY for the generic demo.
     Fill in per salon to show address / area / map. ---- */
  location: {
    area: '',            // neighbourhood, e.g. "WAPDA Town"
    areaPhase: '',       // fuller area line, e.g. "WAPDA Town Phase 1"
    city: '',            // e.g. "Lahore"
    country: '',         // e.g. "Pakistan"
    postal: '',          // e.g. "54000"
    street: '',          // e.g. "House No. 12, Block H2"
    areaServed: ''       // e.g. "Lahore"
  },

  openingHours: [
    { label: 'Monday — Saturday', value: '10:00 AM — 9:00 PM' },
    { label: 'Sunday',            value: '12:00 PM — 7:00 PM' }
  ],
  hoursNote: 'Hours shown are placeholders — please confirm current timings with the salon.',
  rating: '4.4',
  reviewCount: '2200',

  /* Prices — SAMPLE PLACEHOLDERS (confirm & edit rates with the salon).
     cat: category chip shown on the price list; name + price appear as rows.
     price: display string; put "PKR …" or "From PKR …".                                */
  prices: [
    { cat: 'Bridal',   name: 'Bridal Makeup',            price: 'From PKR 45,000' },
    { cat: 'Bridal',   name: 'Walima / Reception Look',  price: 'From PKR 38,000' },
    { cat: 'Bridal',   name: 'Bridal Trial',             price: 'PKR 15,000' },
    { cat: 'Party',    name: 'Party & Event Makeup',     price: 'From PKR 12,000' },
    { cat: 'Party',    name: 'Engagement Look',          price: 'From PKR 15,000' },
    { cat: 'Hair',     name: 'Hair Cut & Styling',       price: 'From PKR 3,500' },
    { cat: 'Hair',     name: 'Hair Colour / Balayage',   price: 'From PKR 12,000' },
    { cat: 'Hair',     name: 'Hair Treatment',           price: 'From PKR 5,000' },
    { cat: 'Skin',     name: 'Signature Facial',         price: 'From PKR 7,500' },
    { cat: 'Skin',     name: 'Glow Facial Ritual',       price: 'From PKR 10,000' }
  ],

  /* Book form preferred-time slots */
  timeSlots: ['10:00 AM', '11:30 AM', '1:00 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'],

  /* Booking message starts with this greeting; service/date/time are appended. */
  bookingGreeting: 'Hello! I would like to book an appointment.'
};
