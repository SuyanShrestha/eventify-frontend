import type React from "react";
import CarouselComponent from "../ui/Carousel";
import Card from "../ui/Card";
import { Gallery, RoutingLinks } from "../../constants";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const cards = Gallery.img.map((img) => ({
    key: img.imgTitle,
    content: (
      <Card
        imageSrc={Gallery.path + img.imgSrc}
        imageAlt={img.imgAlt}
        imageTitle={img.imgTitle}
      />
    ),
  }));

  return (
    <section className="flex flex-col items-center justify-center mt-[4rem] min-h-[calc(100vh-4rem)] w-full bg-primary-500 bg-fixed bg-background-image">
      <div className="max-w-7xl w-full min-h-[calc(100vh-4rem) flex flex-col items-center lg:flex-row lg:justify-evenly ">
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:pr-8 lg:pl-8">
          <h1 className="font-['Playfair_Display'] text-4xl lg:text-5xl text-accent-500 mb-4">
            Find. Book. Create.
          </h1>
          <p className="text-tertiary-500 mb-8 text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
            From concerts to conferences, find the perfect event for you.
          </p>
          <div className="w-full mb-8 flex gap-4 justify-center lg:justify-start pl-4 lg:pl-0">
            <Link
              to={RoutingLinks.Events}
              className="py-2 px-4 bg-accent-400 hover:bg-accent-300 text-accent-btn-text rounded-lg transition duration-300"
            >
              Find Events
            </Link>
            <Link
              to={RoutingLinks.CreateEvent}
              className="py-2 px-4 bg-secondary-500 border border-gray-400 hover:bg-gray-200 rounded-lg transition duration-300"
            >
              Create Event
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <CarouselComponent cards={cards} offset={2} showArrows={false} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
