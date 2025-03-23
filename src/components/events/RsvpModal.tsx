import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { CircleX } from "../../assets/icons";
import { Badge, Button } from "../ui";
import { useToast } from "../../hooks";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  const { showToast } = useToast();

  const handleAddEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    // Split by commas, spaces, or new lines and filter empty strings
    const newEmails = emailInput
      .split(/[,\s]+/)
      .map((email) => email.trim())
      .filter((email) => email && !emails.includes(email));

    if (newEmails.length > 0) {
      setEmails([...emails, ...newEmails]);
      setEmailInput("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSendInvites = () => {
    if (emailInput.trim()) {
      // if there's any text in emailInput, add it to emails before sending
      const trimmedEmail = emailInput.trim();
      if (!emails.includes(trimmedEmail)) {
        setEmails((prevEmails) => [...prevEmails, trimmedEmail]);
      }
    }
    showToast(["Invitations sent successfully!"], "success");
    setEmails([]);
    setEmailInput("");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500/30 z-25 ${
        isOpen ? "visible" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-xs z-10" />

      <div
        className={cn(
          `bg-white p-6 rounded-lg shadow-lg w-96 relative z-20 flex flex-col items-center gap-8`,
          `max-h-[50vh] overflow-y-auto custom-scrollbar`,
          `max-w-2xl w-full mx-4`
        )}
        style={{ boxShadow: "0 0 4px rgba(85, 60, 154, 0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <h2 className="text-xl px-8 font-semibold text-center mb-4 text-secondary-text-500">
            Send reminders about the event
          </h2>
          <hr className="border-t border-gray-300" />
        </div>

        <div className="w-full">
          <textarea
            id="emails"
            placeholder="Enter email addresses (separate with commas or new lines)"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className={`w-full px-3 py-3 border border-gray-300
                rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 min-h-40`}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="mt-2 w-full flex items-center justify-between gap-2">
            <p className="text-lg font-medium text-[#423e33]">Guest List:</p>
            <button
              className={`cursor-pointer px-4 py-2 outline rounded-lg outline-gray-400 ${
                !emailInput.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddEmail}
              disabled={!emailInput.trim()}
            >
              Add emails
            </button>
          </div>
          {emails.length > 0 ? (
            <div className="w-full">
              <div className="flex flex-wrap gap-2 justify-start w-full">
                {emails.map((email, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Badge className="text-lg">
                      <h2>{email}</h2>
                      <button
                        onClick={() => removeEmail(email)}
                        className="ml-1 cursor-pointer rounded-full hover:bg-[#cf4307]/10 p-1"
                      >
                        <CircleX className="h-4 w-4" />
                        <span className="sr-only">Remove {email}</span>
                      </button>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-md font-medium text-gray-500">
              No guests added yet!
            </p>
          )}
          <Button
            bgColor="bg-accent-500"
            textColor="text-accent-btn-text"
            onClick={handleSendInvites}
            className="w-full mt-6 bg-accent-500 text-accent-btn-text py-2 px-4 rounded-md hover:bg-accent-300 transition duration-300"
          >
            Send invitations
          </Button>
        </div>

        <CircleX
          className="w-8 h-8 absolute right-2 top-2 text-accent-500 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default RsvpModal;
