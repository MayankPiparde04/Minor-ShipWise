import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Boxes, PackageSearch } from 'lucide-react';
import BenefitsSection from '../components/BenefitsSection';
import Features from '../components/Features';
import { StarsCanvas } from '../components/StarBackground';
import Team from '../components/Team';
import Logo from '../assets/HeroLogo.webp';

function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <div className="bg-gray-950">
          <StarsCanvas />
          
          {/* Hero Section */}
          <div className="relative mt-8 z-10 flex flex-col justify-center items-center w-full h-screen gap-8 overflow-hidden min-h-full">
            <motion.section
              className="pt-20 lg:px-20 py-20 md:py-24 lg:py-20 w-full h-full bg-cover bg-center relative text-white flex flex-col lg:flex-row overflow-hidden items-center justify-between px-6 md:px-12 space-y-10 md:space-y-0"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 25 }}
              viewport={{ once: true }}
            >
              {/* Left Content */}
              <div className="text-center z-20 md:text-left p-2 md:pb-10 relative h-full lg:w-2/3 flex flex-col justify-center items-center lg:items-start">
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-indigo-950/15 border border-indigo-500/30 text-sm rounded-full font-medium mb-6 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                >
                  <span className="mr-2">✨</span>
                  <span className="bg-gradient-to-r from-indigo-400 to-teal-400 text-transparent bg-clip-text font-semibold">
                    Minimizing Waste, Maximizing Savings
                  </span>
                </motion.div>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                >
                  Your{' '}
                  <span className="bg-gradient-to-r from-indigo-700 to-teal-500 text-transparent bg-clip-text">
                    Smart Shipping Partner
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl sm:text-2xl mb-4 text-indigo-100 font-light"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                >
                  Shipping Smart, Reducing Waste.
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg font-light mb-8 text-gray-300 max-w-lg sm:max-w-xl mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                >
                  ShipWise makes shipping smarter by optimizing carton sizes and selecting
                  cost-effective couriers to reduce costs and environmental impact.
                </motion.p>

                {/* Action Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start relative z-30">
                  <Link
                    to="/auth/login"
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 rounded-lg text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <PackageSearch className="w-5 h-5" />
                    Get Started
                  </Link>
                  <Link
                    to="/about"
                    className="px-8 py-4 bg-gray-900/50 hover:bg-gray-900/70 border border-indigo-500/30 rounded-lg text-white font-semibold backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Boxes className="w-5 h-5" />
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative z-10 md:ml-10 mt-8 lg:mt-0">
                <motion.img
                  src={Logo}
                  alt="Smart Shipping Partner Logo"
                  className="w-[300px] sm:w-[300px] md:w-[500px] lg:w-[550px] h-auto mx-auto"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                  loading="lazy"
                />
              </div>
            </motion.section>
          </div>

          {/* Other Sections */}
          <Team />
          <BenefitsSection />
          <Features />
        </div>
      </div>
    </main>
  );
}

export default Home;
