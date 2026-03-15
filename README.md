# ☁️ Nimbus — Weather Dashboard

A modern, responsive weather dashboard built with **React 19**, **TypeScript**, and **Tailwind CSS v4**. Get real-time weather data, hourly/daily forecasts, air quality monitoring, and interactive weather maps — all in a sleek, dark-mode-ready interface.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🌡️ **Current Weather** — Temperature, feels-like, humidity, wind speed, and weather conditions
- 📊 **48-Hour Forecast** — Scrollable hourly forecast with weather icons
- 📅 **7-Day Forecast** — Daily high/low temperatures with weather descriptions
- 🌫️ **Air Quality Index** — Real-time pollutant levels (CO, NO₂, O₃, SO₂, PM2.5, PM10) with quality indicators
- 🗺️ **Interactive Map** — Click anywhere on the map to get weather for that location
- 🌧️ **Weather Layers** — Switch between clouds, precipitation, pressure, wind, and temperature overlays
- 🌗 **Dark / Light Mode** — Toggle between themes
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile
- ⏳ **Skeleton Loaders** — Smooth loading states while data is being fetched
- 🔍 **Zod Validation** — Runtime type-safety for all API responses

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 7](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Data Fetching** | [TanStack React Query](https://tanstack.com/query) |
| **Validation** | [Zod v4](https://zod.dev/) |
| **Maps** | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) + [MapTiler SDK](https://www.maptiler.com/) |
| **Font** | [Inter Variable](https://rsms.me/inter/) |

---

## 📁 Project Structure

```
src/
├── api.ts                    # API calls (weather, geocode, air pollution)
├── App.tsx                   # Main layout & state management
├── main.tsx                  # Entry point with providers
├── index.css                 # Global styles, CSS variables, breakpoints
├── types.ts                  # Shared TypeScript types
│
├── components/
│   ├── cards/
│   │   ├── Card.tsx                # Reusable card wrapper
│   │   ├── CurrentWeather.tsx      # Current conditions card
│   │   ├── HourlyForecast.tsx      # 48-hour scrollable forecast
│   │   ├── DailyForecast.tsx       # 7-day forecast
│   │   └── AdditionalInfo.tsx      # Dew point, UV, pressure, etc.
│   ├── dropdowns/
│   │   ├── LocationDropdown.tsx    # City selector
│   │   └── MapTypeDropdowns.tsx    # Weather layer selector
│   ├── skeletons/
│   │   ├── CurrentSkeleton.tsx
│   │   ├── HourlySkeleton.tsx
│   │   ├── DailySkeleton.tsx
│   │   ├── AdditionalInfoSkeleton.tsx
│   │   ├── SidePanelSkeleton.tsx
│   │   └── SidePanelCardSkeleton.tsx
│   ├── ui/                   # shadcn/ui components (button, slider, etc.)
│   ├── Map.tsx               # Interactive Leaflet map
│   ├── MapLegend.tsx         # Color gradient legend for map layers
│   ├── SidePanel.tsx         # Air quality sidebar with pollutant cards
│   ├── MobileHeader.tsx      # Mobile navigation header
│   ├── LightDarkToggle.tsx   # Theme switch
│   └── ThemeProvider.tsx     # Dark/light mode context
│
├── schemas/
│   ├── weatherSchema.ts      # Zod schema for Open-Meteo response
│   ├── airPollutionSchema.ts # Zod schema for air pollution response
│   └── geoCodeSchema.ts     # Zod schema for geocoding response
│
└── utils/
    ├── weatherCode.ts        # WMO weather code → description/icon mapping
    └── weatherHelpers.ts     # Raw API data → formatted data transformer
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An **OpenWeatherMap** API key (free tier works)
- A **MapTiler** API key (free tier works)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Karthikeyanm07/Weather_App.git
   cd Weather_App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```env
   VITE_API_KEY=your_openweathermap_api_key_here
   ```

   > Get your free API key at [openweathermap.org/api](https://openweathermap.org/api)

   > The MapTiler key is currently embedded in `Map.tsx`. For production, move it to `.env` as well.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open **http://localhost:5173** in your browser

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_API_KEY` | OpenWeatherMap API key for geocoding and air pollution data | ✅ Yes |

---

## 🌐 APIs Used

| API | Purpose | Docs |
|---|---|---|
| [Open-Meteo](https://open-meteo.com/) | Weather forecasts (current, hourly, daily) — **No API key required** | [open-meteo.com/en/docs](https://open-meteo.com/en/docs) |
| [OpenWeatherMap](https://openweathermap.org/api) | Geocoding (city → coordinates) and Air Pollution data | [openweathermap.org/api](https://openweathermap.org/api) |
| [OpenWeatherMap Tile Layers](https://openweathermap.org/api/weathermaps) | Weather map overlays (clouds, rain, temp, wind, pressure) | [openweathermap.org/api/weathermaps](https://openweathermap.org/api/weathermaps) |
| [MapTiler](https://www.maptiler.com/) | Dark-themed base map tiles | [maptiler.com/cloud/api](https://www.maptiler.com/cloud/api/) |

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.0 | UI framework |
| `tailwindcss` | ^4.2.1 | Utility-first CSS |
| `@tanstack/react-query` | ^5.90.21 | Server state management & caching |
| `zod` | ^4.3.6 | Runtime schema validation |
| `leaflet` + `react-leaflet` | ^1.9.4 / ^5.0.0-rc.2 | Interactive maps |
| `@maptiler/leaflet-maptilersdk` | ^4.1.1 | Dark map tile layer |
| `lucide-react` | ^0.577.0 | Icon library |
| `radix-ui` + `shadcn` | ^1.4.3 / ^4.0.6 | Accessible UI primitives |
| `clsx` + `tailwind-merge` | ^2.1.1 / ^3.5.0 | Conditional class merging |

---

## ⚠️ Known Issues & Notes

- **Map wrapping clicks**: Clicking on the repeated/wrapped portion of the map could previously send invalid coordinates (longitude > 180°). This has been fixed with coordinate normalization.
- **MapTiler API key**: The MapTiler key is currently hardcoded in `Map.tsx`. For production deployment, move it to an environment variable.
- **OpenWeatherMap Geocoding**: Uses HTTP (`http://`) instead of HTTPS. Some browsers may block mixed content in production — update to `https://` for deployment.
- **React Leaflet RC**: The project uses `react-leaflet@5.0.0-rc.2` (release candidate). Watch for breaking changes when it reaches stable.

---

## 📄 License

This project is open source and available for reference and learning purposes.

---

## 🙏 Credits & Acknowledgements

- **Weather Data**: [Open-Meteo](https://open-meteo.com/) — Free, open-source weather API
- **Air Quality & Geocoding**: [OpenWeatherMap](https://openweathermap.org/) — Free tier API
- **Map Tiles**: [MapTiler](https://www.maptiler.com/) — Beautiful dark map styles
- **Map Engine**: [Leaflet](https://leafletjs.com/) — Open-source JS library for maps
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) — Re-usable components built on Radix UI
- **Icons**: [Lucide](https://lucide.dev/) — Beautiful & consistent icon set
- **Weather Icons**: [Open-Meteo WMO Codes](https://open-meteo.com/en/docs) — Weather condition icons
- **Font**: [Inter](https://rsms.me/inter/) by Rasmus Andersson

---

**Built with ❤️ by [Karthikeyan M](https://github.com/Karthikeyanm07)**
