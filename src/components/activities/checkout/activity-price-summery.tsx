"use client"

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { BookingTicketType } from "@/types/activity";

export default function ActivityPriceSummery({
    isLoading,
    packages,
    selectedPackage,
    totalPrice,
    isValid,
    onSubmit,
}: {
    isLoading: boolean
    packages: BookingTicketType[]
    selectedPackage: any[]
    totalPrice: number
    isValid: boolean
    onSubmit: () => void
}) {

    return (
        <div className="lg:px-4 px-0 space-y-4">
        <section className=" flex-1 text-dark">
          <Card className="w-full lg:max-w-lg">
            <CardHeader className="bg-white-softGray rounded-t-lg">
              <div className="flex items-center h-16 gap-2 ps-4">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold leading-7">
                  {packages.length ? 'Package' : 'Price'} Summary
                </h2>
              </div>
            </CardHeader>
  
            <CardContent className="space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-6">
                  {packages.length ? 'Package' : 'Price'} Details:
                </h3>
                {selectedPackage.map((item, i) => (
                  <div className="flex justify-between items-center" key={i}>
                  <span className="text-base font-medium leading-6 text-dark-deepSlate">
                  {item.number} {item.name}
                  </span>
                  <span className="text-lg">{formatPrice(item.number * item.price)}</span>
                  </div>
                ))}
              </div>
  
              <div className="space-y-4">
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-base font-medium leading-6 text-dark-deepSlate">
                    Sub Total:
                  </span>
                  <span className=" text-base font-semibold leading-6 text-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
  
                <div className="flex justify-between items-center bg-white-softSlate p-4 rounded-lg ">
                  <span className=" text-base font-semibold leading-6 text-dark">
                    Total:
                  </span>
                  <span className=" text-lg font-semibold leading-6 text-dark">
                  {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </CardContent>
  
              <CardFooter className=" gap-4  p-4 pt-0">
                  <Button className="w-full font-semibold  h-12 bg-primary text-white hover:bg-primary/90" disabled={!isValid || isLoading} onClick={onSubmit}>
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