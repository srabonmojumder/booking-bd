import { MapPin, CheckCircle } from "lucide-react";
import { TbCalendarTime } from "react-icons/tb";
import { BsBookmarkStar, BsPhone, BsCalendarX } from "react-icons/bs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { EventActivityRow } from "@/types/activity";
import RatingStar from "@/components/rating-star";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import RatingBadge from "@/components/rating-badge";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

export default function ActivitiesCard({
  activity,
  location_id,
}: { activity: EventActivityRow, location_id: number }) {

  const url = location_id ? `/activities/${activity.slug}?location_id=${location_id}` : `/activities/${activity.slug}`
  const sellPrice = getSellPrice(activity.price, activity.sale_price)
  const comparePrice = getComparePrice(activity.price, activity.sale_price)

  return (
    <Card className="card-wrapper overflow-hidden sm:p-4 border-none w-full h-auto">
      <div className="single-item flex gap-4">
        {/* Image Section */}
        <div className="single-item-media relative w-32 h-auto  sm:h-60 sm:w-32 md:w-40 lg:w-60 rounded-xl overflow-hidden">
          <Image
            src={activity.image_url || "/placeholder.svg"}
            alt={activity.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="single-item-content flex flex-1 flex-col gap-0 justify-between">
          <div className="content-wrapper flex justify-between items-stretch">
            <div className="basis-[80%]">
              <div className="flex items-center gap-1 content-top">
                <h3 className="md:text-xl text-[15px] leading-[16px] md:leading-[28px] font-semibold text-dark">{activity.title}</h3>
                {/* Rating Section */}
                <RatingStar reviewScore={activity.review_score} />
              </div>

              {/* Location */}
              <div className="content-location flex items-center gap-2 md:text-sm text-[13px] text-primary-dark mt-2">
                <MapPin className="md:h-4 md:w-4 w-3 h-3" />
                <span>{activity.address}</span>
              </div>
              {/* Services Section */}
              <div className="services flex gap-5 mt-3 text-dark text-sm">
                <div className="service-single flex items-center gap-2">
                  <BsCalendarX className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Free cancellation</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <BsBookmarkStar className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Instant confirmation</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <BsPhone className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Mobile ticket</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <TbCalendarTime className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Flexible duration</span>
                </div>
              </div>
            </div>
            <div className="content-bottom flex flex-col justify-between">
              <RatingBadge total={activity.total_review} score={activity.review_score} />
            </div>
          </div>
          <div className="mt-2">
            <DiscountPriceBadge sellPrice={sellPrice} comparePrice={comparePrice} priceAfterText="/person" />
            {/* Book Now Button */}
            <div className="text-right mt-2 content-bottom-right">
              <Link href={url}>
                <Button variant={"vcardBtn"} >
                  <CheckCircle size={12} color="#fff" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
