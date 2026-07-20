"use client";

import {
  ChevronDown,
  ChevronUp,
  MapPin,
  UtensilsCrossed,
  Train,
  Mountain,
  Plane,
} from "lucide-react";
import { JSX, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LocationItem {
  name: string;
  distance: string;
}

interface LocationSection {
  title: string;
  icon: JSX.Element;
  items: LocationItem[];
}

const surroundingsData: LocationSection[] = [];

export default function HotelSurroundings({ data }: { data: any }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="w-full border-none bg-white">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h2 className="text-base font-bold">Hotel surroundings</h2>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      <CardContent
        className={cn(
          "grid gap-6 transition-all duration-300",
          isExpanded ? "p-4" : "h-0 p-0 overflow-hidden"
        )}
      >
        <div className="grid sm:grid-cols-3 gap-20">
          {surroundingsData.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                {section.icon}
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-[#1A1A1A] font-light">
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
