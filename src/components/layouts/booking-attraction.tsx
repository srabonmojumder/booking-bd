"use client"

import { Check } from "lucide-react";

const benefits = [
    "Best price guarantee",
    "Easy booking process",
    "Exclusive offer and discount",
    "Instant confirmation",
    "24/7 customer support",
  ];

export default function BookingAttraction() {
    return (
        <div className="border rounded-lg shadow-sm p-4 mt-4 max-w-sm bg-white">
        <h6 className="text-lg mb-3">
          Top 5 reasons to book holiday from <span className="font-bold">Booking BD</span>
        </h6>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="text-blue-500 w-5 h-5" />
              <span className="text-gray-800">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    )
}