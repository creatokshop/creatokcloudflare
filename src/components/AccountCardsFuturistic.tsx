import React from "react";
import { ArrowRight } from "lucide-react";

interface AccountCardsProps {
  activeCategory: string;
  rotation: { x: number; y: number };
  onCardClick: (cardType: string) => void;
}

type CardConfig = {
  key: "US" | "UK" | "EU";
  label: string;
  titleVerified: string;
  titleNonVerified: string;
  featuresVerified: string[];
  featuresNonVerified: string[];
  image: { avif: string; webp: string; alt: string };
  hoverShadow: string;
};

const CARD_CONFIG: readonly CardConfig[] = [
  {
    key: "US",
    label: "US",
    titleVerified: "US Verified Account",
    titleNonVerified: "US Non-Verified Account",
    featuresVerified: [
      "Starting from 5k to 500k followers",
      "TikTok Shop for Creator Fully Open",
      "Creativity Rewards Program included",
    ],
    featuresNonVerified: [
      "Starting from 5k to 500k followers.",
      "TikTok Shop for Creator Fully Open",
      "Creativity Rewards Program included",
    ],
    image: {
      avif: "/images/usflagwhite1.avif",
      webp: "/images/usflagwhite1.webp",
      alt: "US Logo",
    },
    hoverShadow: "hover:shadow-cyan-500/20",
  },
  {
    key: "UK",
    label: "UK",
    titleVerified: "UK Verified Account",
    titleNonVerified: "UK Non-Verified Account",
    featuresVerified: [
      "Starting from 5k to 500k followers",
      "TikTok Shop for Creator Fully Open",
      "Creativity Rewards Program included",
    ],
    featuresNonVerified: [
      "Starting from 5k to 500k followers.",
      "TikTok Shop for Creator Fully Open",
      "Creativity Rewards Program included",
    ],
    image: {
      avif: "/images/ukflagwhite1.avif",
      webp: "/images/ukflagwhite1.webp",
      alt: "UK Logo",
    },
    hoverShadow: "hover:shadow-rose-500/20",
  },
  {
    key: "EU",
    label: "EU",
    titleVerified: "EU Verified Account",
    titleNonVerified: "EU Non-Verified Account",
    featuresVerified: [
      "Accounts from Germany/France",
      "TikTok Shop for Creator Fully Open",
      "Creativity Rewards Program included",
    ],
    featuresNonVerified: [
      "Accounts from Germany/France",
      "TikTok Shop for Creator Fully Open",
      "Creativity Rewards Program included",
    ],
    image: { avif: "/images/eulogo.avif", webp: "/images/eulogo.webp", alt: "EU Logo" },
    hoverShadow: "hover:shadow-cyan-500/20",
  },
] as const;

export const AccountCardsFuturistic: React.FC<AccountCardsProps> = ({
  activeCategory,
  rotation,
  onCardClick,
}) => {
  const rotationTransform = `perspective(1000px) rotateX(${rotation.x * 0.2}deg) rotateY(${rotation.y * 0.2}deg)`;

  return (
    <div className="-mb-20 grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {CARD_CONFIG.map((card) => {
        const isVerified = activeCategory === "verified";
        const title = isVerified ? card.titleVerified : card.titleNonVerified;
        const features = isVerified ? card.featuresVerified : card.featuresNonVerified;

        return (
          <div key={card.key} className="group relative w-full max-w-sm">
            {/* Gradient glow border */}
            <div
              className={`absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/40 via-rose-500/40 to-transparent opacity-60 blur transition duration-500 ${card.hoverShadow} group-hover:opacity-100`}
            />

            {/* Card */}
            <div
              className={`relative rounded-2xl bg-gray-800/70 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-md transform transition-all duration-300 ${card.hoverShadow} group-hover:scale-[1.02]`}
              style={{
                transform: rotationTransform,
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(6, 182, 212, 0.08), rgba(236, 72, 153, 0.08))",
              }}
            >
              {/* Country badge */}
              <div className="absolute right-4 top-4">
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10 backdrop-blur">
                  {card.label}
                </span>
              </div>

              {/* Icon */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur">
                <picture>
                  <source srcSet={card.image.avif} type="image/avif" />
                  <img src={card.image.webp} alt={card.image.alt} className="h-16 w-16" />
                </picture>
              </div>

              {/* Title */}
              <h3 className="mb-4 text-center text-2xl font-bold text-white">{title}</h3>

              {/* Features */}
              <div className="mb-6 w-full text-left text-gray-300">
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <ArrowRight className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => onCardClick(card.key)}
                className="font-bold ml-8 px-2 w-seamless py-2 rounded-lg bg-gradient-to-r from-cyan-800 via-rose-500 to-transparent-500 hover:opacity-90 transition-all flex items-center justify-center"
              >
                <span className="text-white">{`Order my ${card.key} account`}</span>
                <ArrowRight className="ml-1 w-6 h-6" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

