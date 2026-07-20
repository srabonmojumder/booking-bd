"use client"

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export default function VisaPriceSummery({
    isLoading,
    bookingData,
    onSubmit,
}: {
    isLoading: boolean
    bookingData: any,
    onSubmit: () => void
}) {

    const extraPrice = ((bookingData?.booking?.extra_price || []) as any[])?.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="lg:px-4 px-0 space-y-4">
        <section className=" flex-1 text-dark">
          <Card className="w-full lg:max-w-lg">
            <CardHeader className="bg-white-softGray rounded-t-lg">
              <div className="flex items-center h-16 gap-2 ps-4">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold leading-7">
                  Package Summary
                </h2>
              </div>
            </CardHeader>
  
            <CardContent className="space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-6">
                  Package Details:
                </h3>


                <div className="flex justify-between items-center">
                  <span className="text-base font-medium leading-6 text-dark-deepSlate">
                  Basic rate
                  </span>
                  <span className="text-lg">{formatPrice(Number(bookingData?.booking?.base_price || 0))}</span>
                </div>


                <div className="flex justify-between items-center">
                  <span className="text-base font-medium leading-6 text-dark-deepSlate">
                  Protection & Extra
                  </span>
                  <span className="text-lg">{formatPrice(Number(extraPrice || 0))}</span>
                </div>

              </div>
  
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white-softSlate p-4 rounded-lg ">
                  <span className=" text-base font-semibold leading-6 text-dark">
                    Total:
                  </span>
                  <span className=" text-lg font-semibold leading-6 text-dark">
                  {formatPrice(Number(bookingData?.booking?.total || 0))}
                  </span>
                </div>
              </div>
            </CardContent>
  
              <CardFooter className=" gap-4  p-4 pt-0">
                  <Button className="w-full font-semibold  h-12 bg-primary text-white hover:bg-primary/90" disabled={isLoading} onClick={onSubmit}>
                  {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                      "Book Now"
                  )}
                  </Button>
              </CardFooter>
          </Card>
        </section>
      </div>
    )
}