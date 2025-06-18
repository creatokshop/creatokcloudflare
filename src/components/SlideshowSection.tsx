import React, { useRef } from "react";

interface Screenshot {
  id: number;
  src: string;
  alt: string;
}

interface SlideshowSectionProps {
  screenshots: Screenshot[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  getVisibleSlides: () => Screenshot[];
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

export const SlideshowSection: React.FC<SlideshowSectionProps> = ({
  screenshots,
  currentSlide,
  setCurrentSlide,
  getVisibleSlides,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}) => {
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Function to render different phone frames
  const PhoneFrame = ({
    children,
    type = "generic", // Can be "iphone16", "samsung", "pixel", "generic"
    index = 0,
  }: {
    children: React.ReactNode;
    type?: string;
    index?: number;
  }) => {
    // Only apply different phone types for desktop/tablet, not for mobile
    if (type === "mobile") {
      // Original phone frame design for mobile view
      return (
        <div className="relative mx-auto">
          {/* Phone Border */}
          <div className="absolute inset-0 bg-gray-800 rounded-3xl transform -translate-x-1 -translate-y-1 z-0"></div>
          <div className="relative bg-black rounded-3xl shadow-xl border-4 border-black p-2 z-10">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20"></div>

            {/* Content */}
            {children}

            {/* Home Button/Bar */}
            <div className="mx-auto mt-3 w-24 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      );
    }

    // For desktop/tablet views, use different phone designs (all in black)
    const phoneTypes = ["iphone16", "samsung", "pixel", "generic"];
    const phoneType =
      type === "generic" ? phoneTypes[index % phoneTypes.length] : type;

    switch (phoneType) {
      case "iphone16":
        return (
          <div className="relative mx-auto">
            {/* iPhone 16 Style - All black */}
            <div className="absolute inset-0 rounded-3xl transform -translate-x-1 -translate-y-1 z-0"></div>
            <div className="relative bg-black rounded-3xl shadow-xl border-4 border-black p-2 z-10">
              {/* Dynamic Island */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-black rounded-full z-20 border border-gray-700"></div>

              {/* Content */}
              {children}

              {/* No home button for iPhone 16 */}
              <div className="mx-auto mt-3 w-32 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        );

      case "samsung":
        return (
          <div className="relative mx-auto">
            {/* Samsung Galaxy Style - All black */}
            <div className="absolute inset-0 rounded-2xl shadow-lg transform -translate-x-1 -translate-y-1 z-0"></div>
            <div className="relative bg-black rounded-2xl shadow-xl border-4 border-black p-2 z-10">
              {/* Punch hole camera */}
              <div className="absolute top-2 right-4 w-2 h-2 bg-black rounded-full z-20 border border-gray-700"></div>

              {/* Content */}
              {children}

              <div className="mx-auto mt-3 w-20 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        );

      case "pixel":
        return (
          <div className="relative mx-auto">
            {/* Google Pixel Style - All black */}
            <div className="absolute inset-0 rounded-xl shadow-lg transform -translate-x-1 -translate-y-1 z-0"></div>
            <div className="relative bg-black rounded-xl shadow-xl border-4 border-black p-2 z-10">
              {/* Pixel camera bar */}
              <div className="absolute top-0 left-1/4 right-1/4 h-2 bg-gray-800 rounded-b-lg z-20"></div>

              {/* Content */}
              {children}

              <div className="mx-auto mt-3 w-24 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        );

      case "generic":
      default:
        return (
          <div className="relative mx-auto">
            {/* Original Generic Phone Frame */}
            <div className="absolute inset-0 bg-gray-800 rounded-3xl shadow-lg transform -translate-x-1 -translate-y-1 z-0"></div>
            <div className="relative bg-black rounded-3xl shadow-xl border-4 border-gray-700 p-2 z-10">
              {/* Notch */}
              <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black rounded-full z-20"></div>

              {/* Content */}
              {children}

              {/* Home Button/Bar */}
              <div className="mx-auto mt-3 w-24 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        );
    }
  };

  // Function to get screenshot title
  const getScreenshotTitle = (id: number) => {
    switch (id) {
      case 1: return "TikTok Shop for Creator Non-Verified";
      case 2: return "US Creativity Rewards Program Verified";
      case 3: return "UK Creativity Rewards Program Non-Verified";
      case 4: return "TikTok Shop for Creator Verified";
      case 5: return "US Creativity Rewards Program Non-Verified";
      case 6: return "US Creativity Rewards Program Verified";
      default: return "";
    }
  };

  return (
    <section 
      className="relative pb-1"
      style={{
        backgroundImage: `url('/images/banner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Gray gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-800 opacity-80"></div>
      
      <div className="container mx-auto -mt-15 text-center px-4 relative z-10">
        <h1 className="py-5 text-2xl sm:text-3xl font-bold mb-5 bg-gradient-to-r from-cyan-600 via-rose-500 to-cyan-600 bg-clip-text text-transparent">
          TikTok Programs Available
        </h1>

        {/* Desktop Infinite Slideshow - hidden on mobile and small tablets */}
        <div className="hidden lg:block relative">
          <div className="mx-4 md:mx-8 lg:mx-12 overflow-hidden">
            <div className="flex justify-center transition-transform duration-500 ease-in-out">
              {getVisibleSlides().map((screenshot, index) => (
                <div
                  key={`${screenshot.id}-${index}`}
                  className="w-36 sm:w-40 md:w-44 lg:w-48 mx-2 sm:mx-3 md:mx-4 lg:mx-5 flex flex-col transition-all duration-300"
                >
                  <PhoneFrame type="generic" index={index}>
                    <div className="overflow-hidden rounded-xl shadow-inner bg-white">
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="w-full h-full object-cover"
                        style={{ transform: "translateY(10px)" }}
                      />
                    </div>
                  </PhoneFrame>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-white">
                    {getScreenshotTitle(screenshot.id)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-5 space-x-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-rose-500" : "bg-gray-500"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Tablet Slideshow - visible on medium screens */}
        <div className="hidden md:block lg:hidden relative max-w-2xl mx-auto">
          <div className="flex justify-center gap-4">
            {[
              currentSlide,
              (currentSlide + 1) % screenshots.length,
              (currentSlide + 2) % screenshots.length,
            ].map((index, i) => (
              <div key={`tablet-${index}`} className="w-1/3">
                <PhoneFrame type="generic" index={i}>
                  <div className="overflow-hidden rounded-xl shadow-inner bg-white">
                    <img
                      src={screenshots[index].src}
                      alt={screenshots[index].alt}
                      className="w-full h-auto object-cover"
                      style={{ transform: "translateY(10px)" }}
                    />
                  </div>
                </PhoneFrame>
                <p className="mt-2 text-sm font-medium bg-gradient-to-r from-cyan-400 via-rose-500 to-cyan-400 bg-clip-text text-transparent">
                  {getScreenshotTitle(screenshots[index].id)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5 space-x-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-rose-500" : "bg-gray-500"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Slideshow - with swipe functionality and phone frame */}
        <div className="md:hidden relative max-w-xs mx-auto">
          {/* Phone Frame - keeping original for mobile view as requested */}
          <PhoneFrame type="mobile">
            {/* Slideshow Content */}
            <div
              ref={slideshowRef}
              className="overflow-hidden rounded-xl touch-pan-y bg-white pt-2"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className="w-full flex-shrink-0 flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="w-full h-auto object-contain"
                        style={{ transform: "translateY(10px)" }}
                        draggable="false"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PhoneFrame>

          {/* Moved caption here - above the dots and below the phone */}
          <div className="mt-2">
            {screenshots.map((screenshot, index) => (
              <div
                key={`text-${index}`}
                className={`text-sm font-medium text-white transition-opacity duration-300 ${
                  currentSlide === index ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {getScreenshotTitle(screenshot.id)}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-3 space-x-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-rose-500" : "bg-gray-500"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-gray-400 text-xs mt-2">
            Swipe left or right to navigate
          </div>
        </div>
      </div>
    </section>
  );
};