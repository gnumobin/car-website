import useEmblaCarousel from "embla-carousel-react";
import "./PictureBox.scss";
import { useCallback } from "react";

import FirstPicture from "../../assets/img/car-1.png";
import SecondPicture from "../../assets/img/car-2.png";
import { ChevronLeft } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";

const PictureBox = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="picture-box">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__img-box embla__slide">
              <img
                className="embla__img"
                src={FirstPicture}
                alt="picture of car"
              />
            </div>
            <div className="embla__img-box embla__slide">
              <img
                className="embla__img"
                src={FirstPicture}
                alt="picture of car"
              />
            </div>
          </div>
        </div>
        <div className="paginate">
          <p className="paginate__text">
            <span className="bigger">1</span>
            <small className="smaller">/12</small>
          </p>
          <div className="paginate__btns">
            <button className="embla__prev embla__btn" onClick={scrollPrev}>
              <ChevronLeft sx={leftIconStyle} />
            </button>
            <button className="embla__next embla__btn" onClick={scrollNext}>
              <ChevronRight sx={rightIconStyle} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const leftIconStyle = {
  fontSize: "4rem",
  marginRight: "2.5rem",
  cursor: "pointer",
};
const rightIconStyle = {
  fontSize: "4rem",
  cursor: "pointer",
};

export default PictureBox;
