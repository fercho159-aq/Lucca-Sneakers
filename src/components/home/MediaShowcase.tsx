'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  title: string
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/posts/03 Abril.png',
    title: 'Post 03 Abril'
  },
  {
    id: '2',
    type: 'video',
    src: '/videos/2 de Abril_compressed.mp4',
    title: 'Video 2 de Abril'
  },
  {
    id: '3',
    type: 'image',
    src: '/posts/30 de Marzo.png',
    title: 'Post 30 de Marzo'
  },
  {
    id: '4',
    type: 'image',
    src: '/posts/27 Marzo.png',
    title: 'Post 27 de Marzo'
  },
  {
    id: '5',
    type: 'video',
    src: '/videos/26 de Marzo_compressed.mp4',
    title: 'Video 26 de Marzo'
  },
  {
    id: '6',
    type: 'image',
    src: '/posts/23 Mazro.png',
    title: 'Post 23 de Marzo'
  },
  {
    id: '7',
    type: 'video',
    src: '/videos/23 Marzo_compressed.mp4',
    title: 'Video 23 de Marzo'
  },
  {
    id: '8',
    type: 'video',
    src: '/videos/Hoy Lucca_compressed.mp4',
    title: 'Hoy en Lucca'
  },
  {
    id: '9',
    type: 'video',
    src: '/videos/Lucca_Sneakers_youtube.mp4',
    title: 'Lucca Sneakers - Video Institucional'
  }
]

export default function MediaShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Infinite carousel logic
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isClient])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
  }

  const getVisibleItems = () => {
    const items = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % mediaItems.length
      items.push(mediaItems[index])
    }
    return items
  }

  if (!isClient) {
    return (
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="CONTENIDO EXCLUSIVO"
            title="NUESTROS VIDEOS Y POSTS"
          />
          <div className="h-64 flex items-center justify-center">
            <div className="text-white">Cargando...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle="CONTENIDO EXCLUSIVO"
          title="NUESTROS VIDEOS Y POSTS"
        />

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center hover:bg-[#e55a2b] transition-colors shadow-lg"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center hover:bg-[#e55a2b] transition-colors shadow-lg"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="mx-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {getVisibleItems().map((item, index) => (
                <div
                  key={`${item.id}-${currentIndex}-${index}`}
                  className="group relative bg-[#111] rounded-2xl overflow-hidden border border-[#222] hover:border-[#FF6B35] transition-all duration-300 animate-fadeIn"
                >
                  {item.type === 'image' ? (
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="relative cursor-pointer" style={{ aspectRatio: '9/16' }} onClick={() => setSelectedVideo(item.src)}>
                      <video
                        className="w-full h-full object-cover object-center"
                        preload="auto"
                        muted
                        playsInline
                        onLoadedData={(e) => {
                          const video = e.target as HTMLVideoElement
                          video.currentTime = 1 // Seek to 1 second to get a good frame
                        }}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center group-hover:from-black/30 transition-all">
                        <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#FF6B35] scale-125'
                    : 'bg-[#333] hover:bg-[#666]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="max-w-4xl w-full bg-[#111] rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-[#333]">
                <h3 className="text-white font-semibold">Video</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <video
                className="w-full"
                controls
                autoPlay
                preload="metadata"
              >
                <source src={selectedVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}