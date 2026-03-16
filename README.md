# MeteoCi Backend

API REST de prévisions météo pour les villes de Côte d'Ivoire.
Construite avec **Node.js**, **TypeScript** et **Express**.

---

## Fonctionnalités

Pour une ville donnée, l'API retourne :

- Température actuelle (°C)
- Ressenti thermique (°C)
- Taux d'humidité (%)
- Vitesse du vent (km/h)
- Indice UV
- Prévisions min/max sur **7 jours**

---

## APIs externes utilisées

| API | Rôle | Clé requise |
|-----|------|-------------|
| [Open-Meteo](https://open-meteo.com) | Données météo (temps réel + prévisions) | Non |
| [Nominatim](https://nominatim.openstreetmap.org) | Géocodage ville → coordonnées GPS | Non |

---

## Prérequis

- Node.js >= 18
- npm >= 9

---

## Installation

```bash
git clone https://github.com/bath01/14challenge-meteoci-backend.git
cd 14challenge-meteoci-backend
npm install
```

Copier le fichier d'environnement :

```bash
cp .env.example .env
```

---

## Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `PORT` | Port d'écoute du serveur | `3000` |

---

## Lancer le serveur

### Développement (hot-reload)

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## Endpoints

### `GET /health`

Vérifie que le serveur est en ligne.

**Réponse**

```json
{
  "status": "ok",
  "service": "MeteoCi API"
}
```

---

### `GET /api/weather/:city`

Retourne la météo actuelle et les prévisions sur 7 jours pour une ville de Côte d'Ivoire.

**Paramètre**

| Nom | Type | Description |
|-----|------|-------------|
| `city` | `string` | Nom de la ville (ex: `Abidjan`, `Bouaké`, `Yamoussoukro`) |

**Exemple de requête**

```bash
curl http://localhost:3000/api/weather/Abidjan
```

**Réponse 200**

```json
{
  "city": "Abidjan",
  "country": "Côte d'Ivoire",
  "latitude": 5.320357,
  "longitude": -4.016107,
  "timezone": "Africa/Abidjan",
  "current": {
    "temperature": 27.3,
    "feels_like": 33.0,
    "humidity": 88,
    "wind_speed": 7.4,
    "uv_index": 0.05,
    "unit": {
      "temperature": "°C",
      "feels_like": "°C",
      "humidity": "%",
      "wind_speed": "km/h"
    }
  },
  "forecast_7_days": [
    { "date": "2026-03-16", "temperature_max": 30.7, "temperature_min": 26.2 },
    { "date": "2026-03-17", "temperature_max": 31.4, "temperature_min": 26.0 },
    { "date": "2026-03-18", "temperature_max": 32.1, "temperature_min": 25.7 },
    { "date": "2026-03-19", "temperature_max": 31.5, "temperature_min": 26.0 },
    { "date": "2026-03-20", "temperature_max": 32.7, "temperature_min": 25.7 },
    { "date": "2026-03-21", "temperature_max": 32.3, "temperature_min": 25.8 },
    { "date": "2026-03-22", "temperature_max": 32.6, "temperature_min": 25.8 }
  ]
}
```

**Réponses d'erreur**

| Code | Description |
|------|-------------|
| `400` | Nom de ville manquant |
| `404` | Ville introuvable en Côte d'Ivoire |
| `502` | Erreur lors de l'appel aux APIs externes |

---

## Docker

### Build

```bash
docker build -t meteoci-backend .
```

### Run

```bash
docker run -p 3000:3000 meteoci-backend
```
---

## Structure du projet

```
src/
├── index.ts                  # Point d'entrée, configuration Express
├── config/
│   └── index.ts              # Variables de configuration
├── types/
│   └── weather.ts            # Types et interfaces TypeScript
├── services/
│   ├── geocodingService.ts   # Géocodage via Nominatim
│   └── weatherService.ts     # Données météo via Open-Meteo
└── routes/
    └── weather.ts            # Route GET /api/weather/:city
```
