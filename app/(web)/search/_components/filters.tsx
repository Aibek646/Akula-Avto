"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { CAR_BRAND_OPTIONS } from "@/constants/car-options";
import FilterAccordionItem from "@/components/FilterAccordionItem";

const Filters = () => {
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <div className="flex items-center justify-between rounded-[4px_4p_0_0] bg-primary text-white p-[8px_16px]">
          <h2 className="font-bold text-base">Filters</h2>
          <Button
            className="!h-auto text-white/80 font-light !py-0"
            variant="link"
          >
            Reset all
          </Button>
        </div>
        <Accordion type="single" collapsible defaultValue="brands">
          <FilterAccordionItem
            title="Car Brands"
            value="brands"
            filterType="checkbox"
            options={CAR_BRAND_OPTIONS}
            selectedValues={[]}
            onValuesChange={() => null}
            hasSearch
          />
        </Accordion>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[
          "price-range",
          "fuel-type",
          "condition",
          "model",
          "transmission",
          "color",
          "year-of-manufacture",
        ]}
      ></Accordion>
    </div>
  );
};
export default Filters;
