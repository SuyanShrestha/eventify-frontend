import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-[4rem] min-h-[calc(20vh)] w-full bg-primary-500 md:px-2 px-4 md:py-4 py-8 bg-fixed bg-background-image">
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-8">
        <div className="w-full md:w-1/3 text-center md:text-start">
          <h2 className="text-3xl font-bold text-[#553c9a]">About Us</h2>
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <p className="text-lg text-gray-600">
            We are a dynamic team dedicated to creating a platform that bridges
            the gap between event organizers and attendees. Our mission is to
            make discovering, booking, and managing events easier and more
            accessible for everyone. Whether you're here to find your next big
            experience or create one for others, we're here to help make it
            happen seamlessly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
