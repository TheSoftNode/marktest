import { FC } from 'react'
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion'
import { Zap, User, FileCheck, Medal } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

interface BenefitProps {
  icon: typeof Zap
  title: string
  stats: string
  description: string
  index: number
  color: string
}

const benefits = [
  {
    icon: Zap,
    title: "Time Saved",
    stats: "75%",
    description: "Average reduction in grading time",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: User,
    title: "Happy Users",
    stats: "50,000+",
    description: "Educators using Easmark",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: FileCheck,
    title: "Papers Graded",
    stats: "1M+",
    description: "Documents processed monthly",
    color: "from-violet-500 to-violet-600"
  },
  {
    icon: Medal,
    title: "Accuracy Rate",
    stats: "99.9%",
    description: "Grading accuracy",
    color: "from-purple-500 to-purple-600"
  }
]

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
      delay: i * 0.1
    }
  })
}

const numberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.8
    }
  }
}

const Benefit: FC<BenefitProps> = ({ icon: Icon, title, stats, description, index, color }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="offscreen"
      animate={inView ? "onscreen" : "offscreen"}
      custom={index}
      className="relative group"
    >
      <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} p-3 mb-6 shadow-lg`}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>

        <motion.h4
          variants={numberVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          {stats}
        </motion.h4>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        />
      </div>
    </motion.div>
  )
}

const BenefitsSection: FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), {
    stiffness: 100,
    damping: 30
  })

  return (
    <section className="relative py-20 bg-gray-50">
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"
        style={{ scaleX }}
      />
      
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900"
        >
          Why Choose{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Easmark
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection