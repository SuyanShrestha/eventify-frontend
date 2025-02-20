import type React from "react";
import CarouselComponent from "../ui/Carousel";
import Card from "../ui/Card";
import { Gallery } from "../../data/data";

const IntroSection: React.FC = () => {
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
    <section className="flex flex-col items-center lg:flex-row lg:justify-evenly min-h-[calc(100vh-4rem)] w-full bg-[#F5E6D3] p-8">
      <div className="text-center lg:text-left mb-8 lg:mb-0 lg:pr-8 lg:pl-8">
        <h1 className="font-['Playfair_Display'] text-4xl lg:text-5xl text-[#8E3B46] mb-4">
          Find. Book. Enjoy.
        </h1>
        <p className="text-[#D96941] text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
          From concerts to conferences, find the perfect event for you.
        </p>
      </div>
      <div className="flex justify-center">
        <CarouselComponent cards={cards} offset={2} showArrows={false} />
      </div>
    </section>
  );
};

export default IntroSection;
