import { NextRequest, NextResponse } from "next/server";
import { listingBackendSchema } from "@/validation/listing.validation";
import { createSessionClient } from "@/lib/appwrite";
import { APP_CONFIG } from "@/lib/app-config";
import { ID } from "node-appwrite";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = listingBackendSchema.parse(body);

    const { shopId } = validatedData;
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const shop = await databases.getDocument(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.SHOP_ID,
      shopId,
    );
    if (!shop || shop.userId !== user.$id) {
      return NextResponse.json({ error: "Invalid shop ID" }, { status: 400 });
    }

    const carListing = await databases.createDocument(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.CAR_LISTING_ID,
      ID.unique(),
      {
        ...validatedData,
        yearOfManufacture: Number(validatedData.yearOfManufacture),
        userId: user.$id,
        shop: shop.$id,
      },
    );
    return NextResponse.json({
      message: "Car listing successfully",
      data: carListing,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error?.message || "Invalid server Error" },
      { status: 500 },
    );
  }
}
