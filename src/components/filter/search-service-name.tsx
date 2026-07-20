"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { getAllServiceNames } from "@/lib/actions/location-action";
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchProps {
  baseUrl: string
  defaultValue?: string
  placeholder: string
  error?: string
  onChangeValue?: (value: string) => void
  inputSize?: number
  chevron?: boolean
  locationId?: number

}

export default function SearchServiceName({baseUrl, error, defaultValue, placeholder, onChangeValue, locationId, inputSize = 4, chevron = false }: SearchProps) {
  const [locations, setLocations] = React.useState<string[]>([])
  const [open, setOpen] = React.useState(false)
  const [width, setWidth] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState<string>(defaultValue || "")
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Handle click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Update width when popover opens or window resizes
  React.useEffect(() => {
    const updateWidth = () => {
      if (inputRef.current) {
        setWidth(inputRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [open])

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const { data: serviceNames } = await getAllServiceNames(baseUrl, {
          q: debouncedQuery,
          location: locationId,
          page: 1,
          per_page: 10,
        });
        setLocations(serviceNames || []);
        setSelectedIndex(-1)
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [debouncedQuery])

  const valid_locations = locations

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < valid_locations.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < valid_locations.length) {
          const selectedLocation = valid_locations[selectedIndex]
          setInputValue(selectedLocation)
          onChangeValue?.(selectedLocation)
          setOpen(false)
        }
        break
      case "Escape":
        e.preventDefault()
        setOpen(false)
        break
    }
  }

  return (
    <div className="relative flex-1 w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={cn("w-full px-3 border outline-none rounded-md font-bold text-dark text-[15px] placeholder:text-dark", inputSize ? `py-${inputSize}` : 'py-4')}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            onChangeValue?.(e.target.value)
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />


        {chevron && <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <ChevronsUpDown className="h-4 w-4 text-gray-500" />
        </div>}


      </div>

      {!!error && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-45px] mb-2 w-full max-w-sm bg-red-600 text-white py-1 px-2 shadow-lg">
          <div className="absolute top-[-7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rotate-45"></div>
          <span className="block text-sm">{error}</span>
        </div>
      )}

      {open && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg"
          style={{ width: width > 0 ? `${width}px` : "auto" }}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="space-y-1 overflow-hidden px-1 py-2">
                <Skeleton className="h-4 w-10 rounded" />
                <Skeleton className="h-8 rounded-sm" />
                <Skeleton className="h-8 rounded-sm" />
              </div>
            ) : valid_locations.length === 0 ? (
              <div className="px-2 py-3 text-sm text-gray-500">Not found!</div>
            ) : (
              valid_locations.map((location, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 cursor-pointer",
                    index === selectedIndex ? "bg-gray-100" : "hover:bg-gray-100"
                  )}
                  onClick={() => {
                    setInputValue(location)
                    onChangeValue?.(location)
                    setOpen(false)
                  }}
                >
                  <span>{location}</span>
                  <Check
                    className={cn(
                      "ml-auto",
                      location === inputValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
