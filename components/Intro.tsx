"use client";

import { Volume2 } from "lucide-react";

export default function FeatureDisplay() {
  return (
    <section className="w-full bg-gradient-to-br from-green-700 via-blue-500 to-red-500 py-12 sm:py-16 px-4 sm:px-6 text-white rounded-3xl mb-20 sm:mb-40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        
        {/* Icon */}
        <div className="flex-shrink-0 p-5 sm:p-6 bg-white/10 rounded-2xl shadow-lg">
          <Volume2 className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Transform Text into Speech</h2>
          <p className="text-base sm:text-lg leading-relaxed text-black">
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
