import React, {useState} from "react";
import bread from "../assets/Bread.webp";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import food3 from "../assets/food3.png";
import food4 from "../assets/food4.png";
import food5 from "../assets/food5.png";
import {motion, easeInOut} from "motion/react";
import Slider from "../components/Slider";
import Text from "../components/Text";

const images = [food1, food2, food3, food4, food5];

const textArr = [
  "Cravings don’t wait.",
  "Neither do we.",
  "Delivered Hot & Fast",
  "Zesty delivers before hunger wins",
  "Light"
];

const foodDescriptions = [
  [
    "Classic Indian Thali",
    "Steamed rice and soft paratha",
    "Butter, cheese & fresh salad",
    "Gulab jamun to end it sweet",
    "Dark"
  ],
  [
    "South Indian Dosa Combo",
    "Crispy dosa served hot",
    "Sambar and coconut chutney",
    "Pure South Indian taste",
    "Dark"
  ],
  [
    "Royal Non-Veg Biryani",
    "Slow cooked with rich spices",
    "Juicy meat in every bite",
    "Perfect for heavy cravings",
    "Dark"
  ],
  [
    "Cheesy Loaded Pizza",
    "Crispy baked crust",
    "Fresh toppings & sauce",
    "Melts your hunger instantly",
    "Dark"
  ],
  [
    "North Indian Thali",
    "Rice, dahi and fresh salad",
    "Balanced home-style meal",
    "Sweet gulab jamun included",
    "Dark"
  ]
];

const customerReviews = [
  [
    "Amit Sharma",
    "Absolutely loved the food",
    "Everything arrived hot and fresh",
    "Delivery was quicker than expected",
    "Light"
  ],
  [
    "Sneha Iyer",
    "Best dosa I’ve had in a long time",
    "Crispy dosa with perfect sambar",
    "Chutney tasted authentic",
    "Light"
  ],
  [
    "Rahul Khan",
    "Biryani was full of flavor",
    "Spices were perfectly balanced",
    "Meat was tender and juicy",
    "Light"
  ],
  [
    "Pooja Verma",
    "Pizza was cheesy and delicious",
    "Crust was soft and well baked",
    "Toppings were fresh",
    "Light"
  ],
  [
    "Arjun Mehta",
    "North Indian thali felt homely",
    "Dal and sabzi were well cooked",
    "Gulab jamun was soft and sweet",
    "Light"
  ]
];



const Home = () => {
  const [currentFoodIndex, setcurrentFoodIndex] = useState(1);
  const [currentReviewIndex, setcurrentReviewIndex] = useState(2);

  return (
    <div className="w-full overflow-x-hidden bg-orange-200">
      <section className="flex flex-col xl:flex-row items-center bg-gray-900 justify-center xl:gap-0 gap-15 xl:rounded-bl-[30%] pb-10 xl:pb-0 mb-10 xl:mb-0 pt-20">
        <div className="xl:w-1/2 xl:h-full xl:py-52 xl:px-30">
          <Text lines={textArr}/>
        </div>
        <div className="xl:w-1/2 xl:h-full xl:py-15 xl:pl-30 bg-gray-900 rounded-[50%]">
          <motion.img
            src={bread}
            initial={{opacity: 0, scale: 0.8}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{duration: 1.6, ease: easeInOut}}
            whileHover={{rotate: 10}}
            className="w-[260px] sm:w-[380px] lg:w-[450px] xl:w-[500px]"
            alt="Bread"
          />
        </div>
      </section>

    
      <section className="flex flex-col-reverse xl:flex-row items-center justify-center gap-10 xl:gap-0 xl:h-[500px] bg-orange-200 mb-10 xl:-mb-10 pb-10 xl:pb-0">
        <div className="xl:w-1/2 xl:h-full xl:py-15 xl:pl-35">
          <Slider
            images={images}
            index={currentFoodIndex}
            setIndex={setcurrentFoodIndex}
            colour="Dark"
          />
        </div>

        <div className="xl:w-1/2 h-full xl:py-35 xl:px-10">
          <Text lines={foodDescriptions[currentFoodIndex]}/>
        </div>
      </section>



      <section className="flex flex-col xl:flex-row items-center justify-center xl:my-0 gap-10 bg-gray-900 xl:rounded-tr-[50%] z-20 pt-15 xl:pt-0">
        <div className="xl:w-1/2 h-full xl:px-35">
          <Text lines={customerReviews[currentReviewIndex]}/>
        </div>
        <div className="xl:w-1/2 xl:h-full xl:py-20 xl:pl-30">
          <Slider
            images={images}
            index={currentReviewIndex}
            setIndex={setcurrentReviewIndex}
            colour="Light"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
