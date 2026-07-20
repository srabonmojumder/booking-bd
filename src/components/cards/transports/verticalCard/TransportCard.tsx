"use client";

import { MapPin, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ITransport } from "@/types/transportTypes";
import RatingStar from "@/components/rating-star";
import { formatPrice, getSellPrice } from "@/lib/utils";
import TransportExtraService from "@/components/cards/transports/transport-extra-service";
import { useMediaQuery } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";

export default function TransportCard({ transport }: { transport: ITransport }) {
  const sellPrice = getSellPrice(transport.price, transport.sale_price);
  const isMobileDevice = useMediaQuery("(max-width: 425px)");

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();




  return (
    <>
      {!isMobileDevice ? (
        <Card className="card-wrapper car-card overflow-hidden sm:p-4 border-none w-full h-auto">
          <div className="single-item flex gap-6 md:gap-10">
            {/* Image Section */}
            <div className="single-item-media relative w-32 h-auto sm:h-64 border sm:w-32 md:w-40 lg:w-[26%] rounded-xl overflow-hidden">
              <Image src={transport.image_url} alt={transport?.title} fill className="" />
            </div>

            {/* Content Section */}
            <div className="single-item-content flex flex-1 flex-col gap-0 justify-between">
              <div className="content-wrapper flex justify-between items-stretch">
                <div className="basis-[80%]">
                  <div className="flex items-center gap-1 content-top">
                    <h3 className="md:text-xl text-[15px] leading-[16px] md:leading-[28px] font-semibold text-dark">
                      {transport?.title}
                    </h3>
                    <RatingStar reviewScore={Number(transport.review_score || 0)} />
                  </div>
                  {/* Location */}
                  <div className="content-location flex items-center gap-2 md:text-sm text-[13px] text-primary-dark mt-2">
                    <MapPin className="md:h-4 md:w-4 w-3 h-3" />
                    <span>{transport.address}</span>
                  </div>

                  {/* Services Section */}
                  {!!transport.extra_info && <TransportExtraService info={transport.extra_info} />}
                </div>

                <div className="content-bottom flex flex-col justify-between">
                  <div className="flex justify-end items-center gap-2 content-bottom-left">
                    <span className="block text-primary-dark text-sm font-sans">{transport.total_review} reviews</span>
                    <p className="bg-info rounded-sm w-9 h-10 text-white flex justify-center items-center">{transport.review_score}</p>
                  </div>
                </div>
              </div>
              <div>
                {/* Price and Book Section */}
                <div className="item-price-wrapper mt-2 sm:mt-5 flex justify-end items-start sm:items-end gap-4">
                  {/* Price Section */}
                  <div className="flex flex-col">
                    <div className="item-price text-sm font-bold">
                      {formatPrice(sellPrice)}
                      <span className="font-normal inline-block ml-1">/</span>
                      <span className="font-normal inline-block">hour</span>
                    </div>
                  </div>
                </div>
                {/* Book Now Button */}
                <div className="text-right mt-2 content-bottom-right">
                  <Link href={`/transports/${transport?.slug}?${queryString}`}>
                    <Button variant={"vcardBtn"}>
                      <CheckCircle size={12} color="#fff" />
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mobile-card car-card p-2 sm:p-4 flex justify-between items-end">
          {/* Content Section */}
          <div className="content-wrapper">
            <div className="flex items-center gap-1 content-top">
              <h3 className="md:text-xl text-[15px] leading-[16px] md:leading-[28px] font-semibold text-dark">
                {transport?.title}
              </h3>
              <RatingStar reviewScore={Number(transport.review_score || 0)} />
            </div>
            {/* Location */}
            <div className="content-location flex items-center gap-2 md:text-sm text-[13px] text-primary-dark mt-2">
              <MapPin className="md:h-4 md:w-4 w-3 h-3" />
              <span>{transport.address}</span>
            </div>
            {/* Services Section */}
            {!!transport.extra_info && <TransportExtraService info={transport.extra_info} />}
            <div className="content-bottom flex flex-col justify-between mt-3">
              <div className="flex justify-end items-center gap-2 content-bottom-left">
                <span className="block text-primary-dark text-sm font-sans">{transport.total_review} reviews</span>
                <p className="bg-info rounded-sm w-9 h-10 text-white flex justify-center items-center">{transport.review_score}</p>
              </div>
            </div>
          </div>

          <div className="single-item-media">
            <Image src={transport.image_url} alt={transport?.title} fill className="object-contain" />
            <div className="mt-5">
              {/* Price and Book Section */}
              <div className="item-price-wrapper flex gap-4">
                {/* Price Section */}
                <div className="flex flex-col">
                  <div className="item-price text-sm font-bold">
                    {formatPrice(sellPrice)}
                    <span className="font-normal inline-block ml-1">/</span>
                    <span className="font-normal inline-block">hour</span>
                  </div>
                </div>
              </div>
              {/* Book Now Button */}
              <div className="mt-2 content-bottom-right">
                <Link href={`/transports/${transport?.slug}`}>
                  <Button variant={"vcardBtn"}>
                    <CheckCircle size={12} color="#fff" />
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
