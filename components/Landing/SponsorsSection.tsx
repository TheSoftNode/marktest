import { motion } from 'framer-motion';
import Image from 'next/image';

const SponsorsSection = () => {
  const sponsors = [
    { name: 'AWS', logo: '/aws.jpg' },
    { name: 'Render', logo: '/render.png' },
    { name: 'Microsoft', logo: '/microsoft.png' },
    { name: 'GitHub', logo: '/github.jpeg' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-16">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-violet-100/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-sm font-medium mb-3">
            Trusted Partners
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text">
            Backed by Industry Leaders
          </h2>
        </motion.div>

        <motion.div
                className="hard-skills flex flex-wrap items-center justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
            >
                {sponsors.map((slide, index) => (
                    <motion.div
                        className="hability mx-2 mb-4"
                        key={index}
                        variants={itemVariants}
                    >
                        <motion.div
                            className="p-2 bg-white rounded-lg shadow-lg"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <img
                                src={slide.logo}
                                alt={slide.name}
                                className="md:min-w-10 md:h-16 min-w-6 h-10 object-fit"
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
      </div>
    </div>
  );
};

export default SponsorsSection;