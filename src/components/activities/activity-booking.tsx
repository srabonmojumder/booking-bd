"use client"

import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { EventRow } from "@/types/activity";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { toast } from "sonner";
import { bookingAddToCart } from "@/lib/actions/booking-actions";
import { useRouter } from "next/navigation";
import { generateTimeSlots } from "@/lib/utils";
import { getErrorMessage } from "@/lib/handle-error";


const FormSchema = z.object({
    start_date: z.date(),
    start_time: z.string().min(3, 'Start time required'),
})

export default function ActivityBooking({event}: {event: EventRow}) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(value: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true);

            const payload = {
                service_id: event.id,
                service_type: "event",
                step: 0,
                ...value,
                start_date: format(value.start_date, "yyyy-MM-dd")
            }

            const { data, error } = await bookingAddToCart(payload);

            if (data?.booking_code) {
              router.push(`/booking/${data?.booking_code}`);
            } else {
              toast.error(`Error: ${error}`);
            }
            
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }



    const timeSlots = generateTimeSlots('00:00', '23:30');



return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                        ) : (
                        <span>Select date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(val) => {
                            if(val) {
                                form.setValue('start_date', val, {shouldValidate: true})
                            }
                        }}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Time Slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {timeSlots.map((time) => (
                    <SelectItem value={time} key={time}>{time}</SelectItem>
                ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                "Reserve"
            )}
        </Button>
      </form>
    </Form>
)


    
}