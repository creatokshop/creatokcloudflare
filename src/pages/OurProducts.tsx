const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_KEY = import.meta.env.VITE_API_KEY

import { useState, useEffect} from "react";
import { CategorySelector } from "../components/CategorySelector";
import { MergedAccountDisplay } from "../components/MergedAccountDisplay";
import { OrderModal } from "../components/OrderModal";
import { OrderConfirmation } from "../components/OrderConfirmation";
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

// Define AccountOption interface
interface AccountOption {
  id: string;
  title: string;
  followers: string;
  price: number;
  verified: boolean;
  isMostSold?: boolean;
  region: string;
}

interface OurProductsProps {
  onAppLoaded?: () => void;
}

export default function Home({ onAppLoaded = () => {} }: OurProductsProps) {
  useEffect(() => {
    // Simulate loading if needed, or use actual loading logic
    const timer = setTimeout(() => {
      onAppLoaded();
    }, 1000); // Adjust timing as needed
    
    return () => clearTimeout(timer);
  }, [onAppLoaded]);

  // State for the category and card selection
  const [activeCategory, setActiveCategory] = useState("non-verified");
  const [orderModal, setOrderModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<AccountOption | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state for tracking submission status
  
  // New state for confirmation message
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState<'success' | 'error'>('success');

  // Form data state
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

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Updated screenshots array with proper image paths
  const screenshots: Screenshot[] = [
    { id: 1, src: "/images/img1.avif", alt: "TikTok Screenshot 1" },
    { id: 2, src: "/images/img2.avif", alt: "TikTok Screenshot 2" },
    { id: 3, src: "/images/img5.avif", alt: "TikTok Screenshot 3" },
    { id: 4, src: "/images/img6.avif", alt: "TikTok Screenshot 4" },
    { id: 5, src: "/images/img7.avif", alt: "TikTok Screenshot 5" },
    { id: 6, src: "/images/img8.avif", alt: "TikTok Screenshot 6" },
  ];

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
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
  };

  // When the modal opens, pre-set the country, verification status, and message
  useEffect(() => {
    if (orderModal && selectedAccount) {
      let countryValue = "";
      switch (selectedAccount.region) {
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
      
      const verificationValue = selectedAccount.verified ? "Verified" : "Non-Verified";
      
      // Create the auto-populated message with account details
      const autoMessage = `Selected Account: ${selectedAccount.title} (${selectedAccount.followers} followers) - $${selectedAccount.price}`;
      
      // Update form data once when modal opens
      setFormData(prev => ({
        ...prev,
        country: countryValue,
        verificationStatus: verificationValue,
        message: autoMessage
      }));
    }
  }, [orderModal, selectedAccount]);

  // Handler for closing the confirmation
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    // If it was an error, keep the modal open
    // Otherwise, it's already closed
  };


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

  // Preload images for better user experience
  useEffect(() => {
    screenshots.forEach(screenshot => {
      const img = new Image();
      img.src = screenshot.src;
    });
  }, []);

  // Handle the order submission with API call
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Prepare data for the API
      const orderData = {
        ...data,
        selectedCard, // Include the selected card type
        selectedAccount // Include the selected account details
      };

      console.log("Submitting order to API:", orderData);
      
      // Make the actual API call
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
  };


  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto -mt-10">
          <CategorySelector
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <MergedAccountDisplay
            activeCategory={activeCategory}
            rotation={rotation}
            setOrderModal={setOrderModal}
            setSelectedCard={setSelectedCard}
            setSelectedAccount={setSelectedAccount}
          />
        </div>
      </section>
    
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
      <OrderConfirmation
        isVisible={showConfirmation}
        status={confirmationStatus}
        onClose={handleCloseConfirmation}
      />
    </>
  );
}