"use client";
import React from "react";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Filters from "@/app/(web)/search/_components/filters";
import AllListings from "@/app/(web)/search/_components/all-listing";
import { useQuery } from "@tanstack/react-query";
import useFilter from "@/hooks/use-filter";
import { getAllCarListingQueryFn } from "@/lib/fetcher";

const SearchContent = () => {
  const { filters } = useFilter();
  const { data, isPending } = useQuery({
    queryKey: [
      "all-cars",
      filters.brand,
      filters.model,
      filters.color,
      filters.price,
      filters.yearMin,
      filters.yearMax,
      filters.fuelType,
      filters.keyword,
      filters.condition,
    ],
    queryFn: () =>
      getAllCarListingQueryFn({
        brand: filters.brand,
        model: filters.model,
        color: filters.color,
        condition: filters.condition,
        price: filters.price,
        year_max: filters.yearMax,
        year_min: filters.yearMin,
        keyword: filters.keyword,
        fuelType: filters.fuelType,
      }),
    staleTime: 0,
  });

  const listings = data?.listings || [];

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const breadcrumbItems = [
    { label: "Auto Home", href: "/" },
    {
      label: `${listings.length || 0} results cars found `,
    },
  ];

  const onFilterOpen = () => {
    setIsFilterOpen(true);
  };
  return (
    <div className="space-y-3">
      <NavBreadCrumb breadcrumbItems={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent
              side="left"
              className="w-[300px] !p-0 overflow-y-auto"
            >
              <VisuallyHidden>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Filter car listings</SheetDescription>
              </VisuallyHidden>
              <Filters />
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:block col-span-1">
          <Filters />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <AllListings
            listings={listings}
            isPending={isPending}
            onFilterOpen={onFilterOpen}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchContent;
