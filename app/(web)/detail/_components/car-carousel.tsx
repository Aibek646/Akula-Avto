import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CameraIcon } from "lucide-react";

const CarCarousel = ({
  imageUrls = [],
  isPending,
}: {
  imageUrls: string[];
  isPending: boolean;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setActiveThumbnailIndex(() => {
        const selectedIndex = api.selectedScrollSnap();
        return selectedIndex < visibleThumbnails?.length - 1
          ? selectedIndex
          : visibleThumbnails.length - 1;
      });
    });
  }, []);

  const visibleThumbnails = imageUrls?.slice(0, 5);
  const remainingThumbnailCount = Math.max(0, imageUrls?.length - 5);
  return (
    <div className="w-full h-auto">
      <div
        className="relative w-full rounded-[8px]
            min-h-[300px] md:min-h-[450px] lg:min-h-[605px]
            before:block before:content-['']
            before:absolute before:top-[-6px]
            before:left-0 before:w-full
            before:h-[15px] before:rounded-[8px_8px_0_0]
            before:bg-[#00b53f] before:z-0"
      >
        {isPending ? (
          <div className="rounded-b-none h-[300px] md:h-[450px] lg:h-[605px]"></div>
        ) : (
          <Carousel className="b-carousel-slider" setApi={setApi}>
            <CarouselContent className="!p-0 bg-primary/10">
              {imageUrls?.map((imageUrl, index) => (
                <CarouselItem key={index} className="!p-0 h-full">
                  <div className="relative rounded-lg h-[300px] md:h-[450px] lg:h-[605px]">
                    <Image
                      src={imageUrl}
                      className="w-full h-full !rounded-tr-l object-cover"
                      width={800}
                      height={620}
                      alt=""
                      style={{
                        boxShadow: "0 7px 14.8px 3.2px #0207010a",
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div
              className="b-carousel absolute bottom-[20px] left-[30px] flex
            justify-center items-center bg-[#0006] rounded-[4px]
            text-[#f2f2f2] text-[14px] p-[4px_11px] gap-1"
            >
              <CameraIcon className="!w-4 !h-4" />
              <div>
                {current}/{count}
              </div>
            </div>
            <CarouselNext
              className="carousel--navigation right-2 md:right-8
           !bg-transparent !border-0 text-white !p-0"
            />
          </Carousel>
        )}
      </div>
    </div>
  );
};
export default CarCarousel;
