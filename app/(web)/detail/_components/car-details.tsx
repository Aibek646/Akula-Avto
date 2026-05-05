import React from "react";
import { ListingType } from "@/@types/api.type";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { CogIcon, FuelIcon, GaugeIcon } from "lucide-react";

const CarDetails = ({
  listing,
  isPending,
}: {
  listing: ListingType;
  isPending: boolean;
}) => {
  return (
    <div className="w-full h-auto pt-2">
      {isPending ? (
        <Skeleton className="w-full h-[350px] rounded-t-none" />
      ) : (
        <Card className="!rounded-t-none rounded-b-8px shadow-none">
          <CardContent className="!p-4 !py-6">
            <div className="mb-4">
              <h2 className="font-bold text-lg mb-2">Description</h2>
              <div className="text-sm font-light">{listing?.description}</div>
            </div>
            <ul className="my-4 flex items-center font-light gap-5">
              <li className="flex flex-col capitalize items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <FuelIcon className="size-5" />
                  {listing?.fuelType?.toLowerCase()}
                </span>
              </li>

              <li className="flex flex-col capitalize items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <GaugeIcon className="size-5" />
                  {listing?.mileage} MPG
                </span>
              </li>

              <li className="flex flex-col capitalize items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <CogIcon className="size-5" />
                  {listing?.transmission?.toLowerCase()}
                </span>
              </li>

              <li className="flex flex-col capitalize items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <CogIcon className="size-5" />
                  {listing?.condition?.toLowerCase()}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default CarDetails;
