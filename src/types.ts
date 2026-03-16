declare global {
  interface Window {
    _lastMapClick?: number;
  }
}

export type Coords = {
    lat: number
    lon: number
}