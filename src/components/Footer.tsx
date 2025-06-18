import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Instagram,
  MessageCircle,
  ExternalLink,
  Star,
} from "lucide-react";

export const Footer = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    review: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // In a real app, you would send the data to a server here
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      setReviewForm({ name: "", review: "" });
      setRating(0);
    }, 3000);
  };

  return (
    <footer className="py-5 px-3 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span className="text-base font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
                CREATOK
              </span>
            </div>
            <p className="text-gray-400 text-xs">
              Next generation e-commerce experience with TikTok shop for creators
              and creativity rewards program.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-2 text-cyan-400">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 text-xs hover:text-cyan-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/necessary-info"
                  className="text-gray-400 text-xs hover:text-cyan-300 transition-colors"
                >
                  Necessary Info
                </Link>
              </li>
              <li>
                <Link
                  to="/our-products"
                  className="text-gray-400 text-xs hover:text-cyan-300 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 text-xs hover:text-cyan-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-2 text-rose-400">
              Connect With Us
            </h3>
            <div className="flex space-x-2">
              <a
                href="https://www.instagram.com/creatokshop/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-1.5 rounded-full hover:bg-rose-500 hover:bg-opacity-20 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-rose-400" />
              </a>
              <a
                href="https://discord.gg/aUP77dqq5S"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-1.5 rounded-full hover:bg-cyan-500 hover:bg-opacity-20 transition-colors"
                aria-label="Join our Discord server"
              >
                <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
              </a>
              <a
                href="https://t.me/creatokshop"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-1.5 rounded-full hover:bg-rose-500 hover:bg-opacity-20 transition-colors"
                aria-label="Join our Telegram channel"
              >
                <MessageCircle className="w-3.5 h-3.5 text-rose-400" />
              </a>
              <a
                href="https://creatok.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-1.5 rounded-full hover:bg-cyan-500 hover:bg-opacity-20 transition-colors"
                aria-label="Visit our website"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal review form */}
        <div className="border-t border-gray-800 pt-3 pb-2">
          {showThankYou ? (
            <div className="bg-gradient-to-r from-cyan-500 to-rose-500 p-0.5 rounded-lg">
              <div className="bg-gray-800 p-2 rounded text-center">
                <p className="text-white text-xs font-medium">
                  Thank you for your feedback! We appreciate your review.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xs font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
                Share Your Experience
              </h3>
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap items-end gap-2"
              >
                <div className="flex-1 min-w-32">
                  <label className="block text-gray-400 mb-1 text-xs">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={reviewForm.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="flex-1 min-w-32">
                  <label className="block text-gray-400 mb-1 text-xs">
                    Rating
                  </label>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <Star
                          key={index}
                          size={14}
                          className="cursor-pointer transition-colors duration-150"
                          color={
                            ratingValue <= (hoverRating || rating)
                              ? "#FFD700"
                              : "#6B7280"
                          }
                          fill={
                            ratingValue <= (hoverRating || rating)
                              ? "#FFD700"
                              : "none"
                          }
                          onClick={() => setRating(ratingValue)}
                          onMouseEnter={() => setHoverRating(ratingValue)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 md:flex-grow-2 min-w-64">
                  <label className="block text-gray-400 mb-1 text-xs">
                    Review
                  </label>
                  <input
                    type="text"
                    name="review"
                    required
                    placeholder="Write a quick review..."
                    value={reviewForm.review}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-600 to-rose-600 text-white py-1 px-4 text-xs rounded font-medium hover:opacity-90 transition-opacity"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 mt-3 pt-3 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} CREATOK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;