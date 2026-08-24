import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { testimonials } from "../../constants";

const TestimonialSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center py-16 w-full bg-fixed bg-background-image">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#553c9a] text-center mb-12">
          What Our Users Say
        </h2>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-gray-50 rounded-xl p-8 shadow-md mx-auto max-w-3xl">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <svg
                      className="h-12 w-12 text-[#553c9a] opacity-25"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/48";
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 text-left">
                      <p className="font-medium text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
