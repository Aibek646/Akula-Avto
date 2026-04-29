"use client";

import React from "react";
import { slugToCarName } from "@/lib/helper";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { getSingleListingQueryFn } from "@/lib/fetcher";
import { ListingType } from "@/@types/api.type";
import CarHeader from "@/app/(web)/detail/_components/car-header";
import CarCarousel from "@/app/(web)/detail/_components/car-carousel";

const CarDetail = ({
  params,
}: {
  params: Promise<{
    slug: string;
    carId: string;
  }>;
}) => {
  const { slug, carId } = React.use(params);
  const carName = slugToCarName(slug);

  const { data, isPending, isError } = useQuery({
    queryKey: ["listing", carId],
    queryFn: () => getSingleListingQueryFn(carId),
  });

  const listings = data?.listing as ListingType;

  const breadcrumbItems = [
    { label: "Auto Akula", href: "/" },
    { label: "Cars", href: "/search" },
    { label: carName },
  ];
  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-7xl mx-auto">
        <div className="space-y-3">
          <NavBreadCrumb {...{ breadcrumbItems }} />
          <CarHeader
            displayTitle={listings?.displayTitle}
            condition={listings?.condition}
            fuelType={listings?.fuelType}
            transmission={listings?.transmission}
            mileage={listings?.mileage}
            isPending={isPending}
          />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_340px]">
            <div className="pt-1">
              <CarCarousel
                imageUrls={listings?.imageUrls}
                isPending={isPending}
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetail;
