"use client"

export default function DotsOnDa() {
  return (
    <div className="h-screen w-full bg-card relative">
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0 h-[calc(100vh+100px)] w-[calc(100vw+100px)] bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.25)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] bg-size-[15px_15px]"
      />
      {/* Your Content/Components */}
    </div>
  )
}