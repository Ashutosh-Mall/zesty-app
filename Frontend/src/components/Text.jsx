import { motion } from "motion/react";
import { easeInOut } from "motion/react";

const Text = ({ lines }) => {
  const theme = lines[lines.length - 1];
  const isLight = theme === "Light";
  const visibleLines = lines.slice(0, -1);

  const getTextClass = (index) => {
    if (isLight) {
      return index === 0
        ? "text-3xl sm:text-5xl text-orange-500 font-bold font-serif"
        : index === 1
        ? "text-3xl sm:text-4xl text-orange-100 font-bold font-serif"
        : index === 2
        ? "text-2xl sm:text-3xl text-orange-100 font-sans"
        : "text-lg sm:text-xl text-orange-50 font-mono";
    } else {
      return index === 0
        ? "text-3xl sm:text-5xl text-gray-900 font-bold font-serif"
        : index === 1
        ? "text-3xl sm:text-4xl text-gray-900 font-bold font-serif"
        : index === 2
        ? "text-2xl sm:text-3xl text-gray-800 font-sans"
        : "text-lg sm:text-xl text-gray-600 font-mono";
    }
  };

  return (
    <div
      className="
        w-full
        flex flex-col
        justify-center
        items-center xl:items-start
        text-center xl:text-left
        gap-4
      "
    >
      {visibleLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.4,
            ease: easeInOut,
          }}
          className={getTextClass(index)}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

export default Text;
