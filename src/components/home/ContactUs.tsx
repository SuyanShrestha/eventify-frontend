import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "../../hooks";
import { useMediaQuery } from "react-responsive";
import { ContactUsLottie2 } from "../../assets/lottie";
import { LottieComponent } from "../ui";

const ContactUs: React.FC = () => {
  const { showToast } = useToast();
  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });

  const lottieHeight = isSmallScreen ? 350 : 350;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast(["All fields are required."], "error");
      return;
    }

    setIsLoading(true);
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_PUBLIC_KEY")
      .then(() => {
        showToast(["Message sent successfully!"], "success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        showToast(["Failed to send message. Try again."], "error");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full flex justify-center bg-gray-100 py-20">
      <div className="max-w-7xl w-full px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-secondary-text-500 md:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 text-gray-700 md:text-lg">
            We'd love to hear from you! Fill out the form below.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={sendEmail}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <LottieComponent
              animationData={ContactUsLottie2}
              height={lottieHeight}
            />
          </div>

          <div className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-40 px-4 py-3 text-lg border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-accent-500 outline-none"
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 text-lg font-medium cursor-pointer bg-accent-400 hover:bg-accent-300 text-accent-btn-text rounded-lg transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
