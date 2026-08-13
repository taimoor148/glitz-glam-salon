/* ============================================================
   GLITZ & GLAM BEAUTY SALON — CENTRAL BUSINESS CONFIGURATION
   ------------------------------------------------------------
   Edit everything business-related in ONE place.

   • whatsapp  : country code + number, WITHOUT "+", "00" or spaces.
   • phone     : full international number for tel: links.
   • phoneDisplay : the number as shown to visitors.
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
  whatsapp: '923000000000',                          // TODO: replace with real WhatsApp number
  whatsappMessage: 'Hello Glitz & Glam, I would like to book an appointment.',
  phone: '+923000000000',                            // TODO: replace with real salon phone
  phoneDisplay: '+92 300 0000000',                   // TODO: replace with real salon phone
  instagram: 'https://instagram.com/',               // TODO: replace with real profile URL
  facebook: 'https://facebook.com/',                 // TODO: replace with real profile URL
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=WAPDA+Town+Phase+1,+Lahore,+Pakistan',
  siteUrl: '',                                       // e.g. 'https://www.your-domain.com'
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
  bookingGreeting: 'Hello Glitz & Glam! I would like to book an appointment.'
};