"use client";
import React from "react";
import { listingSchema } from "@/validation/listing.validation";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addListingFields } from "@/constants/listing-fields";
import FormGenerator from "@/components/FormGenerator";
import { Button } from "@/components/ui/button";

const AddListing = () => {
  const listingClientSchema = listingSchema.extend({
    contactPhone: z
      .string({
        required_error: "Contact number is required",
      })
      .refine(isValidPhoneNumber, "Invalid phone number"),
  });
  type FormDataType = z.infer<typeof listingClientSchema>;
  type FormFieldName = keyof FormDataType;

  const form = useForm<FormDataType>({
    resolver: zodResolver(listingClientSchema),
    mode: "onBlur",
    defaultValues: {
      brand: "",
      model: "",
      yearOfManufacture: "",
      exteriorColor: "",
      interiorColor: "",
      condition: "",
      secondCondition: [],
      mileage: "",
      transmission: "",
      fuelType: "",
      keyFeatures: [],
      vin: "",
      bodyType: "",
      drivetrain: "",
      seatingCapacity: "",
      description: "",
      price: 0,
      contactPhone: "",
      imageUrls: [],
    },
  });

  const brand = useWatch({
    control: form.control,
    name: "brand",
  });

  function onSubmit(values: FormDataType) {
    console.log(values);
  }
  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-4xl mx-auto pt-5">
        <Card className="!bg-transparent shadow-none border-none">
          <CardHeader className="flex items-center justify-center bg-red-100 rounded-[8px] p-4 mb-4">
            <CardTitle className="font-semibold text-xl">Add Listing</CardTitle>
          </CardHeader>
          <CardContent className="bg-white rounded-[8px] p-4 px-6 pb-8">
            <div className="w-full mx-auto">
              <div className="flex items-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                  >
                    <div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-5">
                      {addListingFields.map((field, index) => (
                        <FormField
                          name={field.name as FormFieldName}
                          key={index}
                          control={form.control}
                          disabled={field.disabled}
                          render={({ field: formField }) => {
                            const filteredModels =
                              field.name === "model" && brand
                                ? field?.options?.filter(
                                    (model) => model.key === brand,
                                  )
                                : [];
                            const valueMultiSelect =
                              field.fieldType === "multiselect"
                                ? Array.isArray(formField.value)
                                  ? formField.value
                                  : []
                                : [];
                            return (
                              <FormItem
                                className={`${field.col ? `col-span-${field.col}` : ""}`}
                              >
                                <FormControl>
                                  <FormGenerator
                                    field={{
                                      ...field,
                                      options:
                                        field.name === "model"
                                          ? filteredModels
                                          : field.options,
                                    }}
                                    register={form.register}
                                    errors={form.formState.errors}
                                    formValue={formField.value}
                                    valueMultiSelect={valueMultiSelect}
                                    onChange={formField.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <Button
                      className="mt-6 cursor-pointer py-6 mb-4 w-full max-w-xs flex place-items-center justify-self-center"
                      disabled={false}
                      type="submit"
                      size="lg"
                    >
                      Post Listing
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
export default AddListing;
