import { FC } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Brain, Clock, LineChart, Shield } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

interface FeatureProps
{
    icon: typeof Brain
    title: string
    description: string
    gradient: string
    index: number
}

const features = [
    {
        icon: Brain,
        title: "AI-Powered Grading",
        description: "Utilize advanced AI algorithms to grade papers consistently and efficiently, maintaining high accuracy standards.",
        gradient: "from-rose-400 to-red-500"
    },
    {
        icon: Clock,
        title: "Quick Turnaround",
        description: "Reduce grading time by up to 75% while providing detailed feedback to each student.",
        gradient: "from-amber-400 to-orange-500"
    },
    {
        icon: LineChart,
        title: "Analytics Dashboard",
        description: "Get comprehensive insights into student performance and identify areas for improvement.",
        gradient: "from-green-400 to-emerald-500"
    },
    {
        icon: Shield,
        title: "Plagiarism Detection",
        description: "Advanced plagiarism detection system ensures academic integrity across all submissions.",
        gradient: "from-sky-400 to-blue-500"
    }
]

const Feature: FC<FeatureProps> = ({ icon: Icon, title, description, gradient, index }) =>
{
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            <div className="flex flex-col h-full p-6 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-gray-100">
                {/* Animated Gradient Border */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-300`}
                    initial={{ scale: 0.8 }}
                    animate={inView ? { scale: 1 } : { scale: 0.8 }}
                />

                {/* Icon Container */}
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-3 bg-gradient-to-r ${gradient} rounded-xl shadow-lg mb-4 w-12 h-12 flex items-center justify-center`}
                >
                    <Icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-semibold text-gray-900 mb-2"
                    >
                        {title}
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-600 leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* Hover Arrow */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <svg
                        className={`w-5 h-5 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    )
}

const WhyChooseSection: FC = () =>
{
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    })

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), {
        stiffness: 100,
        damping: 30
    })

    return (
        <section className="relative py-16 bg-gray-50">
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-amber-400 to-sky-400"
                style={{ scaleX }}
            />
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(30deg,_#f8f8f8_12%,_transparent_12.5%,_transparent_87%,_#f8f8f8_87.5%,_#f8f8f8_0)] bg-[length:8px_8px] opacity-40" />

            <div className="container mx-auto px-4 relative">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    className="text-center mb-12 max-w-3xl mx-auto"
                >
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Why Choose
                        <span className="bg-clip-text text-transparent ml-2 bg-gradient-to-r from-blue-600 to-indigo-600">
                            Easmark
                            <span className="relative top-[-16px] left-[2px] text-[0.8rem] font-extrabold">
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
                                    TM {''}
                                </span>
                                {/* Animated dot after TM */}
                                <span className="absolute -bottom-0.5 right-0 w-1 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></span>
                            </span>
                            ?
                        </span>


                    </h2>
                    <p className="text-lg text-gray-600">
                        Experience the future of grading with our cutting-edge features designed for modern educators
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <Feature key={index} {...feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseSection