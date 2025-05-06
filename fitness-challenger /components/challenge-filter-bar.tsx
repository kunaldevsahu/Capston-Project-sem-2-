"use client"

import type React from "react"

import { useState } from "react"
import { ChevronsUpDown, Filter, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useChallenges } from "@/context/challenges-context"

export default function ChallengeFilterBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const { filters, setFilters } = useChallenges()

  const categories = ["All", "Strength", "Cardio", "Flexibility", "Weight Loss", "Muscle Gain"]

  const durations = [
    { label: "7 Days", value: 7 },
    { label: "14 Days", value: 14 },
    { label: "30 Days", value: 30 },
    { label: "60 Days", value: 60 },
    { label: "90 Days", value: 90 },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters({ ...filters, search: searchTerm })
  }

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setFilters({ ...filters, category: null })
    } else {
      setFilters({ ...filters, category })
    }
  }

  const toggleDuration = (duration: number) => {
    setFilters({ ...filters, duration })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <form onSubmit={handleSearch} className="flex-1 sm:w-64">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </form>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Category</span>
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={category === "All" ? !filters.category : filters.category === category}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Duration</span>
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Duration</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {durations.map((duration) => (
              <DropdownMenuCheckboxItem
                key={duration.value}
                checked={filters.duration === duration.value}
                onCheckedChange={() => toggleDuration(duration.value)}
              >
                {duration.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
