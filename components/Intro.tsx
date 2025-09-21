"use client";

import { Volume2 } from "lucide-react";

export default function FeatureDisplay() {
  return (
    <section className="w-200 bg-gradient-to-br from-green-700 via-blue-500 to-red-500 py-16 px-6 text-white rounded-3xl mb-40">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        
        {/* Icon */}
        <div className="flex-shrink-0 p-6 bg-white/10 rounded-2xl shadow-lg">
          <Volume2 className="w-16 h-16" />
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Transform Text into Speech</h2>
          <p className="text-lg leading-relaxed text-black">
            Our app makes it easy to convert written text into natural, 
            lifelike speech. Whether for accessibility, productivity, or 
            creativity, you can generate high-quality audio in seconds 
            with just a few clicks.
          </p>
        </div>
      </div>
    </section>
  );
}
