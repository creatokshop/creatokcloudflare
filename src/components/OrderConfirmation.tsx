import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface OrderConfirmationProps {
  isVisible: boolean;
  status: 'success' | 'error';
  onClose: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isVisible,
  status,
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            {status === 'success' ? 'Order Received' : 'Submission Error'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center pb-4">
          {status === 'success' ? (
            <>
              <CheckCircle className="w-16 h-16 text-cyan-500 mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">Thank you for your order!</h4>
              <p className="text-gray-300">
                Our team is reviewing your request and will get back to you soon via your preferred contact method.
              </p>
            </>
          ) : (
            <>
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">Something went wrong</h4>
              <p className="text-gray-300">
                We encountered an issue while processing your order. Please try again or contact support.
              </p>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-600 via-rose-500 to-cyan-600 hover:opacity-90 transition-all"
        >
          {status === 'success' ? 'Close' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};