import { Sheet } from "react-modal-sheet";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { useMediaQuery } from "react-responsive";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  CircleX,
  Clipboard,
  ClipboardCheck,
} from "../../assets/icons";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl,
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // for <md screens

  return isSmallScreen ? (
    // bottom sheet for small screens
    <div className={`fixed inset-0 z-20 ${isOpen ? "visible" : "hidden"}`}>
      {isOpen && (
        <div className="absolute inset-0 backdrop-blur-xs bg-black/30 z-10" />
      )}
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[0.4, 0]}
        initialSnap={0}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-center mb-4 text-secondary-text-500">
              Share this Event
            </h2>
            <hr className="border-t border-gray-300 " />

            <ShareOptions shareUrl={shareUrl} />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </div>
  ) : (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500/30 z-25 ${
        isOpen ? "visible" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-xs z-10" />

      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-20"
        style={{ boxShadow: "0 0 4px rgba(85, 60, 154, 0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center mb-4 text-secondary-text-500">
          Share this Event
        </h2>
        <hr className="border-t border-gray-300 my-4" />

        <ShareOptions shareUrl={shareUrl} />
        <CircleX
          className="w-8 h-8 absolute right-2 top-2 text-accent-500 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const ShareOptions = ({ shareUrl }: { shareUrl: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div>
        <FacebookShareButton
          url={shareUrl}
          className="w-full flex justify-start gap-4"
        >
          <FaFacebookF className="w-5 h-5 mr-2 text-secondary-text-500 " />{" "}
          Share on Facebook
        </FacebookShareButton>
        <hr className="border-t border-gray-300 my-4" />
      </div>

      <div>
        <LinkedinShareButton
          url={shareUrl}
          className="w-full flex justify-start gap-4 "
        >
          <FaLinkedinIn className="w-5 h-5 mr-2 text-secondary-text-500" />
          <span>Share on LinkedIn</span>
        </LinkedinShareButton>
        <hr className="border-t border-gray-300 my-4" />
      </div>

      <div>
        <TwitterShareButton
          url={shareUrl}
          className="w-full flex justify-start gap-4 "
        >
          <FaXTwitter className="w-5 h-5 mr-2 text-secondary-text-500" /> Share
          on Twitter
        </TwitterShareButton>
        <hr className="border-t border-gray-300 my-4" />
      </div>

      <div>
        <WhatsappShareButton
          url={shareUrl}
          className="w-full flex justify-start gap-4"
        >
          <FaWhatsapp className="w-5 h-5 mr-2 text-secondary-text-500" /> Share
          on WhatsApp
        </WhatsappShareButton>
        <hr className="border-t border-gray-300 my-4" />
      </div>

      <div
        className="w-full flex justify-start gap-4 items-center cursor-pointer"
        onClick={copyToClipboard}
      >
        {copied ? (
          <div className="w-full flex justify-start gap-4">
            <ClipboardCheck className="w-5 h-5 mr-2 text-secondary-text-500" />
            <span>Copied!</span>
          </div>
        ) : (
          <div className="w-full flex justify-start gap-4">
            <Clipboard className="w-5 h-5 mr-2 text-secondary-text-500" />
            <span>Copy to Clipboard</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
