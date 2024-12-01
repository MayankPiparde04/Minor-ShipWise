import React, { useEffect, useRef, useState } from "react";
import "./Features.css"; 
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';


const Features = () => {
    const cardsContainerRef = useRef(null);
    const overlayRef = useRef(null);
    const cardsRef = useRef([]);
    const [resizeCount, setResizeCount] = useState(0);

    useEffect(() => {
        const cardsContainer = cardsContainerRef.current;
        const overlay = overlayRef.current;

        const cards = Array.from(cardsRef.current);

        const applyOverlayMask = (e) => {
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
            overlay.innerHTML = ""; // Remove all existing overlay cards
            cards.forEach((cardEl) => {
                const overlayCard = document.createElement("div");
                overlayCard.classList.add("card");
                createOverlayCta(overlayCard, cardEl.lastElementChild);
                overlay.append(overlayCard);
                observer.observe(cardEl);
            });
        };

        resetOverlay(); // Initialize overlay
        document.body.addEventListener("pointermove", applyOverlayMask);

        // Cleanup event listener on unmount
        return () => {
            document.body.removeEventListener("pointermove", applyOverlayMask);
            observer.disconnect(); // Stop observing when the component unmounts
        };
    }, [resizeCount]);

    return (
        <div className="mb-20 mt-12 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                viewport={{ once: true }}
                className="border-2 border-gray-500 container px-4 py-8">
                <motion.main
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                    viewport={{ once: true }}
                    className="flex justify-center items-center  flex-col space-y-6 p-2 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                        viewport={{ once: true }}
                        className="text-center text-wrap py-2 px-8">
                        <h1 className="text-4xl text-gray-100 font-bold">Why Choose ShipWise?</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                        viewport={{ once: true }}
                        className="text-center text-wrap py-2 px-8">
                        <p className='text-xl text-gray-200 text-center'>Discover how our packing optimization and shipping solutions can transform your logistics and reduce operational costs.</p>
                    </motion.div>
                    <div className="main__cards cards " ref={cardsContainerRef}>
                        <div className="cards__inner">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                                viewport={{ once: true }}
                                className=" card"
                                ref={(el) => (cardsRef.current[0] = el)}
                            >
                                <div className="text-4xl text-center mb-4">📦</div>
                                <h3 className="text-2xl font-semibold text-white mb-2 text-center">Optimal Carton Sizing</h3>
                                <p className="text-gray-300 text-center">Calculate the best box sizes to avoid wasted space and reduce shipping costs.</p>
                                <Link to={'/login'} className="card__cta cta">See more</Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                                viewport={{ once: true }}
                                className=" card"
                                ref={(el) => (cardsRef.current[1] = el)}
                            >
                                <div className="text-4xl text-center mb-4">🚚</div>
                                <h3 className="text-2xl font-semibold text-white mb-2 text-center">Courier Recommendations</h3>
                                <p className="text-gray-300 text-center">Choose the most cost-effective courier for each shipment with data-driven insights.</p>
                                <Link to={'/login'} className="card__cta cta">See more</Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                                viewport={{ once: true }}
                                className=" card"
                                ref={(el) => (cardsRef.current[2] = el)}
                            >
                                <div className="text-4xl text-center mb-4">♻️</div>
                                <h3 className="text-2xl font-semibold text-white mb-2 text-center">Sustainable Shipping</h3>
                                <p className="text-gray-300 text-center">Reduce packaging waste and optimize your shipping footprint.</p>
                                <Link to={'/login'} className="card__cta cta">See more</Link>

                            </motion.div>
                        </div>

                        <div className="overlay cards__inner" ref={overlayRef}></div>
                    </div>
                </motion.main>
            </motion.div>
        </div>
    );
};

export default Features;
