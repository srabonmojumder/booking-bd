"use client"; 

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const faqs: { question: string; answer: string }[] = [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-dark">
          Frequently Asked Questions
        </h2>
        <p className="text-dark md:max-w-[70%] w-full m-auto">
          Some questions about Chauffeur Service are asked frequently. We have
          answered the most frequent of those frequent questions below.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs?.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={`bg-card rounded-lg border-none px-4 ${
              activeItem === `item-${index}` ? "bg-[#F9F9FF]" : ""
            }`}
          >
            <AccordionTrigger
              className="text-left text-1xl text-dark font-semibold py-6 hover:no-underline"
              onClick={() =>
                setActiveItem(
                  activeItem === `item-${index}` ? null : `item-${index}`
                )
              }
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-dark">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
