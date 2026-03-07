"use client";

import { GoogleMapsProvider } from "./google-maps-provider";
import { PahunaMap } from "./pahuna-map";
import { PahunaMarker } from "./pahuna-marker";
import { SURKHET_CENTER, ZOOM } from "./map-constants";

/**
 * Contact page map — shows Pahuna office location in Birendranagar.
 */
export function ContactMapSection() {
  return (
    <GoogleMapsProvider>
      <PahunaMap
        center={SURKHET_CENTER}
        zoom={ZOOM.detail}
        className="w-full h-[400px] rounded-2xl overflow-hidden"
        fallbackLabel="Birendranagar, Surkhet — Karnali Province, Nepal"
      >
        <PahunaMarker position={SURKHET_CENTER} title="Pahuna — Birendranagar">
          <div className="p-2">
            <p className="font-semibold text-sm">Pahuna</p>
            <p className="text-xs text-slate-500">Birendranagar, Surkhet</p>
          </div>
        </PahunaMarker>
      </PahunaMap>
    </GoogleMapsProvider>
  );
}
