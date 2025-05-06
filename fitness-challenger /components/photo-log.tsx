"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Camera, Plus } from "lucide-react"
import { getUserPhotos, uploadPhoto } from "@/lib/api"
import { useUser } from "@/context/user-context"
import type { Photo } from "@/types/user"

export default function PhotoLog() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const { user } = useUser()

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await getUserPhotos()
        setPhotos(data)
      } catch (error) {
        console.error("Error fetching photos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [user])

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return

    const file = e.target.files[0]
    try {
      const newPhoto = await uploadPhoto(file)
      setPhotos([newPhoto, ...photos])
    } catch (error) {
      console.error("Error uploading photo:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Sign in to view your progress photos</p>
      </div>
    )
  }

  // Mock photos data
  const mockPhotos = [
    {
      id: "1",
      url: "/placeholder.svg?height=300&width=300",
      date: "2023-04-01",
      caption: "Day 1 of my fitness journey",
    },
    {
      id: "2",
      url: "/placeholder.svg?height=300&width=300",
      date: "2023-05-01",
      caption: "30 days progress",
    },
    {
      id: "3",
      url: "/placeholder.svg?height=300&width=300",
      date: "2023-06-01",
      caption: "60 days progress",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Progress Photos</h3>
        <div className="relative">
          <input type="file" id="photo-upload" className="sr-only" accept="image/*" onChange={handleUploadPhoto} />
          <label htmlFor="photo-upload">
            <Button variant="outline" size="sm" className="cursor-pointer" asChild>
              <span>
                <Plus className="h-4 w-4 mr-2" />
                Add Photo
              </span>
            </Button>
          </label>
        </div>
      </div>

      {mockPhotos.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Photos Yet</h3>
            <p className="text-muted-foreground mb-4">Track your progress by adding photos of your fitness journey.</p>
            <div className="relative">
              <input
                type="file"
                id="photo-upload-empty"
                className="sr-only"
                accept="image/*"
                onChange={handleUploadPhoto}
              />
              <label htmlFor="photo-upload-empty">
                <Button className="cursor-pointer" asChild>
                  <span>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Photo
                  </span>
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockPhotos.map((photo) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <div
                  className="aspect-square rounded-md overflow-hidden cursor-pointer relative group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.caption || `Photo from ${photo.date}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <div className="text-white text-xs">{new Date(photo.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="space-y-4">
                  <img
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.caption || `Photo from ${photo.date}`}
                    className="w-full rounded-md"
                  />
                  <div>
                    <h4 className="font-medium">{new Date(photo.date).toLocaleDateString()}</h4>
                    {photo.caption && <p className="text-muted-foreground">{photo.caption}</p>}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  )
}
