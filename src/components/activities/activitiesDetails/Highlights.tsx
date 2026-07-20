import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { AppWindowMac } from 'lucide-react'
import CancelationPolicy from "@/components/activities/activitiesDetails/CancelationPolicy";
import Inclusions from "@/components/activities/activitiesDetails/Inclusions";
import MyTickets from "@/components/activities/activitiesDetails/MyTickets";
import OperatingHours from "@/components/activities/activitiesDetails/OperatingHours";
import ActivitiesMap from "@/components/activities/activitiesDetails/ActivitiesMap";
import NeedToKnow from "@/components/activities/activitiesDetails/NeedToKnow";

const ActivitiesHighlights = ({data}: {data: any} ) => {

    return (
        <div>
            <Card className="w-full border-none">
                <Accordion type="single" collapsible defaultValue="policies">
                    <AccordionItem value="policies" className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <AppWindowMac color="blue" className="h-10 w-10 bg-blue-50 p-2 rounded-lg" />
                                <span className="text-lg leading-[26px] font-semibold">Highlights</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 font-inter">
                            <div className="w-full">
                                <article className="prose prose-slate prose-lead:text-secondary-foreground dark:prose-invert xl:prose-md w-full mx-auto max-w-4xl">
                                    <div className="text-base font-normal leading-7" dangerouslySetInnerHTML={{ __html: data?.content }} />
                                </article>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
            <div className='pt-5'>
                <Inclusions 
                    content={data?.include} 
                />
            </div>
            <div className='pt-5'>
                <OperatingHours
                    operatingHours={data?.operating_hours}
                />
            </div>
            <div className='pt-5'>
                <NeedToKnow
                    NeedToKnowData={data?.need_to_know}
                />
            </div>
            <div className='pt-5'>
                <CancelationPolicy 
                    cancelationPolicyData={data?.faqs}
                />
            </div>
            <div className='pt-5'>
                <ActivitiesMap 
                    lat={data?.map_lat} 
                    lng={data?.map_lng}
                />
            </div>
            <div className='pt-5'>
                <MyTickets 
                    myTicket={data?.my_ticket} 
                />
            </div>
        </div>
    )
}

export default ActivitiesHighlights