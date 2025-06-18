// At the top of your file
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_KEY = import.meta.env.VITE_API_KEY

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { CategorySelector } from "../components/CategorySelector";
import { AccountCards } from "../components/AccountCards";
import { FeaturesSection } from "../components/FeaturesSection";
import { SlideshowSection } from "../components/SlideshowSection";
import ReviewsSection from "../components/ReviewsSection";
import { OrderModal } from "../components/OrderModal";
import { OrderConfirmation } from "../components/OrderConfirmation";
import { NecessaryInfoSection } from "../components/NecessaryInfoSection";
import { usePageLoader } from "../hooks/usePageLoader";
import { PromoSection } from "../components/PromoSection";
import { AccountSelectionModal } from "../components/AccountSelectionModal";

// Define FormData interface to match what OrderModal expects
interface FormData {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  message: string;
  country: string;
  username: string;
  verificationStatus: string;
}

// Define Screenshot interface for the slideshow
interface Screenshot {
  id: number;
  src: string;
  alt: string;
}

// Define AccountOption interface for selected account
interface AccountOption {
  id: string;
  title: string;
  followers: string;
  price: number;
  verified: boolean;
  isMostSold?: boolean;
}

// Define props for the Home component to communicate with App component
interface HomeProps {
  onAppLoaded?: () => void;
  onProgressUpdate?: (progress: number) => void;
  isAppLoading?: boolean;
}

