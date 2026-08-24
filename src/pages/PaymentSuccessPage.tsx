import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const ticket_id = searchParams.get("ticket_id");
  const [message, setMessage] = useState('Verifying payment...');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session_id || !ticket_id) {
      setMessage('Missing required parameters');
      setIsLoading(false);
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem('eventify-token');
        if (!token) {
          setMessage('Authentication required');
          setIsLoading(false);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        const response = await axios.post(
          'http://localhost:8080/api/payments/verify/',
          { session_id, ticket_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data) {
          setMessage('Payment verified successfully! Redirecting to homepage...');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (error) {
        setMessage(`Payment verification failed. Redirecting to homepage...`);
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      verifyPayment();
    }, 2000);

    return () => clearTimeout(timer);
  }, [session_id, ticket_id, navigate]);

  return (
    <div className="pt-[90px] flex flex-col items-center justify-center min-h-[50vh]">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;