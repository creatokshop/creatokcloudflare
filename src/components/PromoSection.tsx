import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PromoSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/bannerdiscordfinal.png";
    img.onload = () => {
      setIsLoaded(true);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative py-8 md:py-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs matching Home component colors */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 md:w-64 md:h-64 bg-gradient-to-r from-cyan-600/20 to-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 md:w-56 md:h-56 bg-gradient-to-r from-rose-500/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Content Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-600/10 to-rose-500/10 border border-cyan-500/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-cyan-300 text-sm font-medium">Next-Gen Social Commerce</span>
              </div>

              {/* Main Heading - matching Home component gradient */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-200 to-cyan-200 bg-clip-text text-transparent">
                  Elevate Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-600 via-rose-500 to-cyan-600 bg-clip-text text-transparent">
                  Life with Creatok
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Transform your social media presence with monetized TikTok accounts. 
                <span className="text-cyan-300 font-semibold"> Step into the future of e-commerce</span> with 
                TikTok Shop ready accounts that drive real results.
              </p>

              {/* Stats - Mobile optimized */}
              <div className="flex justify-center lg:justify-start space-x-4 md:space-x-6 py-4">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-white">1K+</div>
                  <div className="text-xs text-gray-400">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-white">99%</div>
                  <div className="text-xs text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              </div>

              {/* CTA Buttons - Mobile optimized */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={scrollToTop}
                  className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-cyan-600 to-rose-500 rounded-xl font-bold text-sm md:text-base text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                >
                  Get Started Today
                </button>

                <Link
                  to="/contact"
                  onClick={() => {
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                      });
                    }, 100);
                  }}
                  className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl border-2 border-white/20 font-bold text-sm md:text-base text-white transition-all duration-300 hover:border-cyan-400 hover:bg-white/5 hover:shadow-lg backdrop-blur-sm"
                >
                  <span className="hover:text-cyan-300 transition-colors duration-300">Learn More</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section - Mobile optimized */}
          <div className="mt-4 lg:mt-0 order-1 lg:order-2">
            <div className="relative">
              {/* Glow effect behind image - matching colors */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-rose-500/30 blur-2xl rounded-2xl transform rotate-3"></div>
              
              {/* Image container */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-2 md:p-4 border border-white/20">
                {isLoaded ? (
                  <img
                    src="/images/bannerdiscordfinal.png"
                    alt="TikTok Shop Creator Dashboard"
                    className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-32 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 md:w-12 md:h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Floating elements around image - matching colors */}
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-3 h-3 md:w-6 md:h-6 bg-gradient-to-r from-cyan-400 to-rose-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-2 h-2 md:w-4 md:h-4 bg-gradient-to-r from-rose-400 to-cyan-500 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};