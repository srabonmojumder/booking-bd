import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

const YourBusiness = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        {/* Image Grid */}
        <div className="grid gap-4 grid-cols-2">
          <div className="aspect-[3/5] relative rounded-lg overflow-hidden">
            <Image
              src="/images/business_1.png"
              alt=""
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="aspect-[3/5] relative rounded-lg overflow-hidden">
            <Image
              src="/images/business_2.png"
              alt=""
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Place to develop your business growth
          </h1>
          <div className="space-y-4">
            <p className="text-lg text-dark font-thin">
              Design Season is a collaboration between Leicesters creative hub
              LCB based in the citys cultural quarter and designers and design
              businesses all over the city & county
            </p>
            <p className="text-lg text-dark">
              By creating a strong brand presence on social media, you can reach
              broader audience get partners brand advocates
            </p>
          </div>
          <Button className="bg-primary px-5 py-6 font-semibold rounded-lg text-white">
            Lets Get Started
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-8 sm:grid-cols-2 justify-center items-center lg:grid-cols-3 mt-28">
        <div className="space-y-2 flex gap-5 items-start justify-center">
          <h2 className="text-5xl font-bold text-dark">+1354</h2>
          <p className="text-dark text-wrap text-xl w-[40%] !mt-0 !pt-0">
            Total successfully Trips done
          </p>
        </div>
        <div className="space-y-2 flex gap-5 items-start justify-center">
          <h2 className="text-5xl font-bold text-dark">$27M</h2>
          <p className="text-dark text-wrap text-xl w-[40%] !mt-0 !pt-0">
            Raised via the solutions we have
          </p>
        </div>
        <div className="space-y-2 flex gap-5 items-start justify-center">
          <h2 className="text-5xl font-bold text-dark">+124</h2>
          <p className="text-dark text-wrap text-xl w-[40%] !mt-0 !pt-0">
            Hight qualified drivers
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourBusiness;
