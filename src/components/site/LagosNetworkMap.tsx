'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const lagosRoute: [number, number][] = [
  [3.3338, 6.6018],
  [3.3447, 6.5928],
  [3.3548, 6.6015],
  [3.3639, 6.6128],
  [3.3744, 6.6025],
];

const stops = [
  { name: 'Business', coordinates: lagosRoute[0] },
  { name: 'KuStop', coordinates: lagosRoute[1] },
  { name: 'KuDriver', coordinates: lagosRoute[3] },
  { name: 'Customer', coordinates: lagosRoute[4] },
];

export function LagosNetworkMap({ className = '' }: { className?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapRef.current || !token) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [3.3515, 6.6018],
      zoom: 13.2,
      attributionControl: false,
      dragRotate: false,
      touchPitch: false,
    });

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

    map.on('load', () => {
      map.addSource('kumove-route', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: lagosRoute } },
      });
      map.addLayer({
        id: 'kumove-route-glow', type: 'line', source: 'kumove-route',
        paint: { 'line-color': '#c8ee45', 'line-width': 8, 'line-opacity': 0.12, 'line-blur': 4 },
      });
      map.addLayer({
        id: 'kumove-route-line', type: 'line', source: 'kumove-route',
        paint: { 'line-color': '#c8ee45', 'line-width': 3, 'line-opacity': 0.9 },
      });

      stops.forEach((stop) => {
        const element = document.createElement('div');
        element.className = 'lagos-map-stop';
        element.setAttribute('aria-label', stop.name);
        new mapboxgl.Marker({ element }).setLngLat(stop.coordinates).addTo(map);
      });

      const moving = document.createElement('div');
      moving.className = 'lagos-map-moving';
      const marker = new mapboxgl.Marker({ element: moving }).setLngLat(lagosRoute[0]).addTo(map);
      let progress = 0;
      let frame = 0;
      const animate = () => {
        progress = (progress + 0.0025) % 1;
        const segment = Math.min(lagosRoute.length - 2, Math.floor(progress * (lagosRoute.length - 1)));
        const localProgress = (progress * (lagosRoute.length - 1)) % 1;
        const from = lagosRoute[segment];
        const to = lagosRoute[segment + 1];
        marker.setLngLat([from[0] + (to[0] - from[0]) * localProgress, from[1] + (to[1] - from[1]) * localProgress]);
        frame = requestAnimationFrame(animate);
      };
      animate();
      map.once('remove', () => cancelAnimationFrame(frame));
    });

    return () => map.remove();
  }, []);

  return (
    <div className={`lagos-map ${className}`} ref={mapRef} role="img" aria-label="Illustrative Kumove delivery route across Lagos">
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="lagos-map-fallback">
          <span>Lagos network / Mapbox</span>
          <strong>Add NEXT_PUBLIC_MAPBOX_TOKEN to show the live map preview.</strong>
        </div>
      )}
      <div className="lagos-map-label">Lagos network / illustrative route</div>
    </div>
  );
}
