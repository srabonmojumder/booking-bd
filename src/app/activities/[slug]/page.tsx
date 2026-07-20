import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookCheck,
  Hotel,
  MapPin,
  ShieldQuestion,
  SlidersHorizontal,
  SquarePlus,
} from "lucide-react";
import Link from "next/link";
import CancelationPolicy from "@/components/activities/activitiesDetails/CancelationPolicy";
import ActivitiesHighlights from "@/components/activities/activitiesDetails/Highlights";
import Inclusions from "@/components/activities/activitiesDetails/Inclusions";
import MyTickets from "@/components/activities/activitiesDetails/MyTickets";
import OperatingHours from "@/components/activities/activitiesDetails/OperatingHours";
import ActivitiesMap from "@/components/activities/activitiesDetails/ActivitiesMap";
import NeedToKnow from "@/components/activities/activitiesDetails/NeedToKnow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { notFound } from "next/navigation";
import { getActivityBySlug } from "@/lib/actions/activity-action";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import ActivityBooking from "@/components/activities/activity-booking";
import RatingBadgeHorizontal from "@/components/rating-badge-horizontal";
import BookingAttraction from "@/components/layouts/booking-attraction";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

const ActivitiesDetails = async (context: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await context.params;
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const { data, reviews, booking_data } = await getActivityBySlug(slug);

  if (!data?.id) {
    notFound();
  }


  const sellPrice = getSellPrice(data.price, data.sale_price)
  const comparePrice = getComparePrice(data.price, data.sale_price)

  const elId = "activity-checkout";

  const tabItems = [
    { value: "highlights", label: "Highlights" },
    { value: "inclusions", label: "Inclusions" },
    { value: "operating_hours", label: "Operating hours" },
    { value: "need_to_know", label: "Need to know" },
    { value: "cancellation_policy", label: "Cancellation policy" },
    { value: "location", label: "Location" },
    { value: "my_tickets", label: "My Tickets" },
    // { label: "FAQ", value: "faq" },
  ];

  const handleIcons = (value: string) => {
    switch (value) {
      case "highlights":
        return <HiOutlineSpeakerphone className="h-8 w-8 " />;
      case "inclusions":
        return <BookCheck className="h-7 w-7" />;
      case "operating_hours":
        return <SlidersHorizontal className="h-8 w-8" />;
      case "need_to_know":
        return <SquarePlus className="h-8 w-8 " />;
      case "cancellation_policy":
        return <Hotel className="h-8 w-8 " />;
      case "location":
        return <Hotel className="h-8 w-8 " />;
      case "my_tickets":
        return <ShieldQuestion className="h-8 w-8 " />;
      case "faq":
        return <ShieldQuestion className="h-8 w-8 " />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      {/*  */}
      <main className="w-[96%] sm:container m-auto min-h-screen  py-8  ">
        <div className="bg-white p-6 rounded-xl  ">
          <Link
            href="/activities"
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
          >
            Revisit the search list
          </Link>

          {/*  */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {data.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{data.address}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-5 flex-wrap sm:flex-nowrap">
              <div>
                <DiscountPriceBadge sellPrice={sellPrice} comparePrice={comparePrice} hideLabel labelClass="text-md" />
                <div className="text-sm text-gray-600">Price starts from</div>
              </div>
              <Link href={`#${elId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-bold">
                  Select Attraction
                </Button>
              </Link>
            </div>
          </div>

          {/* Rating Section */}
          <RatingBadgeHorizontal
            total={Number(data.review_data?.total_review || 0)}
            score={Number(data.review_data?.score_total || 0)}
          />

          {/* header & rating end */}
          <ImageGallery
            images={data.gallery}
            title={"Activities"}
            star_rate={0}
            review_score={Number(data.review_data?.score_total || 0)}
            alt="Activities Images"
            reviews={reviews || []}
            review_count={Number(data.review_data?.total_review || 0)}
          />
        </div>

        {/* Tabs menu */}
        <div className="flex gap-8 w-full my-6 lg:flex-row flex-col-reverse" id={elId}>
          {/* left section start */}
          <div className="lg:w-[70%] w-full rounded-lg ">
            <div className="w-full ">
              <Tabs defaultValue="highlights" className="w-full font-bold">
                <ScrollArea>
                  <TabsList className="h-auto py-2 pb-1 bg-white w-full flex-nowrap flex gap-4">
                    <div className="overflow-x-auto">
                      <TabsList className="h-auto py-2 pb-1 bg-white w-full flex-nowrap flex gap-4 overflow-x-auto ">
                        {tabItems.map((tab) => (
                          <TabsTrigger
                            key={tab?.value}
                            value={tab?.value}
                            className="group px-3 md:px-5 py-1.5 md:py-3 text-base font-bold text-muted-foreground 
                            data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent 
                            data-[state=active]:border-b-2 data-[state=active]:border-blue-600 
                            rounded-none flex flex-col items-center gap-2 md:gap-3 justify-between"
                          >
                            <span
                              className="py-1 md:py-2 px-1.5 md:px-2.5 rounded-lg 
            group-data-[state=active]:bg-[#3264FF] group-data-[state=active]:shadow-md"
                            >
                              {handleIcons(tab?.value)}
                            </span>

                            <span className="text-dark text-sm md:text-base">
                              {tab?.label}
                            </span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>

                <ScrollArea>
                  <div className="mt-5">
                    <TabsContent value="highlights" className="border-none">
                      <ActivitiesHighlights data={data} />
                    </TabsContent>

                    <TabsContent value="inclusions" className="border-none">
                      <Inclusions content={data?.include} />
                    </TabsContent>

                    <TabsContent
                      value="operating_hours"
                      className="border-none"
                    >
                      <OperatingHours operatingHours={data?.operating_hours} />
                    </TabsContent>

                    <TabsContent value="need_to_know" className="border-none">
                      <NeedToKnow
                        NeedToKnowData={data?.need_to_know}
                      />
                    </TabsContent>

                    <TabsContent
                      value="cancellation_policy"
                      className="border-none"
                    >
                      <CancelationPolicy cancelationPolicyData={data?.faqs}/>
                    </TabsContent>

                    <TabsContent value="location" className="border-none">
                      <ActivitiesMap lat={data?.map_lat} lng={data?.map_lng} />
                    </TabsContent>

                    <TabsContent value="my_tickets" className="border-none">
                      <MyTickets myTicket={data?.my_ticket} />
                    </TabsContent>
                  </div>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
              </Tabs>
            </div>
          </div>
          {/* left section ends */}

          {/* Right section start */}
          <div className="flex-1 lg:max-w-md w-full  mx-auto">
            <Card className=" px-5 py-6 bg-white rounded-lg shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg leading-6 font-semibold text-dark">
                  {data.title}
                </CardTitle>
                <p className="text-lg leading-6 font-medium text-dark">
                  {formatPrice(sellPrice)} Per Person
                </p>
              </CardHeader>
              <CardContent className="p-0 sm:p-0 mt-4">
                <ActivityBooking event={data} />
                <BookingAttraction />
              </CardContent>
            </Card>
          </div>
          {/* Right section ends */}
        </div>
      </main>
    </div>
  );
};

export default ActivitiesDetails;
