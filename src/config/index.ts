require('dotenv').config()

export const config = {
  port: process.env.PORT || 3000,
  openMeteoBaseUrl: 'https://api.open-meteo.com/v1',
  nominatimBaseUrl: 'https://nominatim.openstreetmap.org',
  defaultCountry: "Côte d'Ivoire",
  defaultTimezone: 'Africa/Abidjan',
};
