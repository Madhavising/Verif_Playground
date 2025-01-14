import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import gsap from "gsap";

const Loader = ({ onLoadComplete }) => {
  useEffect(() => {
    function startLoader() {
      let countElement = document.querySelector(".count p");
      let currentValue = 0;

      function updateCounter() {
        if (currentValue < 100) {
          let increment = Math.floor(Math.random() * 10) + 1;
          currentValue = Math.min(currentValue + increment, 100);
          countElement.textContent = currentValue;

          let delay = Math.floor(Math.random() * 150) + 15;
          setTimeout(updateCounter, delay);
        }
      }

      updateCounter();
    }

    startLoader();

    // GSAP animations for loader
    gsap.to(".count", { opacity: 0, delay: 2.5, duration: 0.15 });

    // Anime.js text drop animation
    const textWrapper = document.querySelector(".ml16");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter inline-block leading-tight'>$&</span>"
    );
    anime.timeline({ loop: false }).add({
      targets: ".ml16 .letter",
      translateY: [-100, 0],
      easing: "easeOutExpo",
      duration: 1500,
      delay: (el, i) => 25 * i,
    });

    // Loader animations with onComplete callback
    gsap.to(".pre-loader", {
      scale: 0.5,
      ease: "power4.inOut",
      duration: 1.2,
      delay: 2.8,
    });

    gsap.to(".loader", {
      scale: 0,
      ease: "power4.inOut",
      duration: 1.2,
      delay: 3.0,
    });

    gsap.to(".loader-bg", {
      height: "0",
      ease: "power4.inOut",
      duration: 1.2,
      delay: 3.2,
      onComplete: () => {
        document.querySelector(".loader-bg").style.display = "none"; // Hide the loader-bg after the animation
        onLoadComplete(); // Call the callback
      },
    });
  }, []);

  return (
    <div className="container">
      <div className="pre-loader fixed top-0 w-full h-full clip-path-[polygon(0%_0%,_100%_0%,_100%_100%,_0%_100%)]">
        <div className="loader absolute top-0 w-full h-full bg-black text-red-500 flex justify-center items-center">
          <div className="loader-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-center z-20">
            <div className="count flex-[2] text-right leading-none px-1 md:px-2 text-red-500 text-[6vw] md:text-[24px] animate-pulse">
              <p>0</p>
            </div>
            <div className="copy font-bold text-[4vw] md:text-[30px] leading-none text-red-500 hover:scale-110 transition-transform duration-300">
              <p className="ml16 overflow-hidden">VERiF Playground!</p>
            </div>
          </div>
        </div>
        <div className="loader-bg absolute block top-0 w-full h-full bg-black -z-10"></div>
      </div>
    </div>
  );
};

export default Loader;
