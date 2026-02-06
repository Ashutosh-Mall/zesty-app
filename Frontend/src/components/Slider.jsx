import {motion} from "motion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Slider({images, index, setIndex, colour}) {
  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const bground = colour == "Dark" ? "bg-gray-900" : "bg-orange-400";
  const textcolour = colour == "Light" ? "text-white" : "text-grey";

  return (
    <div className="w-[270px] sm:w-[420px] h-[250px] sm:h-[360px] flex items-center justify-center">
      <button onClick={prev}>
        <ArrowBackIcon className={`${textcolour}`} />
      </button>

      <div
        className={`w-full h-full flex items-center justify-center ${bground} rounded-full overflow-hidden`}
      >
        <motion.img
          key={index}
          src={images[index]}
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5}}
          className="w-[220px] sm:w-[330px] h-[220px] sm:h-[330px] object-cover rounded-full"
          alt={`Slide ${index}`}
        />
      </div>

      <button onClick={next}>
        <ArrowForwardIcon className={`${textcolour}`} />
      </button>
    </div>
  );
}
