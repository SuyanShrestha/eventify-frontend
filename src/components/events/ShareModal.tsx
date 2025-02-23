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
} from "../../assets/icons";

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
    // Bottom Sheet for small screens
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
  ) : (
    // Centered Modal for larger screens
    <div
      className={`fixed inset-0 flex items-center justify-center bg-secondary-text-400/30 z-25 ${
        isOpen ? "visible" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        style={{ boxShadow: "0 0 4px rgba(85, 60, 154, 0.25)" }}
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

const ShareOptions = ({ shareUrl }: { shareUrl: string }) => (
  <div>
    <div>
      <FacebookShareButton
        url={shareUrl}
        className="w-full flex justify-start gap-4"
      >
        <FaFacebookF className="w-5 h-5 mr-2 text-secondary-text-500 " /> Share
        on Facebook
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
        <FaXTwitter className="w-5 h-5 mr-2 text-secondary-text-500" /> Share on
        Twitter
      </TwitterShareButton>
      <hr className="border-t border-gray-300 my-4" />
    </div>

    <WhatsappShareButton
      url={shareUrl}
      className="w-full flex justify-start gap-4 "
    >
      <FaWhatsapp className="w-5 h-5 mr-2 text-secondary-text-500" /> Share on
      WhatsApp
    </WhatsappShareButton>
  </div>
);

export default ShareModal;
