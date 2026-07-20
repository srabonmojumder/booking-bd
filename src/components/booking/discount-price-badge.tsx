import { cn, formatPrice, getDiscountPercentage } from "@/lib/utils"

export default function DiscountPriceBadge({sellPrice, comparePrice, priceAfterText, hideLabel, labelClass}: {sellPrice: number, comparePrice: number, priceAfterText?: string, hideLabel?: boolean, labelClass?: string}) {
    const discountPercentage = getDiscountPercentage(sellPrice, comparePrice)
    const hasDiscount = discountPercentage > 0

    return (
        <div className="space-y-3">
            {(!hideLabel && hasDiscount) && (
            <div className="flex items-center justify-end text-right">
                <div className="bg-pink-100 text-pink-500 px-2 py-1 rounded-l-md me-1 text-xs">Special Discount</div>
                <div className="bg-pink-500 text-white px-2 py-1 rounded-r-md font-medium text-xs">{discountPercentage}% Off</div>
            </div>
            )}
            <div className="text-right item-price">
                {hasDiscount && (
                <span className={cn(["text-pink-500 line-through me-1", labelClass ? labelClass : "text-sm"])}>
                    {formatPrice(comparePrice)}
                </span>
                )}
                <span className={cn(["text-black font-bold", labelClass ? labelClass : "text-sm"])}>
                {formatPrice(sellPrice)} <span className="text-sm font-normal">{!!priceAfterText && ` ${priceAfterText}`}</span>
                </span>
            </div>
        </div>
    )
}