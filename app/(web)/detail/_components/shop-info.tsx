import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Ca from "zod/v4/locales/ca";
import { Car, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PropsType {
  price: number;
  shopId: string;
  shopName: string;
  shopOwnerUserId: string;
  isPending: boolean;
}

const ShopInfo = ({
  price,
  shopId,
  shopName,
  isPending,
  shopOwnerUserId,
}: PropsType) => {
  return (
    <div className="w-full">
      {isPending ? (
        <div className="w-full">
          <Skeleton className="w-full h-[88px] rounded-lg mb-4" />
          <Skeleton className="w-full h-[136px] rounded-lg mb-4" />
          <Skeleton className="w-full h-[200px] rounded-lg mb-4" />
        </div>
      ) : (
        <>
          <Card className="w-full bg-white rounded-lg shadow-custom">
            <CardContent className="!p-4">
              <h2 className="font-semibold text-xs text-gray-500">Price</h2>
              <div>
                <p className="text-2xl">{formatCurrency(price)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full rounded-lg shadow-custom mt-4">
            <CardContent className="!p-4">
              <Link
                href={`/shop/${shopId}`}
                className="flex items-center gap-2"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="w-full bg-primary/40 flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-[3px]">
                  <h5 className="hover:underline -mt-0 text-base font-medium">
                    {shopName}
                  </h5>
                  <p className="flex items-center m-[0_6px_1px_0px] text-[10px] text-[#6c8ea0]">
                    {}
                  </p>

                  <p className="flex items-center m-[0_6px_1px_0px] text-[10px] text-[#6c8ea0]">
                    Typically replices within on time
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full bg-white rounded-lg mt-4">
            <CardContent className="!p-4">
              <h2 className="font-bold text-lg text-center mb-2">
                Safety tips
              </h2>
              <ul
                role="list"
                className="safety-list text-sm space-y-1 font-normal
         px-4 text-gray-700
        "
              >
                <li role="listitem">Avoid sending any prepayments</li>
                <li role="listitem">
                  Meet with the seller at a safe public place
                </li>
                <li role="listitem">
                  Inspect what you're going to buy to make sure it's what you
                  need
                </li>
                <li role="listitem">
                  Check all the docs and only pay if you're satisfied
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
export default ShopInfo;
