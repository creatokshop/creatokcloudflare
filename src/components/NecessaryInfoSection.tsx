import React from "react";
import {
  Shield,
  Globe,
  Check,
  ArrowRight,
  FileCheck,
  MessageCircle,
  Info,
} from "lucide-react";

export const NecessaryInfoSection: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 via-rose-500 to-cyan-400 bg-clip-text text-transparent">
          Important Information
        </h2>
        <div className=" rounded-xl p-6 sm:p-8 shadow-lg border border-white-500/20 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-rose-500" />
                Account Security
              </h3>
              <p className="text-gray-300">
                All accounts come with secure login credentials. We recommend
                changing the password immediately after receiving your account
                and enabling two-factor authentication for added security.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-cyan-500" />
                Regional Restrictions
              </h3>
              <p className="text-gray-300">
                Accounts are region-locked to their respective countries (US,
                UK, or EU). For optimal performance, use a VPN matching your
                account's region when accessing TikTok features.
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                Verified Account Benefits
              </h3>
              <p className="text-gray-300">
                Choosing a verified account option includes our proprietary APK
                that allows remote access from anywhere in the world without
                regional restrictions. This custom application bypasses TikTok's
                location checks while maintaining all verification benefits.
              </p>
              <ul className="mt-3 space-y-2 text-gray-300 grid md:grid-cols-2 gap-2">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-rose-500" />
                  <span>
                    Includes custom APK installer with detailed setup
                    instructions
                  </span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-rose-500" />
                  <span>
                    Maintains verification status regardless of physical
                    location
                  </span>
                </li>
                <li className="flex items-start md:col-span-2">
                  <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-rose-500" />
                  <span>Regular updates to ensure continued functionality</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <FileCheck className="w-5 h-5 mr-2 text-yellow-500" />
                Account Transfer Process
              </h3>
              <p className="text-gray-300">
                After purchase, you'll receive detailed instructions for account
                transfer. The process typically takes 24-48 hours to complete.
                Verified accounts may require additional setup time for APK
                configuration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-cyan-500" />
                Support Information
              </h3>
              <p className="text-gray-300">
                Our team provides 7-day support for all account transfers.
                Extended support packages are available for verified accounts,
                including APK maintenance and troubleshooting.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-500" />
                Account Customization
              </h3>
              <p className="text-gray-300">
                All accounts are pre-loaded with basic profile information and
                content preferences based on your order specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NecessaryInfoSection;