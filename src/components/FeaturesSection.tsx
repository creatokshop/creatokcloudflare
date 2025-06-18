import React from "react";
import {
  Check,
  MapPin,
  MessageCircle,
  ArrowRight,
  FileCheck,
} from "lucide-react";

export const FeaturesSection: React.FC = () => (
  <section 
    className="py-5 px-4 relative -mb-8"
    style={{
      backgroundImage: `url('/images/banner.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    {/* Gray gradient overlay */}
    <div className="absolute inset-0 bg-gray-800 opacity-80"></div>
    
    <div className="container mx-auto relative z-10">
      <h2 className="py-2 text-3xl mb-1 mt-10 font-bold text-center bg-gradient-to-r from-cyan-400 via-rose-500 to-cyan-400 bg-clip-text text-transparent">
        How It Works
      </h2>
      {/* Modified grid to be 1 column on mobile, 3 columns on tablets, and 5 columns on larger screens */}
      <div className="max-w-md mx-auto sm:max-w-none grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mt-6">
        {/* Step 1 */}
        <div className="p-4 sm:p-6 relative">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-rose-500 p-3 rounded-full">
              <Check className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">
            Verification
          </h3>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Choose between non-verified and verified tiktok accounts.
          </p>
          <div className="hidden sm:block lg:hidden absolute right-0 top-1/2 -mt-3 -mr-4 z-10 text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="hidden lg:flex absolute right-0 top-1/2 -mt-3 -mr-4 z-10 text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 sm:p-6 relative">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-rose-500 to-cyan-500 p-3 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">
            Account Region
          </h3>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Choose between 2 regional options US/UK tiktok accounts.
          </p>
          <div className="hidden sm:block lg:hidden absolute right-0 top-1/2 -mt-3 -mr-4 z-10 text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="hidden lg:flex absolute right-0 top-1/2 -mt-3 -mr-4 z-10 text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 sm:p-6 relative">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-rose-500 p-3 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">
            Order now
          </h3>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Fill in your contact information and your specific requirements for
            the account and click Submit.
          </p>
          <div className="hidden sm:hidden lg:flex absolute right-0 top-1/2 -mt-3 -mr-4 z-10 text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
          {/* Added down arrow for tablet view to show progression to next row */}
          <div className="hidden sm:flex lg:hidden absolute left-1/2 bottom-0 -mb-4 -ml-3 z-10 text-white">
            <ArrowRight className="w-6 h-6 transform rotate-90" />
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-4 sm:p-6 relative">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-rose-500 to-cyan-700 p-3 rounded-full">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">
            Connection
          </h3>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            You will be contacted on your prefered contact method within a few
            hours.
          </p>
          <div className="hidden lg:flex absolute right-0 top-1/2 -mt-3 -mr-4 z-10 text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="hidden sm:flex lg:hidden absolute right-0 top-1/2 -mt-3 -mr-4 z-10 text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

        {/* Step 5 */}
        <div className="p-4 sm:p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-rose-500 p-3 rounded-full">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">
            Finalization
          </h3>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Fulfillment of TikTok Account and Completion of Payment.
          </p>
        </div>
      </div>
    </div>
  </section>
);