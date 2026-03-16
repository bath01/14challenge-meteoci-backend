import axios from 'axios';
import { config } from '../config';
import { GeocodingResult } from '../types/weather';

export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const query = `${city}, ${config.defaultCountry}`;

  const response = await axios.get<GeocodingResult[]>(
    `${config.nominatimBaseUrl}/search`,
    {
      params: {
        q: query,
        format: 'json',
        limit: 1,
        countrycodes: 'ci',
      },
      headers: {
        'User-Agent': 'MeteoCIApp/1.0',
      },
    }
  );

  if (!response.data || response.data.length === 0) {
    throw new Error(`Ville "${city}" introuvable en Côte d'Ivoire`);
  }

  return response.data[0];
}
