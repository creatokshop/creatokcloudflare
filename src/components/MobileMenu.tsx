import React from "react";
import { Instagram,  MessageCircle, X, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => (
  <div
    className={`fixed inset-0 z-50 transition-all duration-300 ${
      isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
  >
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={() => setIsMenuOpen(false)}
    />

    <div
      className={`absolute right-0 top-0 h-full w-4/5 max-w-xs bg-gray-900 border-l border-rose-500/30 shadow-xl p-6 transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <img
            src="/images/mainlogocreatok.png"
            alt="CREATOK Logo"
            className="w-auto h-8"
          />
        </div>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="space-y-4">
        <Link
          to="/"
          className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/necessary-info"
          className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Necessary Info
        </Link>
        <Link
          to="/our-products"
          className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Our Products
        </Link>
        <Link
          to="/contact"
          className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
      </nav>

      <div className="absolute bottom-8 left-6 right-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-400 mb-3">🔗 Access everything in one place:</p>
        </div>
        
        <div className="space-y-3">
          <a
            href="https://creatok.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-cyan-500 transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm"> Website</span>
          </a>
          
          <a
            href="https://discord.gg/aUP77dqq5S"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-indigo-500 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm"> Discord</span>
          </a>
          
          <a
            href="https://www.instagram.com/creatokshop/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-pink-500 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm"> Instagram</span>
          </a>
          
          <a
            href="https://t.me/creatokshop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-blue-400 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm"> Telegram</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);