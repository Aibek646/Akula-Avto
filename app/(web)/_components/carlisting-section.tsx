"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CAR_BRAND_OPTIONS } from "@/constants/car-options";
import { getAllCarListingQueryFn } from "@/lib/fetcher";
import { ListingType } from "@/@types/api.type";
import { cn } from "@/lib/utils";
import CarlistingSkeleton from "@/components/skeleton-loader/carlisting-skeleton";
import EmptyState from "@/components/EmptyState";
import CarCard from "@/components/CarCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BRANDS = [{ value: "all", label: "All Brand" }, ...CAR_BRAND_OPTIONS];

const Carlisting = () => {
  const [active, setActive] = useState(BRANDS[0]?.value);
  const { data, isPending } = useQuery({
    queryKey: ["group-by-brand", active],
    queryFn: () =>
      getAllCarListingQueryFn({
        brand: active !== "all" ? [active] : [],
      }),
    staleTime: 0,
  });
  const listings: ListingType[] = data?.listings || [];
  return (
    <div className="w-full pt-4 pb-14">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4 overflow-x-auto">
          {BRANDS.map((item, index) => (
            <button
              onClick={() => setActive(item.value)}
              disabled={isPending}
              key={index}
              className={cn(
                `text-gray-700 transition whitespace-nowrap font-medium px-3
                 border-b-2 border-transparent 
                 hover:border-black hover:text-black`,
                item.value === active && "border-black text-black",
                isPending && "pointer-events-none opacity-55",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        {isPending ? (
          <CarlistingSkeleton
            layout="grid"
            className="grid grid-cols-1 min-[500px]:grid-cols-2
         lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-0"
          />
        ) : listings?.length === 0 ? (
          <div>
            <EmptyState message="no cars found." />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 min-[500px]:grid-cols-2
         lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-0"
          >
            {listings?.map((listing) => (
              <CarCard key={listing.$id} listing={listing} layout="grid" />
            ))}
            <div className="flex mt-4 justify-center">
              <Link href="/search">
                <Button
                  size="lg"
                  className="uppercase font-semibold py-3 px-10 rounded-lg !h-auto"
                >
                  View More
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Carlisting;
