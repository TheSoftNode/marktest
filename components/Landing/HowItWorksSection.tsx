import { FC } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Laptop, Brain, FileCheck, BarChart } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

interface StepProps
{
    icon: typeof Laptop
    title: string
    description: string
    index: number
    gradient: string
    total: number
}

const steps = [
    {
        icon: Laptop,
        title: "Upload Documents",
        description: "Securely upload student papers through our enterprise-grade platform with drag-and-drop simplicity.",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Brain,
        title: "AI Analysis",
        description: "Our advanced AI algorithms analyze content using state-of-the-art natural language processing technology.",
        gradient: "from-violet-500 to-purple-500"
    },
    {
        icon: FileCheck,
        title: "Review & Adjust",
        description: "Fine-tune AI-generated assessments with our intuitive interface for maximum accuracy and fairness.",
        gradient: "from-fuchsia-500 to-pink-500"
    },
    {
        icon: BarChart,
        title: "Distribute Results",
        description: "Automatically deliver comprehensive feedback and grades through our secure distribution system.",
        gradient: "from-rose-500 to-red-500"
    }
]

const Step: FC<StepProps> = ({ icon: Icon, title, description, index, gradient, total }) =>
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
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative flex-1"
        >
            {/* Desktop Connector Line */}
            {index < total - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-gray-200 to-transparent z-0" />
            )}

            {/* Mobile Connector Line */}
            {index < total - 1 && (
                <div className="md:hidden absolute h-full w-px bg-gradient-to-b from-gray-200 to-transparent top-16 left-12 -bottom-8 z-0" />
            )}

            <div className="relative flex md:flex-col items-start gap-6 p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                {/* Icon Container */}
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0 relative z-10`}
                >
                    <div className="absolute inset-0 bg-white opacity-10 rounded-2xl" />
                    <Icon className="w-8 h-8 text-white" />
                </motion.div>

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 mb-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: 'auto' } : { width: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-gray-100 rounded-full px-4 py-1"
                        >
                            <span className="text-sm font-medium text-gray-600">Step {index + 1}</span>
                        </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
            </div>
        </motion.div>
    )
}

const HowItWorksSection: FC = () =>
{
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    })

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(useTransform(scrollYProgress, [0.3, 0.6], [0, 1]), {
        stiffness: 100,
        damping: 30
    })

    return (
        <section className="relative py-20 bg-gray-50/50">
            {/* Progress Bar */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500"
                style={{ scaleX }}
            />

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_#f8f8f8_0%,_transparent_50%)] opacity-70" />

            <div className="container mx-auto px-4 relative">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        How It
                        <span className="bg-clip-text text-transparent ml-2 bg-gradient-to-r from-blue-600 to-indigo-600">
                            Works
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Experience our streamlined grading workflow designed for maximum efficiency
                    </p>
                </motion.div>

                {/* Steps Container - Vertical on mobile, Horizontal on desktop */}
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            {...step}
                            index={index}
                            total={steps.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorksSection