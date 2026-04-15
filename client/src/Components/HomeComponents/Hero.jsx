import React from 'react'

const Hero = () => {
  return (
 

        <div className="w-full px-4">
      
      {/* HERO SECTION */}
      <div className="relative h-[90vh] rounded-2xl overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4')] bg-cover bg-center">
        
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative text-center text-white max-w-3xl px-4">
          
          <span className="bg-gray-700 text-xs px-3 py-1 rounded-full tracking-wide">
            WELCOME TO TICKETZ
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
            Find Your Next <br />
            <span className="text-gray-300">
              Unforgettable Experience
            </span>
          </h1>

          <p className="text-gray-300 mt-4 text-sm md:text-lg">
            Discover the best tech conferences, late-night music festivals, and
            hands-on workshops happening directly in your area. Secure your spot today.
          </p>

          {/* SEARCH BAR */}
        <input
  type="text"
  placeholder="Search events by title..."
  className="mt-6 w-full md:w-2/3 px-5 py-3 rounded-full bg-white text-black placeholder-gray-500 shadow-lg outline-none"
/>
        </div>
      </div>

    </div>
    
  )
}

export default Hero