"use client"

import { useState } from 'react'
import { format, isBefore, startOfDay } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {Availability} from "@/types/types";

// Updated mock data for available appointments in August 2024
const appointmentData: Availability = {
  '2024-08-09': { total: 10, available: 3 },
  '2024-08-10': { total: 10, available: 5 },
  '2024-08-11': { total: 10, available: 0 },
  '2024-08-12': { total: 10, available: 7 },
  '2024-08-13': { total: 10, available: 2 },
  '2024-08-14': { total: 10, available: 4 },
  '2024-08-15': { total: 10, available: 1 },
}

export default function Component() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const isDateUnavailable = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    return (
      isBefore(date, startOfDay(new Date())) ||
      (appointmentData[dateString]?.available === 0)
    )
  }

  const renderDayContents = (day: Date) => {
    const dateString = format(day, 'yyyy-MM-dd')
    const appointmentsForDay = appointmentData[dateString]

    if (!appointmentsForDay) return day.getDate()

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full flex items-center justify-center relative">
              {day.getDate()}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" 
                   style={{width: `${(appointmentsForDay.available / appointmentsForDay.total) * 100}%`}} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Total: {appointmentsForDay.total}</p>
            <p>Available: {appointmentsForDay.available}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" alt="Vendor" />
                <AvatarFallback>VN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-muted-foreground">Professional Hair Stylist</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Experienced hair stylist with over 10 years in the industry.
                  Specializes in modern cuts and color treatments.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select a Date</CardTitle>
            <CardDescription>Choose an available date for your appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              disabled={isDateUnavailable}
              numberOfMonths={2}
              defaultMonth={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>Please fill in your details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Note for Vendor</Label>
                <Textarea id="note" placeholder="Any special requests or information for the vendor" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={!selectedDate}>
              Book Appointment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}