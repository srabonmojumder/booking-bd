import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LandPlot } from "lucide-react";

export default function CancelationPolicy({cancelationPolicyData}:any) {
  const isArray = Array.isArray(cancelationPolicyData);
  return (
    <Card className="w-full border-none">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <LandPlot color="blue" className="h-5 w-5" />
              <span className="text-base font-bold">Cancellation policy</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="w-full">
              {!isArray && cancelationPolicyData ? (
                <div className="text-base font-normal leading-7" dangerouslySetInnerHTML={{ __html: cancelationPolicyData }} />
              ) : (
                <p className="text-gray-500">No information available.</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
