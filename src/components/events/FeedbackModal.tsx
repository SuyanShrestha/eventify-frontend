import { Feedback } from "../../constants";
import { Button, ModalSheet } from "../ui";
import { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContentType: "write" | "view";
  feedbacks?: Feedback[];
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  modalContentType,
  feedbacks = [],
}) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  
  const handleSubmitFeedback = () => {
    console.log("comment submitted: ", comment);
    setComment("");
    onClose();
  };

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
                Submit
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div
                  key={feedback.feedbackId}
                  className="p-3 border border-gray-300 rounded-md text-gray-700"
                >
                  <p className="text-lg font-semibold">{feedback.username}</p>
                  <p className="text-sm text-gray-600">
                    {feedback.feedbackContent}
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
