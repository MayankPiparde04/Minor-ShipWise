import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Features from '../components/Features';
import { StarsCanvas } from '../components/StarBackground'
import { FiPlus, FiMinus } from 'react-icons/fi';
import "../components/Features.css";
import { Link } from 'react-router-dom';
import Mission from '../assets/Mission.png';
import Vision from '../assets/Vision.png';



function About() {
  const cardsContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const cardsRef = useRef([]);
  const [resizeCount, setResizeCount] = useState(0);

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    const overlay = overlayRef.current;

    const cards = Array.from(cardsRef.current);

    const applyOverlayMask = (e) => {
      if (!cardsContainer || !overlay) return; // Safeguard to ensure elements exist
      const overlayEl = e.currentTarget;

      const x = e.pageX - cardsContainer.offsetLeft;
      const y = e.pageY - cardsContainer.offsetTop;

      overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
    };

    const createOverlayCta = (overlayCard, ctaEl) => {
      const overlayCta = document.createElement("div");
      overlayCta.classList.add("cta");
      overlayCta.textContent = ctaEl.textContent;
      overlayCta.setAttribute("aria-hidden", true);
      overlayCard.append(overlayCta);
    };

    // Throttling ResizeObserver callback to prevent infinite loops
    const observer = new ResizeObserver((entries) => {
      let shouldUpdate = false;

      entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        // Check if the dimensions have changed
        if (overlay.children[cardIndex]) {
          const overlayCard = overlay.children[cardIndex];
          const currentWidth = overlayCard.style.width.replace("px", "");
          const currentHeight = overlayCard.style.height.replace("px", "");

          if (currentWidth !== width || currentHeight !== height) {
            overlayCard.style.width = `${width}px`;
            overlayCard.style.height = `${height}px`;
            shouldUpdate = true;
          }
        }
      });

      // Only trigger state update if dimensions have changed
      if (shouldUpdate) {
        setResizeCount((prevCount) => prevCount + 1);
      }
    });

    // Reset the overlay to match exactly the number of cards
    const resetOverlay = () => {
      if (!overlay || !overlayRef.current) return; // Check if overlay exists
      overlayRef.current.innerHTML = ""; // Remove all existing overlay cards
      cards.forEach((cardEl) => {
        const overlayCard = document.createElement("div");
        overlayCard.classList.add("card");
        createOverlayCta(overlayCard, cardEl.lastElementChild);
        overlayRef.current.append(overlayCard);
        observer.observe(cardEl);
      });
    };

    if (cardsContainer) {
      resetOverlay(); // Initialize overlay
      document.body.addEventListener("pointermove", applyOverlayMask);
    }

    // Cleanup event listener and observer on unmount
    return () => {
      document.body.removeEventListener("pointermove", applyOverlayMask);
      observer.disconnect(); // Stop observing when the component unmounts
    };
  }, [resizeCount]);


  const Reviews = ({ quote, author }) => (
    <div className="bg-gray-900 bg-opacity-50 p-6 border-2 border-gray-500 shadow-lg my-4">
      <p className="text-gray-200 italic">"{quote}"</p>
      <p className="text-gray-300 font-bold text-right mt-2">– {author}</p>
    </div>
  );

  const [openIndex, setOpenIndex] = useState(null);

  // Array of questions and answers
  const faqData = [
    {
      question: 'How can I update the carton inventory?',
      answer: `Users can easily update their inventory by navigating to the Dashboard. Here, you’ll find an Inventory Update page where you can add multiple box dimensions currently available in your stock or office. This flexibility allows you to customize your carton options based on availability and shipping requirements.`,
    },
    {
      question: 'How does the buffer size feature help in protecting my products?',
      answer: `Buffer size is essential for protecting fragile items during transit. Users often ship products made of various materials like glass, plastic, metal, wood, and composites, each requiring different care levels. The system leaves a specified space (buffer) between the product and the carton’s inner walls. This space allows you to add protective materials like foam, bubble wrap, or paper to absorb shocks that cartons may experience during handling and transportation.`,
    },
    {
      question: 'How does the shipping filter work?',
      answer: `The shipping filter lets you sort available transportation options by price or shipping time. This feature is similar to popular travel apps, like Skyscanner, which show either the least expensive or the fastest options. By choosing between cost-effective and time-efficient shipping, you can prioritize based on your specific needs, whether it’s saving on shipping costs or speeding up delivery.`,
    },
    {
      question: 'What product details are needed to find the optimal carton size and orientation?',
      answer: (
        <div>
          <p>To determine the best carton size and packing orientation, you’ll need to provide the following details:</p>
          <ol className="list-decimal pl-5 mt-2 text-gray-700 dark:text-gray-200">
            <li>Product Shape (e.g., cube, cuboid, sphere, cylinder).</li>
            <li>Unit of Measurement for dimensions (e.g., inches, centimeters).</li>
            <li>Dimensions of the product based on its shape (e.g., radius and height for a cylinder, side length for a cube).</li>
            <li>Weight of Each Product to ensure the carton’s weight limit is respected.</li>
            <li>Quantity of the products being shipped.</li>
          </ol>
          <p className="mt-2">
            These inputs allow the algorithm to choose the best-fitting carton and arrange products to minimize space and shipment costs.
          </p>
        </div>
      ),
    },
    {
      question: 'Can I add multiple items with varied sizes in a single carton?',
      answer: `Currently, our system is optimized for packing products of the same dimensions and shape in each carton. In future updates, we plan to add multi-item packing capability, allowing you to efficiently pack various items within the same carton while minimizing wasted space.`,
    },
  ];

  // Toggle open/close for FAQ items
  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20 ">
        <div className="bg-gradient-to-b from-gray-950 to-gray-900">
          <StarsCanvas />

          {/* Hero Section */}
          <div>
            <motion.section
              className="w-full h-screen bg-cover bg-center relative text-white"
              // style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070')" }}
              // style={{ backgroundImage: "url('https://picsum.photos/seed/picsum/2400/2400')" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 25 }}
              viewport={{ once: true }}
            >
              {/* <div className="absolute inset-0 bg-black opacity-80"></div> */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
                <h1 className="text-5xl font-bold mb-6">Smart Shipping Solutions for the Modern Business</h1>
                <p className="mt-4 text-2xl mb-6">Optimize packaging, reduce costs, and ship efficiently with ShipWise.</p>
                <p className="mt-4 mx-16 text-lg px-40 mb-8">
                  At ShipWise, we make shipping smarter and more economical. Our platform analyzes carton sizes and recommends the most cost-effective couriers, helping you save time, reduce costs, and ship with precision.
                </p>
                <Link href="/login" className="mt-8 rounded px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[4px_4px_4px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                  Get Started with ShipWise
                </Link>
              </div>
            </motion.section>
          </div>

          {/* About ShipWise Section */}
          <div className="flex justify-center  my-8 items-center">
            <motion.section
              className="py-16 bg-gray-900 bg-opacity-50 border-2 border-gray-500 px-4 container gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 25 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold text-center text-gray-200">About ShipWise</h2>
              <div className="mt-4 max-w-4xl mx-auto text-center text-gray-300">
                <p className=' text-2xl'>
                  ShipWise was born from the need for smarter, streamlined shipping. As businesses face increasing costs and environmental concerns, our platform provides a solution that balances efficiency, cost savings, and environmental responsibility. By automating and optimizing packing and courier choices, ShipWise makes shipping a hassle-free experience.
                </p>
                <p className="mt-4 text-2xl">
                  We believe that efficiency and sustainability should go hand in hand. Our team is dedicated to continuous improvement, always exploring new technologies and methods to help businesses ship smarter and blueer. With ShipWise, you’re not just shipping products—you’re joining a movement towards a more efficient, eco-friendly future.
                </p>
              </div>
            </motion.section>
          </div>

          <div> {/* Mission Section */}
            <div className="flex justify-center my-8 items-center px-4">

              <motion.section
                className="flex flex-col md:flex-col lg:flex-row border-2 border-gray-500 items-center bg-gray-900 bg-opacity-50 shadow-lg p-6 container w-full gap-8 group"  // Added 'group' class here
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 px-6 md:px-12 mx-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">Our Mission</h2>
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
                    To develop an innovative algorithm-based system that streamlines the carton packing process. By optimizing space utilization, selecting the most efficient shipping methods, and integrating user-friendly features, we empower businesses to reduce packaging waste, cut down on transportation costs, and make informed decisions on courier services, all while contributing to a blueer future.
                  </p>
                </div>
                <div className="flex w-[500px] h-auto justify-center items-center p-6">
                  <img
                    src={Mission}
                    alt="Mission"
                    className=" relative z-10 w-full border border-gray-600 shadow-lg"
                  />
                </div>
              </motion.section>
            </div>

            {/* Vision Section */}
            <div className="flex justify-center my-8 items-center px-4">

              <motion.section
                className="flex flex-col md:flex-col lg:flex-row border-2 border-gray-500 items-center bg-gray-900 bg-opacity-50 shadow-lg p-6 container w-full gap-8 group"  // Added 'group' class here as well
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                viewport={{ once: true }}
              >
                <div className="flex w-[500px] h-auto justify-center items-center p-6">
                  <img
                    src={Vision}
                    alt="Vision"
                    className="relative z-10 w-full border border-gray-600 shadow-lg"
                  />
                </div>
                <div className="flex-1 px-6 md:px-12 mx-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">Our Vision</h2>
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
                    To revolutionize the global shipping process by providing an intelligent, cost-effective, and environmentally sustainable solution for optimal product packing. We aim to reduce waste, minimize shipping costs, and lower carbon emissions, ultimately creating a more efficient and eco-friendly logistics industry that benefits businesses and the environment alike.
                  </p>
                </div>
              </motion.section>

            </div>
          </div>


          <Features className='z-50' />
          {/* Sustainability Section */}
          <div className="flex justify-center my-8 items-center">
            <motion.section
              className="py-16 bg-gray-900 bg-opacity-50 px-4 container border-2 border-gray-500 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 25 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold text-center text-gray-200">Sustainability Matters</h2>
              <p className="mt-4 text-xl text-center text-gray-100 px-12 mx-40">
                ShipWise plays a pivotal role in advancing sustainability within the logistics and shipping industry. By leveraging its intelligent packing algorithm, ShipWise minimizes the use of excess packaging materials, reducing environmental waste at its source. Its ability to optimize space utilization ensures that fewer cartons and shipments are required, leading to a significant reduction in fuel consumption and carbon emissions. The platform’s weight limit checks prevent overloading, reducing wear and tear on transport vehicles and further supporting eco-friendly practices. ShipWise also incorporates buffer space for protective materials, suggesting their optimal use to avoid unnecessary waste. By enabling businesses to adopt more efficient, cost-effective, and sustainable shipping methods, ShipWise aligns operational goals with the global mission for environmental responsibility.              </p>
            </motion.section>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            viewport={{ once: true }}
            className="flex relative justify-center my-8 items-center">
            <div className="space-y-4 container mt-6">
              <div className="mb-6 flex justify-center items-center">
                <p className="text-5xl text-white font-semibold">Frequently Asked Questions</p>
              </div>

              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="border-l-4 border-teal-400 bg-gray-900 bg-opacity-70 p-6 rounded-md"
                >
                  <div
                    className="flex cursor-pointer items-center justify-between gap-1.5"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index ? 'true' : 'false'}
                  >
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3 dark:bg-gray-800 dark:text-white">
                      {openIndex === index ? (
                        <FiMinus className="transition-transform duration-300" />
                      ) : (
                        <FiPlus className="transition-transform duration-300" />
                      )}
                    </span>
                  </div>

                  {openIndex === index && (
                    <div className="mt-4 leading-relaxed text-gray-700 dark:text-gray-200 border p-2 rounded-lg border-teal-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="min-h-screen flex flex-col relative">
            <div className="flex justify-center items-center">
              <motion.section
                className="py-16 bg-gray-900 bg-opacity-50 border-2 border-gray-500 px-4 container gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-semibold text-center text-gray-200">What Our Customers Say</h2>
                <div className="mt-8 max-w-2xl mx-auto">
                  <Reviews quote="ShipWise has streamlined our packaging process, saving us significant costs each month!" author="Business Owner" />
                  <Reviews quote="Our shipping is faster, and the 3D visualization helps us understand space better." author="Warehouse Manager" />
                </div>
              </motion.section>
            </div>

            {/* Footer CTA Section */}
            <div className='flex justify-center py-2 '>
              <motion.section
                className="py-2 px-8 text-white text-center container border border-gray-500 my-4 mb-8 gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                viewport={{ once: true }}
              >
                <div className="container px-5 py-24 mx-auto flex items-center bg-opacity-50">
                  <div className="lg:w-3/5 md:w-1/2 pr-0 lg:pr-0 text-white">
                    <h2 className="text-4xl font-semibold">Ready to make shipping smarter?</h2>
                    <p className="mt-4">Join us on the path to efficient, eco-friendly shipping.</p>
                  </div>

                  <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-white text-2xl font-medium title-font mb-5">Join Us</h2>

                    <div className=" mb-4">
                      <label htmlFor="full-name" className="leading-7 text-md text-gray-200">Full Name</label>
                      <input type="text" id="full-name" name="full-name" className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                    </div>

                    <div className=" mb-4">
                      <label htmlFor="email" className="leading-7 text-md text-gray-200">Email</label>
                      <input type="email" id="email" name="email" className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                    </div>

                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 hover:bg-opacity-70 rounded bg-opacity-50 text-lg transition duration-200">Join us</button>

                    <p className="text-xs text-gray-500 mt-3">
                      <input type="checkbox" id="terms" className="mr-2" required /> I agree to the <a href="/" className="text-indigo-400">Terms & Conditions</a>
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;