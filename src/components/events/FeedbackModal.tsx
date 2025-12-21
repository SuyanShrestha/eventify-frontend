import React, { useEffect, useState } from "react";
import { Button, ModalSheet } from "../ui";
import axios from "axios";
import { toast } from "react-toastify";

interface Feedback {
  id: number;
  event: number;
  user: {
    id: number;
    profile_picture: string | null;
    username: string;
  };
  message: string;
  created_at: string;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  id
}) => {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalContentType,setModalContentType] = useState('write')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  
  const handleSubmitFeedback = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a feedback");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await axios.post(`http://localhost:8080/api/feedback/event/${id}/`, {message: comment}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
        }
      });
      setFeedbacks(response.data);
      toast.success("Feedback submitted successfully");
      setComment("");
      onClose();
    } catch (error) {
      toast.error("Failed to submit feedback");
      console.error("Error submitting feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/feedback/event/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
          }
        });
        setModalContentType('view')
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setModalContentType('write')
      } finally {
        setLoading(false);
      }
    };
    
    if (isOpen) {
      fetchFeedback();
    }
  }, [isOpen, id]);

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      customClass="max-w-2xl w-full"
    >
      <div className="flex flex-col">
        <h2 className="text-xl px-8 font-semibold text-center mb-4 text-secondary-text-500">
          {modalContentType === "write"
            ? "Send Your Feedback"
            : "Here are the Feedbacks"}
        </h2>
        <hr className="border-t border-gray-300" />
      </div>

      <div className="w-full">
        {modalContentType === "write" ? (
          <>
            <label
              htmlFor="comment"
              className="block text-md sm:text-lg font-medium text-secondary-text-500 mb-1"
            >
              Write your feedback...
            </label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Write your feedback here..."
              value={comment}
              onChange={handleInputChange}
              className="w-full flex-grow px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 min-h-36"
            />
            <div className="flex justify-center mt-2">
              <Button
                bgColor="bg-accent-500"
                textColor="text-accent-btn-text"
                className="min-w-48 bg-accent-500 text-accent-btn-text py-2 px-4 rounded-md hover:bg-accent-400 transition duration-300"
                onClick={handleSubmitFeedback}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {loading ? (
              <p className="text-center text-gray-500">Loading feedbacks...</p>
            ) : feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-3 border border-gray-300 rounded-md text-gray-700"
                >
                  <p className="text-lg font-semibold">{feedback.user.username}</p>
                  <p className="text-sm text-gray-600">
                    {feedback.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No feedback available.
              </p>
            )}
          </div>
        )}
      </div>
    </ModalSheet>
  );
};

export default FeedbackModal;