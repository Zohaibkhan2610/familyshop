import React from 'react';
import { Link } from 'react-router'; // Updated import for React Router v6+
import { motion } from 'framer-motion';

const Services = () => {
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
      className="services-page min-h-screen bg-gray-50"
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
            backgroundImage: "url('Services/hero.png')", // Replace with your image path
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
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">Our Services</h1>
          <p className="text-2xl drop-shadow-md mb-6">
            Discover the exceptional services we offer to make your shopping experience seamless.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="services-section py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            key="services-title"
          >
            What We Offer
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Service Card 1 */}
            <motion.div
              variants={slideInLeft}
              className="service-card bg-gray-100 p-8 rounded-lg shadow-lg text-center"
              key="service-1"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Customization</h3>
              <p className="text-gray-700 leading-relaxed">
                Personalize your products with custom designs, sizes, and colors to suit your unique style.
              </p>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              variants={fadeInUp}
              className="service-card bg-gray-100 p-8 rounded-lg shadow-lg text-center"
              key="service-2"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Fast Delivery</h3>
              <p className="text-gray-700 leading-relaxed">
                Enjoy quick and reliable delivery services to get your favorite products right at your doorstep.
              </p>
            </motion.div>

            {/* Service Card 3 */}
            <motion.div
              variants={slideInRight}
              className="service-card bg-gray-100 p-8 rounded-lg shadow-lg text-center"
              key="service-3"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Our dedicated support team is available around the clock to assist you with any queries or concerns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            key="testimonials-title"
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Testimonial 1 */}
            <motion.div
              variants={slideInLeft}
              className="testimonial-card bg-white p-8 rounded-lg shadow-lg"
              key="testimonial-1"
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                "Family Shop has been a game-changer for me! Their customization service is top-notch, and the delivery was super fast."
              </p>
              <h4 className="text-lg font-bold text-gray-800">- Jane Doe</h4>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              variants={slideInRight}
              className="testimonial-card bg-white p-8 rounded-lg shadow-lg"
              key="testimonial-2"
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                "The 24/7 customer support is incredible. I had an issue late at night, and they resolved it within minutes!"
              </p>
              <h4 className="text-lg font-bold text-gray-800">- John Smith</h4>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold mb-6"
            key="cta-title"
          >
            Ready to Experience Our Services?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg mb-8"
            key="cta-description"
          >
            Explore our services and enjoy a seamless shopping experience with Family Shop.
          </motion.p>
          <motion.div variants={fadeInUp} key="cta-button">
            <Link
              to="/Contact"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition duration-300 shadow-md hover:shadow-lg"
              aria-label="Get in Touch"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;