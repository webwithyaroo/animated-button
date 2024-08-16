import { stagger } from "framer-motion";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useState } from "react";
const App = () => {
  const [isHovered, setisHovered] = useState(false);
  const [isMoused, setIsMoused] = useState(false);
  const [isPassedOver, setIsPassedOver] = useState(false);

  return (
    <section className="flex gap-10 max-lg:flex-col items-center bg-slate-100 justify-center h-screen">
      <ButtonOne isHovered={isHovered} setisHovered={setisHovered} />
      <ButtonTwo isMoused={isMoused} setIsMoused={setIsMoused} />
      <ButtonThree
        isPassedOver={isPassedOver}
        setIsPassedOver={setIsPassedOver}
      />
    </section>
  );
};

export default App;

//Button.jsx one
function ButtonOne({ isHovered, setisHovered }) {
  return (
    <motion.div
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
      className="flex bg-white gap-5 items-center h-20 overflow-hidden justify-center py-6 px-8 rounded-full w-[200px]  relative shadow-xl"
    >
      <motion.span
        className="w-3 h-3 rounded-full flex-shrink-0  absolute left-8 bg-black"
        initial={{ scale: 1 }}
        animate={{
          width: isHovered ? "110%" : 12,
          height: isHovered ? "230%" : 12,
          left: isHovered ? "-10%" : "32px",
          backgroundColor: isHovered ? "blue" : "black",
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      />

      <p
        className={`${
          isHovered
            ? "-translate-x-5 transition-all flex-shrink-0 text-xl ml-5 duration-300 ease-out text-white delay-[0.1] "
            : "translate-x-0 transition-all ml-5 text-xl duration-300 ease-out flex-shrink-0 text-gray-500"
        }`}
      >
        ABOUT US
      </p>
      <motion.span
        className="w-5 h-5 absolute translate-x-6 right-0 "
        initial={{ opacity: 1 }}
        animate={{
          translateX: isHovered ? "-30px" : "24px",
        }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
      >
        <img src="arrow-right.svg" />
      </motion.span>
    </motion.div>
  );
}

//Button.jsx two
function ButtonTwo({ isMoused, setIsMoused }) {
  return (
    <div
      onMouseEnter={() => setIsMoused(true)}
      onMouseLeave={() => setIsMoused(false)}
      className="text-2xl w-[200px]  h-20 py-4 px-6 rounded-full flex items-center flex-col justify-center relative overflow-hidden bg-white cursor-pointer shadow-xl"
    >
      <motion.div
        initial={{ translateY: 0 }}
        animate={{
          translateY: isMoused ? "-200%" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <p className="text-gray-500">Hover me</p>
      </motion.div>
      <motion.div
        initial={{ translateY: 0 }}
        animate={{
          translateY: isMoused ? "-100%" : 0,
          borderRadius: isMoused ? "20% 20% 0 0" : "100% 100% 0 0",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="absolute top-full left-0 w-full transition-all duration-100 ease-out h-full flex items-center justify-center bg-orange-500 rounded-full text-white "
      >
        <p>Leave me </p>
      </motion.div>
    </div>
  );
}
//Button.jsx three

function ButtonThree({ isPassedOver, setIsPassedOver }) {
  const text = "SEND A MESSAGE";
  const [scope, animate] = useAnimate();

  const handleHover = () => {
    animate(
      scope.current.querySelectorAll(".letterchar"),
      { y: -32 },
      { duration: 0.3, delay: stagger(0.02), ease: "easeOut" }
    );
    setIsPassedOver(true);
  };

  const handleMouseLeave = () => {
    animate(
      scope.current.querySelectorAll(".letterchar"),
      { y: 0 },
      { duration: 0.5, delay: stagger(0.02), ease: "easeOut" }
    );
    setIsPassedOver(false);
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      className="relative w-[250px] bg-white py-6 rounded-full flex whitespace-nowrap cursor-pointer shadow-xl"
    >
      <div className="max-h-fit overflow-hidden text-gray-500">
        <motion.div
          animate={{
            y: isPassedOver ? -30 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="scrolling-text flex gap-x-4 text-xl"
        >
          <span>LEARN MORE ABOUT US</span>
          <span>LEARN MORE ABOUT US</span>
          <span>LEARN MORE ABOUT US</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isPassedOver ? 1 : 0,
        }}
        // transition={{ delay: 0.2 }}
        className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-black rounded-full text-white"
      >
        <div ref={scope} className="overflow-hidden h-8 text-xl">
          {text.split(" ").map((word, index) => (
            <motion.span
              key={index}
              className="mr-2 "
              initial={{ y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {word.split("").map((el, idx) => (
                <motion.span
                  key={idx}
                  data-letter={el}
                  className="letterchar inline-block  relative  h-8 "
                  initial={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {el}
                  <span className=" inline-block absolute top-full  h-full left-0 cursor-pointer text-white ">
                    {el}
                  </span>
                </motion.span>
              ))}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
