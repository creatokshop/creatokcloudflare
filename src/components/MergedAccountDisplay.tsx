import React from "react";
import { Star, Shield, Zap, Users } from "lucide-react";

interface AccountOption {
  id: string;
  title: string;
  followers: string;
  price: number;
  verified: boolean;
  isMostSold?: boolean;
  region: string;
}

interface MergedAccountDisplayProps {
  activeCategory: string;
  rotation: { x: number; y: number };
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
  setSelectedAccount?: React.Dispatch<React.SetStateAction<AccountOption | null>>;
}

export const MergedAccountDisplay: React.FC<MergedAccountDisplayProps> = ({
  activeCategory,
  setOrderModal,
  setSelectedCard,
  setSelectedAccount,
}) => {
  // All account options from all regions
  const allAccountOptions: AccountOption[] = [
    // US Accounts
    { id: 'us-10k-nv', title: 'US 10k Account', followers: '10k', price: 200, verified: false, region: 'US' },
    { id: 'us-10k-v', title: 'US 10k Account', followers: '10k', price: 250, verified: true, region: 'US' },
    { id: 'us-20k-nv', title: 'US 20k Account', followers: '20k', price: 300, verified: false, isMostSold: true, region: 'US' },
    { id: 'us-20k-v', title: 'US 20k Account', followers: '20k', price: 350, verified: true, region: 'US' },
    { id: 'us-30k-nv', title: 'US 30k Account', followers: '30k', price: 400, verified: false, region: 'US' },
    { id: 'us-30k-v', title: 'US 30k Account', followers: '30k', price: 450, verified: true, region: 'US' },
    { id: 'us-40k-nv', title: 'US 40k Account', followers: '40k', price: 475, verified: false, region: 'US' },
    { id: 'us-40k-v', title: 'US 40k Account', followers: '40k', price: 500, verified: true, region: 'US' },
    
    // UK Accounts
    { id: 'uk-10k-nv', title: 'UK 10k Account', followers: '10k', price: 150, verified: false, isMostSold: true, region: 'UK' },
    { id: 'uk-10k-v', title: 'UK 10k Account', followers: '10k', price: 200, verified: true, region: 'UK' },
    { id: 'uk-20k-nv', title: 'UK 20k Account', followers: '20k', price: 250, verified: false, region: 'UK' },
    { id: 'uk-20k-v', title: 'UK 20k Account', followers: '20k', price: 300, verified: true, region: 'UK' },
    { id: 'uk-30k-nv', title: 'UK 30k Account', followers: '30k', price: 350, verified: false, region: 'UK' },
    { id: 'uk-30k-v', title: 'UK 30k Account', followers: '30k', price: 400, verified: true, region: 'UK' },
    { id: 'uk-40k-nv', title: 'UK 40k Account', followers: '40k', price: 425, verified: false, region: 'UK' },
    { id: 'uk-40k-v', title: 'UK 40k Account', followers: '40k', price: 450, verified: true, region: 'UK' },
    
    // EU Accounts
    { id: 'eu-10k-nv', title: 'EU Account', followers: '10k', price: 200, verified: false, region: 'EU' },
    { id: 'eu-10k-v', title: 'EU Account', followers: '10k', price: 250, verified: true, region: 'EU' },
    { id: 'eu-20k-nv', title: 'EU Account', followers: '20k', price: 300, verified: false, region: 'EU' },
    { id: 'eu-20k-v', title: 'EU Account', followers: '20k', price: 350, verified: true, region: 'EU' },
    { id: 'eu-30k-nv', title: 'EU Account', followers: '30k', price: 400, verified: false, region: 'EU' },
    { id: 'eu-30k-v', title: 'EU Account', followers: '30k', price: 450, verified: true, region: 'EU' },
    { id: 'eu-40k-nv', title: 'EU Account', followers: '40k', price: 475, verified: false, region: 'EU' },
    { id: 'eu-40k-v', title: 'EU Account', followers: '40k', price: 500, verified: true, region: 'EU' },
  ];

  // Get logo path for region
  const getRegionLogo = (region: string) => {
    switch (region) {
      case 'US': return '/images/usflagwhite1.avif';
      case 'UK': return '/images/ukflagwhite1.avif';
      case 'EU': return '/images/eulogo.avif';
      default: return '';
    }
  };

  // Filter accounts based on active category (verified/non-verified)
  const filteredAccounts = allAccountOptions.filter(account => 
    activeCategory === 'verified' ? account.verified : !account.verified
  );

  // Group accounts by region for better organization
  const groupedAccounts = filteredAccounts.reduce((acc, account) => {
    if (!acc[account.region]) {
      acc[account.region] = [];
    }
    acc[account.region].push(account);
    return acc;
  }, {} as Record<string, AccountOption[]>);

  const handleAccountSelect = (account: AccountOption) => {
    setSelectedCard(account.region);
    if (setSelectedAccount) {
      setSelectedAccount(account);
    }
    setOrderModal(true);
  };

  return (
    <div className="w-full -mb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          {activeCategory === 'verified' ? 'Verified' : 'Non-Verified'} TikTok Accounts
        </h2>
        <p className="text-gray-400">
          Choose from our premium collection of TikTok accounts across different regions
        </p>
      </div>

      {/* Display accounts grouped by region */}
      {Object.entries(groupedAccounts).map(([region, accounts]) => (
        <div key={region} className="mb-12">
          {/* Region Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3 bg-gray-800/50 rounded-full px-6 py-3 border border-gray-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-rose-500 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <picture>
                    <source srcSet={getRegionLogo(region)} type="image/avif" />
                    <img 
                      src={getRegionLogo(region).replace('.avif', '.webp')} 
                      alt={`${region} Logo`} 
                      className="w-4 h-4 object-contain"
                    />
                  </picture>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">
                {region === 'US' ? 'United States' : region === 'UK' ? 'United Kingdom' : 'European Union'}
              </h3>
            </div>
          </div>

          {/* Accounts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => handleAccountSelect(account)}
                className="relative group bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-700/80 border border-gray-700 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Most Sold Badge */}
                {account.isMostSold && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-lg z-10">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    MOST SOLD
                  </div>
                )}

                {/* Account Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-rose-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <picture>
                        <source srcSet={getRegionLogo(region)} type="image/avif" />
                        <img 
                          src={getRegionLogo(region).replace('.avif', '.webp')} 
                          alt={`${region} Logo`} 
                          className="w-5 h-5 object-contain"
                        />
                      </picture>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg flex items-center">
                        {account.title}
                        {account.verified && (
                          <Shield className="w-4 h-4 ml-2 text-cyan-400" />
                        )}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Followers Info */}
                <div className="flex items-center space-x-2 mb-4 text-gray-300">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">{account.followers} followers</span>
                  {account.verified ? (
                    <span className="text-cyan-400 font-medium">• Verified</span>
                  ) : (
                    <span className="text-gray-500">• Non-Verified</span>
                  )}
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-cyan-400">
                    ${account.price}
                  </div>
                  <div className="text-sm text-gray-500">USD</div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>TikTok Shop Ready</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Star className="w-4 h-4 text-rose-400" />
                    <span>Creator Rewards Eligible</span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-rose-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* EU Special Note */}
          {region === 'EU' && (
            <div className="mt-6 max-w-2xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                  <picture>
                    <source srcSet={getRegionLogo('EU')} type="image/avif" />
                    <img 
                      src={getRegionLogo('EU').replace('.avif', '.webp')} 
                      alt="EU Logo" 
                      className="w-3 h-3 object-contain"
                    />
                  </picture>
                </div>
                <p className="text-blue-300 text-sm">
                  <strong>EU Region Note:</strong> All EU accounts are sourced from Germany and France
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};