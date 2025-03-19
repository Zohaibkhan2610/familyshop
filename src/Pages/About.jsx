import React from 'react';
import { Link } from 'react-router'; // Updated import for React Router v6+
import { motion } from 'framer-motion';

const About = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="about-page min-h-screen bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="hero-section relative h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/About/About.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>
        </div>

        {/* Content on Top */}
        <motion.div
          variants={fadeInUp}
          key="hero-text"
          className="relative z-10 text-center text-white p-8 rounded-lg backdrop-blur-md bg-black/30 shadow-lg"
        >
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">About Us</h1>
          <p className="text-2xl drop-shadow-md mb-6">
            Step into Comfort and Style with Every Purchase at Family Shop
          </p>
          <Link
            to="/"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            aria-label="Shop Now"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-20 bg-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side (Text) */}
          <motion.div variants={slideInLeft} className="text-center md:text-left" key="mission-text">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At <strong>Family Shop</strong>, we believe in providing products that empower you to live life to the fullest. Our mission is to offer high-quality, stylish items that cater to your unique lifestyle—whether you're shopping for everyday essentials or special occasions.
            </p>
          </motion.div>
          {/* Right Side (Image) */}
          <motion.div variants={slideInRight} key="mission-image">
            <img
              src="/About/About1.png"
              alt="Mission"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section py-20 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side (Image) */}
          <motion.div variants={slideInLeft} key="story-image">
            <img
              src="/About/About2.png"
              alt="Our Story"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
          {/* Right Side (Text) */}
          <motion.div variants={slideInRight} className="text-center md:text-left" key="story-text">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2020, Family Shop started as a small passion project driven by a love for quality products. Over the years, we've grown into a trusted name in the industry by staying true to our values: comfort, style, and affordability. Today, we serve customers across the globe, offering a diverse range of products for every family member.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6" key="cta-title">
            Ready to Find Your Perfect Products?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg mb-8" key="cta-description">
            Explore our collection and experience the perfect blend of style and comfort at Family Shop.
          </motion.p>
          <motion.div variants={fadeInUp} key="cta-button">
            <Link
              to="/"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition duration-300 shadow-md hover:shadow-lg"
              aria-label="Explore Collection"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;