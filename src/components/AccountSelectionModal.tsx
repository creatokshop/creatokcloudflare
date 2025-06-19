import React from "react";
import { X, Star, Shield, Zap, Users } from "lucide-react";

interface AccountOption {
  id: string;
  title: string;
  followers: string;
  price: number;
  verified: boolean;
  isMostSold?: boolean;
}

interface AccountSelectionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRegion: string;
  activeCategory: string;
  onAccountSelect: (accountDetails: AccountOption) => void;
}

export const AccountSelectionModal: React.FC<AccountSelectionModalProps> = ({
  isOpen,
  setIsOpen,
  selectedRegion,
  activeCategory,
  onAccountSelect,
}) => {
  // Account options for each region
  const accountOptions: Record<string, AccountOption[]> = {
    US: [
      { id: 'us-10k-nv', title: 'US 10k Account', followers: '10k', price: 200, verified: false },
      { id: 'us-10k-v', title: 'US 10k Account', followers: '10k', price: 250, verified: true },
      { id: 'us-20k-nv', title: 'US 20k Account', followers: '20k', price: 300, verified: false, isMostSold: true },
      { id: 'us-20k-v', title: 'US 20k Account', followers: '20k', price: 350, verified: true },
      { id: 'us-30k-nv', title: 'US 30k Account', followers: '30k', price: 400, verified: false },
      { id: 'us-30k-v', title: 'US 30k Account', followers: '30k', price: 450, verified: true },
      { id: 'us-40k-nv', title: 'US 40k Account', followers: '40k', price: 475, verified: false },
      { id: 'us-40k-v', title: 'US 40k Account', followers: '40k', price: 500, verified: true },
    ],
    UK: [
      { id: 'uk-10k-nv', title: 'UK 10k Account', followers: '10k', price: 150, verified: false, isMostSold: true },
      { id: 'uk-10k-v', title: 'UK 10k Account', followers: '10k', price: 200, verified: true },
      { id: 'uk-20k-nv', title: 'UK 20k Account', followers: '20k', price: 250, verified: false },
      { id: 'uk-20k-v', title: 'UK 20k Account', followers: '20k', price: 300, verified: true },
      { id: 'uk-30k-nv', title: 'UK 30k Account', followers: '30k', price: 350, verified: false },
      { id: 'uk-30k-v', title: 'UK 30k Account', followers: '30k', price: 400, verified: true },
      { id: 'uk-40k-nv', title: 'UK 40k Account', followers: '40k', price: 425, verified: false },
      { id: 'uk-40k-v', title: 'UK 40k Account', followers: '40k', price: 450, verified: true },
    ],
    EU: [
      { id: 'eu-10k-nv', title: 'EU Account', followers: '10k', price: 200, verified: false },
      { id: 'eu-10k-v', title: 'EU Account', followers: '10k', price: 250, verified: true },
      { id: 'eu-20k-nv', title: 'EU Account', followers: '20k', price: 300, verified: false},
      { id: 'eu-20k-v', title: 'EU Account', followers: '20k', price: 350, verified: true },
      { id: 'eu-30k-nv', title: 'EU Account', followers: '30k', price: 400, verified: false },
      { id: 'eu-30k-v', title: 'EU Account', followers: '30k', price: 450, verified: true },
      { id: 'eu-40k-nv', title: 'EU Account', followers: '40k', price: 475, verified: false },
      { id: 'eu-40k-v', title: 'EU Account', followers: '40k', price: 500, verified: true },
    ],
  };

  // Get logo path for region - updated to use AVIF format
  const getRegionLogo = (region: string) => {
    switch (region) {
      case 'US': return '/images/usflagwhite1.avif';
      case 'UK': return '/images/ukflagwhite1.avif';
      case 'EU': return '/images/eulogo.avif';
      default: return '';
    }
  };

  // Filter accounts based on active category (verified/non-verified)
  const filteredAccounts = accountOptions[selectedRegion]?.filter(account => 
    activeCategory === 'verified' ? account.verified : !account.verified
  ) || [];

  const handleAccountSelect = (account: AccountOption) => {
    onAccountSelect(account);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-xl p-3 sm:p-6 w-full max-w-sm sm:max-w-md my-4 sm:my-8 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-rose-500 p-0.5 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <picture>
                  <source srcSet={getRegionLogo(selectedRegion)} type="image/avif" />
                  <img 
                    src={getRegionLogo(selectedRegion).replace('.avif', '.webp')} 
                    alt={`${selectedRegion} Logo`} 
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                </picture>
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-xl font-bold text-white leading-tight">
                Choose Your {selectedRegion} Account
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                {activeCategory === 'verified' ? 'Verified Accounts' : 'Non-Verified Accounts'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white flex-shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Account List */}
        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
          {filteredAccounts.map((account) => (
            <div
              key={account.id}
              onClick={() => handleAccountSelect(account)}
              className="relative group bg-gray-700 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 border border-gray-600 hover:border-cyan-500/50"
            >
              {/* Most Sold Badge */}
              {account.isMostSold && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center shadow-lg">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 fill-current" />
                  <span className="hidden sm:inline">TOP</span>
                  <span className="sm:hidden">★</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-cyan-500/20 to-rose-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <picture>
                      <source srcSet={getRegionLogo(selectedRegion)} type="image/avif" />
                      <img 
                        src={getRegionLogo(selectedRegion).replace('.avif', '.webp')} 
                        alt={`${selectedRegion} Logo`} 
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                      />
                    </picture>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-sm sm:text-base flex items-center">
                      <span className="truncate">{account.title}</span>
                      {account.verified && (
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 text-cyan-400 flex-shrink-0" />
                      )}
                    </h4>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                      <span>{account.followers} followers</span>
                      {account.verified ? (
                        <span className="text-cyan-400 font-medium">• Verified</span>
                      ) : (
                        <span className="text-gray-500">• Non-Verified</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-lg sm:text-xl font-bold text-cyan-400">
                    ${account.price}
                  </div>
                  <div className="text-xs text-gray-500">USD</div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 sm:pt-3 border-t border-gray-600">
                <div className="flex items-center space-x-1">
                  <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
                  <span className="text-xs">TikTok Shop Ready</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400" />
                  <span className="text-xs">Creator Rewards</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EU Special Note Only */}
        {selectedRegion === 'EU' && (
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-2 sm:p-3 border border-blue-500/30">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0">
                <picture>
                  <source srcSet={getRegionLogo('EU')} type="image/avif" />
                  <img 
                    src={getRegionLogo('EU').replace('.avif', '.webp')} 
                    alt="EU Logo" 
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                </picture>
              </div>
              <p className="text-blue-300 text-xs sm:text-sm leading-tight">
                <strong>EU Region Note:</strong> All EU accounts are sourced from Germany and France
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};