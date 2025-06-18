const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_KEY = import.meta.env.VITE_API_KEY

import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import ReviewsSection from "../components/ReviewsSection";
import { OrderConfirmation } from "../components/OrderConfirmation";

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

interface ContactProps {
  onAppLoaded?: () => void;
}

export default function Contact({ onAppLoaded = () => {} }: ContactProps) {
  useEffect(() => {
    // Simulate loading if needed, or use actual loading logic
    const timer = setTimeout(() => {
      onAppLoaded();
    },1000); // Adjust timing as needed
    
    return () => clearTimeout(timer);
  }, [onAppLoaded]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
    message: "",
    country: "",
    username: "",
    verificationStatus: "Non-Verified",
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<string>("Non-Verified");
  
  // New state for confirmation message
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState<'success' | 'error'>('success');
  
  const VALID_CONTACT_METHODS = [
    "",
    "telegram",
    "whatsapp",
    "email",
    "discord",
  ];

  const sanitizeInput = (input: string): string =>
    input
      .replace(/<[^>]*>?/gm, "")
      .replace(/[\r\n]/g, "")
      .trim();

  const sanitizeFormData = (): FormData => ({
    name: sanitizeInput(formData.name),
    email: sanitizeInput(formData.email),
    phone: sanitizeInput(formData.phone),
    contactMethod: sanitizeInput(formData.contactMethod),
    message: sanitizeInput(formData.message),
    country: sanitizeInput(formData.country),
    username: sanitizeInput(formData.username),
    verificationStatus: sanitizeInput(formData.verificationStatus),
  });

  const encodeHTML = (text: string): string =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    // Input validation
    if (name === "phone" && value !== "" && !/^[\d\s()+-]*$/.test(value)) return;
    if (name === "name" && value.length > 100) return;
    if (name === "email" && value.length > 100) return;
    if (name === "username" && value.length > 100) return;
    if (name === "message" && value.length > 1000) return;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string): boolean => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) return false;
    if ((email.match(/@/g) || []).length !== 1) return false;
    const domainPart = email.split("@")[1];
    if (!domainPart.includes(".")) return false;
    if (email.includes("..")) return false;
    const tld = domainPart.split(".").pop() || "";
    if (tld.length < 2) return false;
    const localPart = email.split("@")[0];
    if (localPart.length < 1 || localPart.length > 64) return false;
    return true;
  };

  const isValidPhone = (phone: string): boolean => /^[\d\s()+-]*$/.test(phone);

  // Added handler for closing the confirmation
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Updated to match the Home component's handleSubmit function with OrderConfirmation
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const safeData = sanitizeFormData();
      console.log("Form data being sent:", safeData);
      
      // Make API call to backend - using the same endpoint as in Home component
     const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': API_KEY // Add the API key here
      },
      body: JSON.stringify(safeData),
    });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success confirmation instead of alert
        setConfirmationStatus('success');
        setShowConfirmation(true);
        resetForm();
      } else {
        // Show error confirmation instead of alert
        setConfirmationStatus('error');
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error confirmation instead of alert
      setConfirmationStatus('error');
      setShowConfirmation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateAndSubmit = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address");
      return;
    }

    if (!isValidEmail(formData.email) || /\r|\n/.test(formData.email)) {
      alert(
        `The email address "${encodeHTML(
          formData.email
        )}" is not valid or contains invalid characters.`
      );
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      alert(
        `Please enter a valid phone number. The value "${encodeHTML(
          formData.phone
        )}" contains invalid characters.`
      );
      return;
    }

    if (!formData.contactMethod) {
      alert("Please select a contact method");
      return;
    }

    if (formData.contactMethod === "discord" && !formData.username.trim()) {
      alert("Please enter your Discord username");
      return;
    }

    if (!formData.country) {
      alert("Please select a country");
      return;
    }

    handleSubmit();
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
      verificationStatus: "Non-Verified",
    });
    setVerificationStatus("Non-Verified");
  };
  
  // Update verification status in form data when it changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      verificationStatus: verificationStatus
    }));
  }, [verificationStatus]);
  
  const renderCountryField = () => {
    return (
      <select
        id="country"
        name="country"
        value={formData.country}
        onChange={handleFormChange}
        className="w-full bg-gray-700 p-3 rounded-lg text-white focus:outline-none"
        required
        disabled={isSubmitting}
      >
        <option value="">Select country</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="Germany/France">Germany/France</option>
        <option value="Other">Other</option>
      </select>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex justify-center space-x-4">
          <button 
            onClick={() => setVerificationStatus("Verified")}
            className={`px-4 py-2 rounded ${verificationStatus === "Verified" ? "bg-cyan-600" : "bg-gray-700"}`}
          >
            Verified
          </button>
          <button 
            onClick={() => setVerificationStatus("Non-Verified")}
            className={`px-4 py-2 rounded ${verificationStatus === "Non-Verified" ? "bg-cyan-600" : "bg-gray-700"}`}
          >
            Non-Verified
          </button>
        </div>
          
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">
                Contact Us
              </h2>
              <span className="ml-3 px-2 py-1 text-xs font-medium rounded bg-gray-700 text-gray-300">
                {verificationStatus}
              </span>
            </div>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
              aria-label="Reset form"
              disabled={isSubmitting}
            >
            </button>
          </div>
        
          <form onSubmit={(e) => e.preventDefault()} role="form" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-1 text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full bg-gray-700 p-3 rounded-lg text-white focus:outline-none"
                maxLength={100}
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleFormChange(e);
                  const input = e.target;
                  if (input.value && !isValidEmail(input.value)) {
                    input.setCustomValidity("Please enter a valid email");
                  } else {
                    input.setCustomValidity("");
                  }
                }}
                onBlur={(e) => {
                  const input = e.target;
                  if (input.value && !isValidEmail(input.value)) {
                    input.reportValidity();
                  }
                }}
                className="w-full bg-gray-700 p-3 rounded-lg text-white focus:outline-none"
                maxLength={100}
                required
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-300 mb-1 text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full bg-gray-700 p-3 rounded-lg text-white focus:outline-none"
                maxLength={20}
                inputMode="tel"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-gray-300 mb-1 text-sm">
                Country
              </label>
              {renderCountryField()}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="contactMethod" className="block text-gray-300 mb-1 text-sm">
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleFormChange}
                className="w-full bg-gray-700 p-3 rounded-lg text-white focus:outline-none"
                required
                disabled={isSubmitting}
              >
                <option value="">Select method</option>
                {VALID_CONTACT_METHODS.slice(1).map((method) => (
                  <option key={method} value={method}>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {formData.contactMethod === "discord" && (
              <div className="md:col-span-2">
                <label htmlFor="username" className="block text-gray-300 mb-1 text-sm">
                  Discord Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  className="w-full bg-gray-700 p-3 rounded-lg text-white focus:outline-none"
                  maxLength={100}
                  placeholder="e.g. user#1234"
                  required
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-gray-300 mb-1 text-sm">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="w-full bg-gray-700 p-3 rounded-lg text-white focus:outline-none"
                rows={4}
                maxLength={1000}
                disabled={isSubmitting}
              ></textarea>
            </div>

            <input
              type="hidden"
              id="verificationStatus"
              name="verificationStatus"
              value={formData.verificationStatus}
            />
            
            <div className="md:col-span-2 mt-2">
              <button
                type="button"
                onClick={validateAndSubmit}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 via-rose-500 to-cyan-600 hover:opacity-90 transition-all font-bold flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Added ReviewsSection component */}
      <ReviewsSection />
      
      {/* Added OrderConfirmation component */}
      <OrderConfirmation
        isVisible={showConfirmation}
        status={confirmationStatus}
        onClose={handleCloseConfirmation}
      />
    </div>
  );
}