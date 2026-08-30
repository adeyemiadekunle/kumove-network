'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const lagosRoute: [number, number][] = [
  [3.3792, 6.5244],
  [3.3881, 6.5074],
  [3.3959, 6.4931],
  [3.4077, 6.4789],
  [3.4215, 6.4692],
];

export function LagosDeliveryMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [3.395, 6.5],
      zoom: 11.8,
      pitch: 25,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on('load', () => {
      map.addSource('kumove-route', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: lagosRoute } },
      });
      map.addLayer({ id: 'route-glow', type: 'line', source: 'kumove-route', paint: { 'line-color': '#b8e65b', 'line-width': 8, 'line-opacity': 0.16, 'line-blur': 4 } });
      map.addLayer({ id: 'route-line', type: 'line', source: 'kumove-route', paint: { 'line-color': '#b8e65b', 'line-width': 2.5, 'line-dasharray': [1.2, 1.2] } });

      lagosRoute.forEach((coordinates, index) => {
        const el = document.createElement('span');
        el.className = `lagos-map-stop ${index === 0 ? 'origin' : index === lagosRoute.length - 1 ? 'destination' : ''}`;
        el.setAttribute('aria-label', index === 0 ? 'Pickup point' : index === lagosRoute.length - 1 ? 'Delivery point' : 'Network stop');
        new mapboxgl.Marker({ element: el }).setLngLat(coordinates).addTo(map);
      });

      const packageEl = document.createElement('span');
      packageEl.className = 'lagos-map-package';
      markerRef.current = new mapboxgl.Marker({ element: packageEl }).setLngLat(lagosRoute[0]).addTo(map);
      let step = 0;
      const move = () => {
        step = (step + 1) % 240;
        const progress = step / 239;
        const segment = Math.min(Math.floor(progress * (lagosRoute.length - 1)), lagosRoute.length - 2);
        const local = progress * (lagosRoute.length - 1) - segment;
        const from = lagosRoute[segment];
        const to = lagosRoute[segment + 1];
        markerRef.current?.setLngLat([from[0] + (to[0] - from[0]) * local, from[1] + (to[1] - from[1]) * local]);
        requestAnimationFrame(move);
      };
      requestAnimationFrame(move);
    });

    return () => {
      markerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div className="network-visual lagos-map" aria-label="Live Mapbox map of Lagos showing an animated KuMove delivery route"><div ref={containerRef} className="lagos-map-canvas" /><div className="network-label">Lagos network / live route</div><div className="network-card"><small>Route health</small><strong>Moving well</strong><span>Pickup → doorstep</span></div></div>;
}
