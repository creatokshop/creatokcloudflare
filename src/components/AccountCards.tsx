import React from "react";
import { ArrowRight } from "lucide-react";

interface AccountCardsProps {
  activeCategory: string;
  rotation: { x: number; y: number };
  onCardClick: (cardType: string) => void;
}

export const AccountCards: React.FC<AccountCardsProps> = ({
  activeCategory,
  rotation,
  onCardClick,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-10 -mb-20">
      {/* US Card */}
      <div
        className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-105"
        style={{
          transform: `perspective(1000px) rotateX(${
            rotation.x * 0.2
          }deg) rotateY(${rotation.y * 0.2}deg)`,
          backgroundImage:
            "linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(236, 72, 153, 0.1))",
        }}
      >
        <div className="flex justify-center mb-4">
          <div>
            <picture>
              <source srcSet="/images/usflagwhite1.avif" type="image/avif" />
              <img 
                src="/images/usflagwhite1.webp" 
                alt="US Logo" 
                className="w-20 h-20"
              />
            </picture>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {activeCategory === "verified"
            ? "US Verified Account"
            : "US Non-Verified Account"}
        </h2>
        <div className="text-gray-300 mb-6 text-left w-full flex flex-col items-center">
          {activeCategory === "verified" ? (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Starting from 5k to 500k followers</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>TikTok Shop for Creator Fully Open</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Creativity Rewards Program included</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Starting from 5k to 500k followers.</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>TikTok Shop for Creator Fully Open</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Creativity Rewards Program included</span>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => onCardClick("US")}
          className="font-bold ml-8 px-2 w-seamless py-2 rounded-lg bg-gradient-to-r from-cyan-800 via-rose-500 to-transparent-500 hover:opacity-90 transition-all flex items-center justify-center"
        >
          <span className="text-white">Order my US account</span>
          <ArrowRight className="ml-1 w-6 h-6" />
        </button>
      </div>
      
      {/* UK Card */}
      <div
        className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:shadow-rose-500/20 hover:scale-105"
        style={{
          transform: `perspective(1000px) rotateX(${
            rotation.x * 0.2
          }deg) rotateY(${rotation.y * 0.2}deg)`,
          backgroundImage:
            "linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(236, 72, 153, 0.1))",
        }}
      >
        <div className="flex justify-center mb-4">
          <div>
            <picture>
              <source srcSet="/images/ukflagwhite1.avif" type="image/avif" />
              <img 
                src="/images/ukflagwhite1.webp" 
                alt="UK Logo" 
                className="w-20 h-20"
              />
            </picture>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {activeCategory === "verified"
            ? "UK Verified Account"
            : "UK Non-Verified Account"}
        </h2>
        <div className="text-gray-300 mb-6 text-left w-full flex flex-col items-center">
          {activeCategory === "verified" ? (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Starting from 5k to 500k followers</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>TikTok Shop for Creator Fully Open</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Creativity Rewards Program included</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Starting from 5k to 500k followers.</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>TikTok Shop for Creator Fully Open</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Creativity Rewards Program included</span>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => onCardClick("UK")}
          className="font-bold ml-8 px-2 w-seamless py-2 rounded-lg bg-gradient-to-r from-cyan-800 via-rose-500 to-transparent-500 hover:opacity-90 transition-all flex items-center justify-center"
        >
          <span className="text-white">Order my UK account</span>
          <ArrowRight className="ml-1 w-6 h-6" />
        </button>
      </div>
      
      {/* EU Card */}
      <div
        className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-105"
        style={{
          transform: `perspective(1000px) rotateX(${
            rotation.x * 0.2
          }deg) rotateY(${rotation.y * 0.2}deg)`,
          backgroundImage:
            "linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(236, 72, 153, 0.1))",
        }}
      >
        <div className="flex justify-center mb-4">
          <div>
            <picture>
              <source srcSet="/images/eulogo.avif" type="image/avif" />
              <img 
                src="/images/eulogo.webp" 
                alt="EU Logo" 
                className="w-20 h-20"
              />
            </picture>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {activeCategory === "verified"
            ? "EU Verified Account"
            : "EU Non-Verified Account"}
        </h2>
        <div className="text-gray-300 mb-6 text-left w-full flex flex-col items-center">
          {activeCategory === "verified" ? (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Accounts from Germany/France</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>TikTok Shop for Creator Fully Open</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Creativity Rewards Program included</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Accounts from Germany/France</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>TikTok Shop for Creator Fully Open</span>
              </div>
              <div className="flex items-center mt-1">
                <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>Creativity Rewards Program included</span>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => onCardClick("EU")}
          className="font-bold ml-8 px-2 w-seamless py-2 rounded-lg bg-gradient-to-r from-cyan-800 via-rose-500 to-transparent-500 hover:opacity-90 transition-all flex items-center justify-center"
        >
          <span className="text-white">Order my EU account</span>
          <ArrowRight className="ml-2 w-6 h-6" />
        </button>
      </div>
    </div>
  );
};