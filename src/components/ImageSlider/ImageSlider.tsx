import { useState, use } from "react";

import { type FetchImageType } from "../../App";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface FetchImgPropsInterface {
  imgPromise: Promise<FetchImageType[]>;
}

function ImageSlider({ imgPromise }: FetchImgPropsInterface) {
  const imgDataArr = use(imgPromise);
  const [currentImg, setCurrentImg] = useState<number>(0);

  const handleNext = () => {
    setCurrentImg((prevIdx) => {
      return (prevIdx = (prevIdx + 1) % imgDataArr.length);
    });
  };
  const handlePrev = () => {
    setCurrentImg((prevIdx) => {
      return (prevIdx = (prevIdx - 1 + imgDataArr.length) % imgDataArr.length);
    });
  };
  console.log(currentImg);

  return (
    <section className="w-190 h-113 flex justify-center relative mx-auto">
      {imgDataArr.length && (
        <button
          onClick={handlePrev}
          className="text-5xl absolute -left-4 top-[50%] cursor-pointer active:text-red-400"
        >
          <BsArrowLeft />
        </button>
      )}
      {imgDataArr.length > 0 ? (
        imgDataArr.map((img, idx) => {
          return (
            <div key={img.id}>
              <img
                src={img.download_url}
                alt={`Picsum pic ${img.id}`}
                className={`${currentImg === idx ? `block` : `hidden`} border border-slate-400 rounded-md w-full h-full object-cover`}
              />
            </div>
          );
        })
      ) : (
        <p>No Data Found</p>
      )}
      {imgDataArr.length && (
        <button
          onClick={handleNext}
          className="text-5xl absolute -right-4 top-[50%] cursor-pointer active:text-red-400"
        >
          <BsArrowRight />
        </button>
      )}
      <div className="indicator-container flex absolute -bottom-10">
        {imgDataArr.length > 0 &&
          imgDataArr.map((_, idx) => {
            return (
              <button
                key={idx}
                className={` ${currentImg === idx ? `bg-white` : `bg-slate-400`} cursor-pointer h-5 w-5 rounded-full ml-3`}
              ></button>
            );
          })}
      </div>
    </section>
  );
}

export default ImageSlider;
