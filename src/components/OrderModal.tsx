import React from "react";
import { X, Loader } from "lucide-react";

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

interface AccountOption {
  id: string;
  title: string;
  followers: string;
  price: number;
  verified: boolean;
  isMostSold?: boolean;
}

interface OrderModalProps {
  orderModal: boolean;
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (data: FormData) => void;
  selectedCard: string;
  activeCategory: string;
  isSubmitting: boolean;
  selectedAccount: AccountOption | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  orderModal,
  setOrderModal,
  formData,
  handleFormChange,
  handleSubmit,
  selectedCard,
  activeCategory,
  isSubmitting,
  selectedAccount,
}) => {
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

  const isValidPhone = (phone: string): boolean => /^[\d\s+()-]*$/.test(phone);

  const validateAndSubmit = () => {
    // Don't validate if already submitting
    if (isSubmitting) return;
    
    // Client-side form validation with feedback in the form itself instead of alerts
    let errorField: HTMLElement | null = null;
    let errorMessage = "";
    
    if (!formData.name.trim()) {
      errorField = document.getElementById("name");
      errorMessage = "Please enter your name";
    } else if (!formData.email.trim()) {
      errorField = document.getElementById("email");
      errorMessage = "Please enter your email address";
    } else if (!isValidEmail(formData.email) || /\r|\n/.test(formData.email)) {
      errorField = document.getElementById("email");
      errorMessage = "Please enter a valid email address";
    } else if (formData.phone && !isValidPhone(formData.phone)) {
      errorField = document.getElementById("phone");
      errorMessage = "Please enter a valid phone number";
    } else if (!formData.contactMethod) {
      errorField = document.getElementById("contactMethod");
      errorMessage = "Please select a contact method";
    } else if (formData.contactMethod === "discord" && !formData.username.trim()) {
      errorField = document.getElementById("username");
      errorMessage = "Please enter your Discord username";
    } else if (!formData.country) {
      errorField = document.getElementById("country");
      errorMessage = "Please select a country";
    }
    
    if (errorField && errorMessage) {
      // Focus the field with error
      errorField.focus();
      // Display the error using the field's validation API
      (errorField as HTMLInputElement).setCustomValidity(errorMessage);
      (errorField as HTMLInputElement).reportValidity();
      return;
    }

    const safeData = sanitizeFormData();
    handleSubmit(safeData);
  };

  const resetForm = () => {
    const fields: (keyof FormData)[] = [
      "name",
      "email",
      "phone",
      "contactMethod",
      "message",
      "country",
      "username",
      "verificationStatus",
    ];
    fields.forEach((field) => {
      const event = {
        target: {
          name: field,
          value: "",
        },
      } as React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >;
      handleFormChange(event);
    });
  };

  const renderCountryField = () => {
    switch (selectedCard) {
      case "UK":
        return (
          <input
            type="text"
            id="country"
            name="country"
            value="United Kingdom"
            readOnly
            className="w-full bg-gray-700 rounded-lg p-2 sm:p-3 text-white text-sm focus:outline-none"
            disabled={isSubmitting}
          />
        );
      case "US":
        return (
          <input
            type="text"
            id="country"
            name="country"
            value="United States"
            readOnly
            className="w-full bg-gray-700 rounded-lg p-2 sm:p-3 text-white text-sm focus:outline-none"
            disabled={isSubmitting}
          />
        );
      case "EU":
        return (
          <input
            type="text"
            id="country"
            name="country"
            value="Germany/France"
            readOnly
            className="w-full bg-gray-700 rounded-lg p-2 sm:p-3 text-white text-sm focus:outline-none"
            disabled={isSubmitting}
          />
        );
      default:
        return (
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleFormChange}
            className="w-full bg-gray-700 rounded-lg p-2 sm:p-3 text-white text-sm focus:outline-none"
            disabled={isSubmitting}
          >
            <option value="">Select country</option>
          </select>
        );
    }
  };

  return (
    <>
      {orderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl p-3 sm:p-6 w-full max-w-xs sm:max-w-md my-4 sm:my-8 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-start flex-col sm:flex-row sm:items-center">
                <h3 className="text-lg sm:text-xl font-bold leading-tight">
                  {`Place Your ${encodeHTML(selectedCard)} Order`}
                </h3>
                <span className="mt-1 sm:mt-0 sm:ml-3 px-2 py-1 text-xs font-medium rounded bg-gray-700 text-gray-300">
                  {activeCategory === "verified" ? "Verified" : "Non-Verified"}
                </span>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setOrderModal(false);
                }}
                className="text-gray-400 hover:text-white flex-shrink-0 ml-2"
                aria-label="Close"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div role="form" className="space-y-3 sm:space-y-4">
              {/* Selected Account Display */}
              {selectedAccount && (
                <div className="mb-3 sm:mb-4">
                  <label className="block text-gray-300 mb-1 text-xs sm:text-sm">
                    Selected Account
                  </label>
                  <div className="w-full bg-gray-600 rounded-lg p-2 sm:p-3 text-white border-l-4 border-cyan-500">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm sm:text-base truncate">
                          {selectedAccount.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">
                          {selectedAccount.followers} followers • {selectedAccount.verified ? 'Verified' : 'Non-Verified'}
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="font-bold text-base sm:text-lg text-cyan-400">
                          ${selectedAccount.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form fields in single column on mobile, two columns on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-300 mb-1 text-xs sm:text-sm"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      // Clear any validation errors when typing
                      e.target.setCustomValidity('');
                      handleFormChange(e);
                    }}
                    className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none text-sm"
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 mb-1 text-xs sm:text-sm"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      // Clear any validation errors when typing
                      e.target.setCustomValidity('');
                      handleFormChange(e);
                    }}
                    className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none text-sm"
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-300 mb-1 text-xs sm:text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      // Clear any validation errors when typing
                      e.target.setCustomValidity('');
                      const newValue = e.target.value;
                      if (newValue === "" || /^[\d\s()+-]*$/.test(newValue)) {
                        handleFormChange(e);
                      }
                    }}
                    className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none text-sm"
                    maxLength={20}
                    inputMode="tel"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-gray-300 mb-1 text-xs sm:text-sm"
                  >
                    Country
                  </label>
                  {renderCountryField()}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactMethod"
                  className="block text-gray-300 mb-1 text-xs sm:text-sm"
                >
                  Your contact preference
                </label>
                <select
                  id="contactMethod"
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={(e) => {
                    // Clear any validation errors when selecting
                    e.target.setCustomValidity('');
                    handleFormChange(e);
                  }}
                  className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none text-sm"
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
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-300 mb-1 text-xs sm:text-sm"
                  >
                    Discord Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => {
                      // Clear any validation errors when typing
                      e.target.setCustomValidity('');
                      handleFormChange(e);
                    }}
                    className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none text-sm"
                    maxLength={100}
                    placeholder="e.g. user#1234"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-300 mb-1 text-xs sm:text-sm"
                >
                  Order Details (e.g. number of followers)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full bg-gray-700 rounded-lg p-2 text-white h-12 sm:h-16 focus:outline-none text-sm resize-none"
                  maxLength={1000}
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <input
                type="hidden"
                id="verificationStatus"
                name="verificationStatus"
                value={
                  activeCategory === "verified" ? "Verified" : "Non-Verified"
                }
              />

              <div className="mt-4">
                <button
                  onClick={validateAndSubmit}
                  className="w-full py-2.5 sm:py-2 rounded-lg bg-gradient-to-r from-cyan-600 via-rose-500 to-cyan-600 hover:opacity-90 transition-all flex items-center justify-center text-sm sm:text-base font-medium"
                  aria-label="Submit Order"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};