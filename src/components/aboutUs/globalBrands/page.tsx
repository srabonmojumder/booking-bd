import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const GlobalBands = () => {
  return (
    <>
      <div className="container mx-auto px-6 py-24 md:px-12 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="relative aspect-[3/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/global_bands.png"
              alt=""
              className="h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold  !leading-[110%] lg:text-6xl">
                We help global brands deliver great results
              </h1>
              <p className="text-lg  text-dark my-2">
                Take your life to the next level with Rise, built-in business
                consultation with our expert with 10+ years of experience.
              </p>
            </div>

            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 space-x-8">
                <TabsTrigger
                  value="mission"
                  className="!bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-[3px] border-transparent px-0 py-2 font-semibold text-lg text-dark"
                >
                  Our Mission
                </TabsTrigger>
                <TabsTrigger
                  value="vision"
                  className="!bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-[3px] border-transparent px-0 py-2 font-semibold text-lg text-dark"
                >
                  Our Vision
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mission" className="mt-6">
                <p className=" text-dark ">
                  Partnering with us means unlocking unparalleled technological
                  advancements tailored to fuel your growth. At
                  Paragon,dedicated being your strategic partner in success
                </p>
              </TabsContent>
              <TabsContent value="vision" className="mt-6">
                <p className=" text-dark ">
                  Our vision is to revolutionize how businesses leverage
                  technology to achieve unprecedented growth and success in the
                  global market.
                </p>
              </TabsContent>
            </Tabs>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-primary p-1 rounded-full">
                  <Check className="h-4 w-4 font-bold text-white" />
                </div>
                <span className="font-semibold text-dark">
                  Link your bank or financial account
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary p-1 rounded-full">
                  <Check className="h-4 w-4 font-bold text-white" />
                </div>
                <span className="font-semibold text-dark">
                  Easy way to view your total balance
                </span>
              </li>
            </ul>

            <Button className="bg-primary px-4 text-white font-semibold py-3 rounded-lg hover:bg-[#4361EE]">
              Lets Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalBands;
