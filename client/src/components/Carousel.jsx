import { useEffect, useState } from "react";

const Carousel = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(()=>{
    const interval = setInterval(()=>{
        nextSlide()
    }, 2500)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="relative w-full flex justify-center items-center max-w-lg m-auto " >
      {/* <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 text-white z-10">
        &#10094;
      </button> */}

      <div className=" flex justify-center items-center">
        <img src={images[currentIndex]} alt="Slide" className="w-full h-full object-cover rounded-md transition-all relative" />
        {/* Line Indicators */}
        <div className="flex justify-center mt-3 gap-2 absolute bottom-2  " >
          {images.map((_, index) => (
            <div key={index}
              className={`h-[3px] w-20 transition-all ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 text-white z-10">
        &#10095;
      </button> */}
      
    </div>
  );
};

export default Carousel;