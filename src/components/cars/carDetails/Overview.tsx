import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LandPlot } from "lucide-react";
import CarFAQs from "@/components/cars/carDetails/CarFaq";
import Essentials from "@/components/cars/carDetails/Essentials";
import GreatChoice from "@/components/cars/carDetails/GreatChoice";
import Included from "@/components/cars/carDetails/Include";

const CarOverview = ({ carTabData }: any ) => {
  return (
    <div>
      <Card className="w-full border-none">
        <Accordion type="single" collapsible defaultValue="policies">
          <AccordionItem value="policies" className="border-none">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <LandPlot color="blue" className="h-5 w-5" />
                <span className="text-base font-bold">Overview</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-4">
                <div
                  className="text-sm font-normal leading-7"
                  dangerouslySetInnerHTML={{ __html: carTabData?.content }}
                ></div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      <div className="pt-5">
        <GreatChoice greatChoice={carTabData?.great_choice}/>
      </div>
      <div className="pt-5">
        <Included include={carTabData?.include}/>
      </div>
      <div className="pt-5">
        <Essentials essential={carTabData?.pre_pick_up}/>
      </div>
      <div className="pt-5">
        <CarFAQs faqs={carTabData?.faqs} />
      </div>
    </div>
  );
};

export default CarOverview;
