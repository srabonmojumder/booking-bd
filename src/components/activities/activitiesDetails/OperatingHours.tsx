"use client";

import {AppWindowMac} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function OperatingHours({operatingHours}:any) {

  return (
    <Card className="w-full border-none">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <AppWindowMac color="blue" className="h-10 w-10 bg-blue-50 p-2 rounded-lg" />
              <span className="text-lg leading-[26px] font-semibold">Operating Hours</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-7 pb-6 font-inter">
            <div className="w-full ">
              <ul className="space-y-4 w-full sm:w-6/12">
                {operatingHours?.map((feature: { weekday: string; time: string | null }, index: number) => (
                  <li key={index} className="flex items-start justify-between text-dark font-normal hover:font-semibold  ">
                    <span className="text-base leading-7">{feature.weekday}</span>
                    <span className="text-base leading-7">{feature.time ? feature.time : "Closed"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
