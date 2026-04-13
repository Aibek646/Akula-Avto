import React from "react";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Filters from "@/app/(web)/search/_components/filters";

const SearchContent = () => {
  const listings = [];
  const breadcrumbItems = [
    { label: "Auto Home", href: "/" },
    {
      label: `${listings.length || 0} results cars found `,
    },
  ];
  return (
    <div className="space-y-3">
      <NavBreadCrumb breadcrumbItems={breadcrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:hidden">
          <Sheet>
            <SheetContent
              side="left"
              className="w-[300px] !p-0 sm:w-[400px] overflow-y-auto"
            >
              <Filters />
            </SheetContent>
          </Sheet>
        </div>
        <div className=" lg:block col-span-1">
          <Filters />
        </div>
        <div className="col-span-1 lg:col-span-3"></div>
      </div>
    </div>
  );
};
export default SearchContent;
