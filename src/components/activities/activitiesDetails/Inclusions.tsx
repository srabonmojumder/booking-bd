'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { LandPlot } from 'lucide-react'
import React from 'react'

interface InclusionsProps {
  content: string; // This is the JSON string from the API
}

const Inclusions = ({ content }: InclusionsProps) => {
  // Parse the JSON string to get an array of inclusions.
  const inclusionsArray: string[] = JSON.parse(content || "[]");

  return (
    <Card className="w-full border-none">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-none">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <LandPlot color="blue" className="h-5 w-5" />
              <h3 className="text-base font-bold">Inclusions</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 border-none">
            <Card className="w-full border-none bg-white shadow-none">
              <CardContent className="shadow-none border-none">
                <div className="space-y-3 border-none shadow-none">
                  <ul className="list-disc pl-5">
                    {inclusionsArray.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default Inclusions;
