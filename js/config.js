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
  reviewCount: '2200'
};