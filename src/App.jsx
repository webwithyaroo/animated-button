import { useState } from "react";
import { useAnimate, motion } from "framer-motion";

const App = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [scope, animate] = useAnimate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Flag to track animation statek

  const handleClick = async () => {
    if (isDisabled || hasAnimated) return;
    setIsDisabled(true); // Disable the button
    setHasAnimated(true); // Set the flag to true, preventing further animations

    // Play the audio after a delay
    setTimeout(() => {
      const audio = new Audio("bell-98033.mp3");
      audio.play();
    }, 2000);

    // Update button state and run the animation sequence
    setIsClicked((prev) => {
      const newClickedState = !prev;
      animateSequence(newClickedState);
      return newClickedState;
    });
  };

  const animateSequence = async (clicked) => {
    setIsLoading(true);

    if (clicked) {
      await animate(
        scope.current,
        {
          width: "50px",
          height: "50px",
          backgroundColor: "transparent",
          color: "white",
          opacity: 1,
        },
        { duration: 0.5 }
      );
      await animate(
        scope.current,
        {
          width: "120px",
          height: "50px",
          backgroundColor: "#22C55E",
          color: "white",
          opacity: 1,
        },
        { duration: 0.5, delay: 1, type: "spring", stiffness: 200, damping: 6 }
      );
    } else {
      await animate(
        scope.current,
        { width: "120px", height: "50px", opacity: 1 },
        { duration: 0.5 }
      );
      await animate(
        scope.current,
        {
          width: "50px",
          height: "50px",
          color: "black",
          opacity: 1,
        },
        { duration: 0.5, delay: 0.5 }
      );
    }

    setIsLoading(false);
    setIsDisabled(false); // Re-enable the button after animation
  };

  return (
    <section className="bg-slate-50 text-white min-h-screen flex items-center justify-center relative">
      <motion.div
        ref={scope}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        initial={{
          width: "120px",
          height: "50px",
          color: "black",
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          damping: 10,
          stiffness: 100,
        }}
        className={`ring-2 group hover:bg-green-500 hover:text-white flex items-center justify-center rounded-full ${
          isClicked ? "ring-transparent" : "ring-green-500"
        } ${
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        } overflow-hidden`}
      >
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: isClicked ? 0 : 1 }}
          transition={{ duration: 0.001 }}
          className="text-green-500 group-hover:text-white text-base"
        >
          Subscribe
        </motion.p>

        {isLoading && (
          <div className="absolute -z-10 inset-0 flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        )}
        <motion.span
          initial={{ opacity: 0, translateY: -100 }}
          animate={{
            opacity: isClicked ? 1 : 0,
            translateY: isClicked ? 0 : 100,
          }}
          transition={{ duration: 0.5, delay: 2, ease: "easeOut" }}
        >
          <img
            src="check.svg"
            className="absolute top-1/2 left-1/2 transform w-6 h-6 -translate-x-1/2 -translate-y-1/2"
          />
        </motion.span>
      </motion.div>

      <style jsx>{`
        .spinner {
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-top: 2px solid #22c55e; /* Green color */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default App;
