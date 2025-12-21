import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { ModalSheet } from "../ui";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface QrScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TicketInfo {
  event_name: string;
  ticket_code: string;
  ticket_quantity: number;
  ticket_status: string;
  purchase_date: string;
  attendee_name: string;
  check_in_time: string;
}

interface ApiResponse {
  detail: string;
  ticket_info: TicketInfo;
}

const QrScanModal: React.FC<QrScanModalProps> = ({ isOpen, onClose }) => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const isSmallest = useMediaQuery({ maxWidth: 475 });
  const isSmaller = useMediaQuery({ minWidth: 476, maxWidth: 767 });

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0 && !isProcessing) {
      const result = detectedCodes[0].rawValue;
      setScanResult(result);
      setIsProcessing(true);
      console.log("QR code scanned:", result);
      
      try {
        console.log("Processing QR data:", result);
        
        const response = await axios.post(
          'http://localhost:8090/api/tickets/booking/check-in/',
          {
            qr_code_data: result
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
            }
          }
        );
        
        setApiResponse(response.data);
        toast.success(response.data.detail);
      } catch (error) {
        console.error("Error processing QR code:", error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.detail);
        }
        setIsProcessing(false);
      }
    }
  };

  const handleScanAnother = () => {
    setApiResponse(null);
    setScanResult(null);
    setIsProcessing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    if (!dateString.includes('T')) return dateString;
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={isSmallest ? [0.6, 0] : isSmaller ? [-100, 0] : [0]}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold text-center mb-4 text-secondary-text-500">
          Ticket QR code
        </h2>
        <hr className="border-t border-gray-300 mb-4" />
        
        {isProcessing && !apiResponse ? (
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4">Processing ticket...</div>
          </div>
        ) : apiResponse ? (
          <div className="flex flex-col flex-grow">
            <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center font-semibold">
              {apiResponse.detail}
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm mb-4">
              <h3 className="font-bold text-lg mb-3">{apiResponse.ticket_info.event_name}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendee:</span>
                  <span className="font-medium">{apiResponse.ticket_info.attendee_name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Code:</span>
                  <span className="font-medium">{apiResponse.ticket_info.ticket_code}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{apiResponse.ticket_info.ticket_quantity}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize">{apiResponse.ticket_info.ticket_status}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Date:</span>
                  <span className="font-medium">{formatDate(apiResponse.ticket_info.purchase_date)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in Time:</span>
                  <span className="font-medium">{apiResponse.ticket_info.check_in_time}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={handleScanAnother}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Scan Another
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="relative">
              <Scanner
                onScan={handleScan}
                paused={!isOpen || isProcessing}
                classNames={{ 
                  container: "w-full max-h-64",
                  video: "w-full h-full"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-2 border-white w-48 h-48 opacity-70"></div>
              </div>
            </div>
            <div className="text-center mt-4 text-sm text-gray-600">
              Position the QR code within the frame to scan
            </div>
          </>
        )}
      </div>
    </ModalSheet>
  );
};

export default QrScanModal;