export default function Home({ 
  onAppLoaded = () => {}, 
  onProgressUpdate = () => {},
  isAppLoading = true
}: HomeProps) {
  // State for the category and card selection
  const [activeCategory, setActiveCategory] = useState("non-verified");
  const [orderModal, setOrderModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  // New state for account selection modal
  const [accountSelectionModal, setAccountSelectionModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountOption | null>(null);

  // New state for confirmation message
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState<'success' | 'error'>('success');

  // Form data state directly in the Home component
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
    message: "",
    country: "",
    username: "",
    verificationStatus: "",
  });

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Updated screenshots array with image paths from second file - use useMemo to prevent recreation
  const screenshots: Screenshot[] = useMemo(() => [
    { id: 1, src: "/images/img1.avif", alt: "TikTok Screenshot 1" },
    { id: 2, src: "/images/img2.avif", alt: "TikTok Screenshot 2" },
    { id: 3, src: "/images/img5.avif", alt: "TikTok Screenshot 3" },
    { id: 4, src: "/images/img6.avif", alt: "TikTok Screenshot 4" },
    { id: 5, src: "/images/img7.avif", alt: "TikTok Screenshot 5" },
    { id: 6, src: "/images/img8.avif", alt: "TikTok Screenshot 6" },
  ], []);

  // Region logos to preload alongside screenshots
  const regionLogos = useMemo(() => [
    '/images/usflagwhite1.avif',
    '/images/ukflagwhite1.avif',
    '/images/eulogo.avif',
    '/images/usflagwhite1.webp',
    '/images/ukflagwhite1.webp',
    '/images/eulogo.webp',
  ], []);
  
  // Banner image - add this as a high priority preload item
  const bannerImage = useMemo(() => '/images/banner.avif', []);
  
  // Use our custom hook to manage loading - combine banner, screenshots and region logos
  const resources = useMemo(() => [
    bannerImage, // Load banner first for better perceived performance
    ...screenshots.map(screenshot => screenshot.src),
    ...regionLogos
  ], [bannerImage, screenshots, regionLogos]);
  
  const { isLoading, progress } = usePageLoader(resources, 3000);

  // FIXED: Separate the loading logic and remove function dependencies
  useEffect(() => {
    if (!initialLoad) {
      // On subsequent loads, skip the full loading process
      onProgressUpdate(100);
      onAppLoaded();
      return;
    }

    onProgressUpdate(progress);
  }, [progress, initialLoad]); // Removed function dependencies

  // FIXED: Separate useEffect for completion logic
  useEffect(() => {
    if (!isLoading && isAppLoading && initialLoad) {
      setInitialLoad(false);
      onAppLoaded();
    }
  }, [isLoading, isAppLoading, initialLoad]); // Removed function dependencies

  // FIXED: Use useCallback to stabilize form handler
  const handleFormChange = useCallback((
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // FIXED: Use useCallback to stabilize reset function
  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      contactMethod: "",
      message: "",
      country: "",
      username: "",
      verificationStatus: "",
    });
  }, []);

  // FIXED: Use useCallback for card click handler
  const handleCardClick = useCallback((cardType: string) => {
    setSelectedCard(cardType);
    setAccountSelectionModal(true);
  }, []);

  // FIXED: Use useCallback for account selection handler
  const handleAccountSelect = useCallback((accountDetails: AccountOption) => {
    setSelectedAccount(accountDetails);
    setAccountSelectionModal(false);
    
    // Pre-populate form data with account selection
    let countryValue = "";
    switch (selectedCard) {
      case "UK":
        countryValue = "United Kingdom";
        break;
      case "US":
        countryValue = "United States";
        break;
      case "EU":
        countryValue = "Germany/France";
        break;
    }
    
    const verificationValue = activeCategory === "verified" ? "Verified" : "Non-Verified";
    
    // Update form data with selected account details
    setFormData(prev => ({
      ...prev,
      country: countryValue,
      verificationStatus: verificationValue,
      message: `Selected Account: ${accountDetails.title} (${accountDetails.followers} followers) - $${accountDetails.price}`
    }));
    
    // Open the order modal
    setOrderModal(true);
  }, [selectedCard, activeCategory]);

  // When the modal opens, pre-set the country and verification status (keep existing logic for fallback)
  useEffect(() => {
    if (orderModal && !selectedAccount) {
      let countryValue = "";
      switch (selectedCard) {
        case "UK":
          countryValue = "United Kingdom";
          break;
        case "US":
          countryValue = "United States";
          break;
        case "EU":
          countryValue = "Germany/France";
          break;
      }
      
      const verificationValue = activeCategory === "verified" ? "Verified" : "Non-Verified";
      
      // Update form data once when modal opens
      setFormData(prev => ({
        ...prev,
        country: countryValue,
        verificationStatus: verificationValue
      }));
    }
  }, [orderModal, selectedCard, activeCategory, selectedAccount]);

  // Touch handlers for mobile slideshow - use useCallback
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50;
    if (swipeDistance > minSwipeDistance) goToPrevSlide();
    else if (swipeDistance < -minSwipeDistance) goToNextSlide();
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  }, [screenshots.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  }, [screenshots.length]);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 7000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  // Handle 3D rotation effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      setRotation({ x: y, y: x });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // FIXED: Use useCallback for submit handler
  const handleSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Prepare data for the API
      const orderData = {
        ...data,
        selectedCard, // Include the selected card type
        selectedAccount: selectedAccount ? {
          id: selectedAccount.id,
          title: selectedAccount.title,
          followers: selectedAccount.followers,
          price: selectedAccount.price,
          verified: selectedAccount.verified
        } : null
      };

      console.log("Submitting order to API:", orderData);
      
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': API_KEY // Add the API key here
        },
        body: JSON.stringify(orderData),
      });
      
      // Parse the JSON response
      const result = await response.json();

      // Handle the response
      if (result.success) {
        // Show success confirmation instead of alert
        setConfirmationStatus('success');
        setShowConfirmation(true);
        resetForm();
        setSelectedAccount(null); // Reset selected account
        setOrderModal(false);
      } else {
        // Show error confirmation instead of alert
        setConfirmationStatus('error');
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Show error confirmation instead of alert
      setConfirmationStatus('error');
      setShowConfirmation(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedCard, selectedAccount, resetForm]);

  // Handler for closing the confirmation - use useCallback
  const handleCloseConfirmation = useCallback(() => {
    setShowConfirmation(false);
    // If it was an error, keep the modal open
    // Otherwise, it's already closed
  }, []);

  // Get visible slides for the desktop carousel effect - use useCallback
  const getVisibleSlides = useCallback(() => {
    const visibleSlides = [];
    const totalSlides = screenshots.length;
    for (let i = -3; i <= 2; i++) {
      let index = (currentSlide + i + totalSlides) % totalSlides;
      visibleSlides.push(screenshots[index]);
    }
    return visibleSlides;
  }, [currentSlide, screenshots]);

  // FIXED: Stabilize rotation object with useMemo
  const stableRotation = useMemo(() => rotation, [rotation.x, rotation.y]);

  return (
    <div>
      <section 
        className="py-20 px-4 relative -mb-12"
        style={{
          backgroundImage: `url('${bannerImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Gray gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-80"></div>
        
        {/* Main content container */}
        <div className="container mx-auto -mt-10 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-rose-500 to-cyan-600 bg-clip-text text-transparent">
            TIKTOK THE FUTURE OF E-COMMERCE
          </h1>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Choose between verified or non-verified accounts
          </p>

          <CategorySelector
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <AccountCards
            activeCategory={activeCategory}
            rotation={stableRotation}
            onCardClick={handleCardClick}
          />
        </div>
      </section>

      <FeaturesSection />
      <SlideshowSection
        screenshots={screenshots}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        getVisibleSlides={getVisibleSlides}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
      />
      <PromoSection />
      <NecessaryInfoSection />
      {/* <PaymentMethods /> */}
      <ReviewsSection />
      
      {/* Account Selection Modal */}
      <AccountSelectionModal
        isOpen={accountSelectionModal}
        setIsOpen={setAccountSelectionModal}
        selectedRegion={selectedCard}
        activeCategory={activeCategory}
        onAccountSelect={handleAccountSelect}
      />
      
      {/* Order Modal */}
      <OrderModal
        orderModal={orderModal}
        setOrderModal={setOrderModal}
        formData={formData}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        selectedCard={selectedCard}
        activeCategory={activeCategory}
        isSubmitting={isSubmitting}
        selectedAccount={selectedAccount}
      />
      
      {/* Order Confirmation */}
      <OrderConfirmation
        isVisible={showConfirmation}
        status={confirmationStatus}
        onClose={handleCloseConfirmation}
      />
    </div>
  );
}