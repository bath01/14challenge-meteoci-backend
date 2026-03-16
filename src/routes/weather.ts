import { Router, Request, Response } from 'express';
import { getWeatherByCity } from '../services/weatherService';

const router = Router();

router.get('/:city', async (req: Request, res: Response) => {
  const cityParam = req.params['city'];
  const city = Array.isArray(cityParam) ? cityParam[0] : cityParam;

  if (!city || city.trim() === '') {
    res.status(400).json({ error: 'Le nom de la ville est requis' });
    return;
  }

  try {
    const weather = await getWeatherByCity(city);
    res.json(weather);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    const status = message.includes('introuvable') ? 404 : 502;
    res.status(status).json({ error: message });
  }
});

export default router;
