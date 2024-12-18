"use client"

import {ChangeEvent, useState} from "react"
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {BriefcaseIcon, ListOrderedIcon, SearchIcon, StarIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Vendors = () => {
    const pathname = usePathname();
    const vendors = [
        {
            id: 1,
            name: "Jane Doe Photography",
            location: "New York, NY",
            description: "Professional photographer specializing in portraits, events, and product photography.",
            rating: 4.8,
            completedGigs: 342,
            image: "/images/business.jpg",
        },
        {
            id: 2,
            name: "Acme Web Design",
            location: "San Francisco, CA",
            description: "Award-winning web design agency creating modern, responsive websites.",
            rating: 4.6,
            completedGigs: 215,
            image: "/images/business.jpg",
        },
        {
            id: 3,
            name: "Fitness Guru Personal Training",
            location: "Chicago, IL",
            description: "Certified personal trainers helping clients achieve their fitness goals.",
            rating: 4.9,
            completedGigs: 412,
            image: "/images/business.jpg",
        },
        {
            id: 4,
            name: "Harmony Catering",
            location: "Miami, FL",
            description: "Gourmet catering service for corporate events, weddings, and private parties.",
            rating: 4.7,
            completedGigs: 289,
            image: "/images/business.jpg",
        },
        {
            id: 5,
            name: "Bloom Floral Design",
            location: "Seattle, WA",
            description: "Artisanal floral arrangements for all occasions, from weddings to corporate events.",
            rating: 4.8,
            completedGigs: 178,
            image: "/images/business.jpg",
        },
        {
            id: 6,
            name: "Tech Wizards IT Support",
            location: "Houston, TX",
            description: "Reliable IT support and managed services for small to medium-sized businesses.",
            rating: 4.6,
            completedGigs: 301,
            image: "/images/business.jpg",
        },
    ]
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredVendors, setFilteredVendors] = useState(vendors)
    const [sortBy, setSortBy] = useState("rating")

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {

        const term = event.target.value.toLowerCase()
        setSearchTerm(term)
        setFilteredVendors(
            vendors.filter(
                (vendor) =>
                    vendor.name.toLowerCase().includes(term) ||
                    vendor.location.toLowerCase().includes(term) ||
                    vendor.description.toLowerCase().includes(term),
            ),
        )
    }

    const sortedVendors = filteredVendors.sort((a, b) => {
        if (sortBy === "rating") {
            return b.rating - a.rating
        } else if (sortBy === "completedGigs") {
            return b.completedGigs - a.completedGigs
        }
        return 0
    })

    const [topReviews, setTopReviews] = useState([
        {
            id: 1,
            name: "John Doe",
            rating: 5,
            review:
                "I had an amazing experience working with Jane Doe Photography. The photos turned out beautifully, and they were so professional and easy to work with.",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            rating: 4.5,
            review:
                "Acme Web Design did a fantastic job on my company's website. They were responsive, creative, and delivered exactly what I was looking for.",
        },
        {
            id: 3,
            name: "Michael Smith",
            rating: 5,
            review:
                "Fitness Guru Personal Training has been a game-changer for me. The trainers are knowledgeable, motivating, and really helped me reach my fitness goals.",
        },
    ])
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Vendor Directory</h1>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <ListOrderedIcon className="w-4 h-4"/>
                                Sort by: {sortBy === "rating" ? "Rating" : "Completed Gigs"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="completedGigs">Completed Gigs</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVendors.map((vendor) => (
                    <Card key={vendor.id} className="p-4 flex flex-col">
                        <div className="flex-shrink-0">
                            <Image
                                src="/images/business.jpg"
                                alt={vendor.name}
                                width={200}
                                height={150}
                                className="rounded-md object-cover w-full aspect-[4/3]"
                            />
                        </div>
                        <div className="flex-1 mt-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{vendor.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <StarIcon className="w-4 h-4 fill-primary"/>
                                    <span>{vendor.rating}</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground line-clamp-2">{vendor.description}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{vendor.location}</span>
                                <span>
                  <BriefcaseIcon className="w-4 h-4 mr-1"/>
                                    {vendor.completedGigs} gigs
                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href="/vendors/appointment/" >
                                <Button size="sm" className="w-full">
                                    Book Appointment
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Top Customer Reviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {topReviews.map((review) => (
                        <Card key={review.id} className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarImage src="/placeholder-user.jpg"/>
                                        <AvatarFallback>{review.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{review.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <StarIcon className="w-4 h-4 fill-primary"/>
                                    <span>{review.rating}</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground line-clamp-3">{review.review}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Vendors