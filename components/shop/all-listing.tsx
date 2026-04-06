import React from "react";
import { ListingType } from "@/@types/api.type";
import { Card, CardContent } from "@/components/ui/card";
import { CarFrontIcon, Grid3x3, List } from "lucide-react";
import CarlistingSkeleton from "@/components/skeleton-loader/carlisting-skeleton";
import EmptyState from "@/components/EmptyState";

function CardListingSkeleton() {
  return null;
}

const AllListing = ({
  listings,
  isPending,
}: {
  listings: ListingType[];
  isPending: boolean;
}) => {
  const [layout, setlayout] = React.useState<"list" | "grid">("grid");
  return (
    <Card className="shadow-none !bg-transparent rounded=[8px] border-none min-h-56">
      <CardContent className="p-3">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-bold">
            All listings ({listings.length || 0})
          </h2>
          <div className="flex items-center justify-center">
            <Grid3x3
              role="button"
              className={`${layout === "grid" ? "text-primary" : ""}`}
              onClick={() => {
                setlayout("grid");
              }}
            />
            <List
              role="button"
              className={`${layout === "grid" ? "text-primary" : ""}`}
              onClick={() => {
                setlayout("grid");
              }}
            />
            {isPending ? (
              <CarlistingSkeleton layout={layout} />
            ) : listings.length === 0 ? (
              <EmptyState message="No Car found" icon={CarFrontIcon} />
            ) : (
              <div
                className={`w-full grid ${layout === "list" ? "grid-cols-1 gap-4" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6`}"}`}
              >
                {listings.map((listing) => (
                  <CarCard
                    key={listing.$id}
                    listing={listing}
                    layout={layout}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default AllListing;
