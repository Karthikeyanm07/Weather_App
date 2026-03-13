interface WeatherInfo {
  description: string;
  icon: string; // OWM icon code
}

// Pass isDay to get day/night icon variant
export function getWeatherInfo(code: number, isDay: boolean): WeatherInfo {
  const d = isDay ? "d" : "n";

  const map: Record<number, WeatherInfo> = {
    0:  { description: "Clear Sky",                        icon: `01${d}` },
    1:  { description: "Mainly Clear",                     icon: `01${d}` },
    2:  { description: "Partly Cloudy",                    icon: `02${d}` },
    3:  { description: "Overcast",                         icon: `04${d}` },
    45: { description: "Fog",                              icon: `50${d}` },
    48: { description: "Rime Fog",                         icon: `50${d}` },
    51: { description: "Light Drizzle",                    icon: `09${d}` },
    53: { description: "Moderate Drizzle",                 icon: `09${d}` },
    55: { description: "Dense Drizzle",                    icon: `09${d}` },
    56: { description: "Light Freezing Drizzle",           icon: `09${d}` },
    57: { description: "Heavy Freezing Drizzle",           icon: `09${d}` },
    61: { description: "Slight Rain",                      icon: `10${d}` },
    63: { description: "Moderate Rain",                    icon: `10${d}` },
    65: { description: "Heavy Rain",                       icon: `10${d}` },
    66: { description: "Light Freezing Rain",              icon: `13${d}` },
    67: { description: "Heavy Freezing Rain",              icon: `13${d}` },
    71: { description: "Slight Snowfall",                  icon: `13${d}` },
    73: { description: "Moderate Snowfall",                icon: `13${d}` },
    75: { description: "Heavy Snowfall",                   icon: `13${d}` },
    77: { description: "Snow Grains",                      icon: `13${d}` },
    80: { description: "Slight Rain Showers",              icon: `09${d}` },
    81: { description: "Moderate Rain Showers",            icon: `09${d}` },
    82: { description: "Violent Rain Showers",             icon: `09${d}` },
    85: { description: "Slight Snow Showers",              icon: `13${d}` },
    86: { description: "Heavy Snow Showers",               icon: `13${d}` },
    95: { description: "Thunderstorm",                     icon: `11${d}` },
    96: { description: "Thunderstorm with Slight Hail",    icon: `11${d}` },
    99: { description: "Thunderstorm with Heavy Hail",     icon: `11${d}` },
  };

  return map[code] ?? { description: "Unknown", icon: `01${d}` };
}

// Use this to build the image URL
export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}