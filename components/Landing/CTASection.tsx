import { FC } from 'react'
import { Zap, BookOpen } from 'lucide-react'

interface CTAButton {
  label: string
  icon: JSX.Element
  primary?: boolean
  onClick: () => void
}

const CTASection: FC = () => {
  const handleTrialClick = () => {
    // Implement trial signup logic
    console.log('Starting free trial')
  }

  const handleDemoClick = () => {
    // Implement demo scheduling logic
    console.log('Scheduling demo')
  }

  const buttons: CTAButton[] = [
    {
      label: 'Start Free Trial',
      icon: <Zap className="w-5 h-5" />,
      primary: true,
      onClick: handleTrialClick,
    },
    {
      label: 'Schedule Demo',
      icon: <BookOpen className="w-5 h-5" />,
      onClick: handleDemoClick,
    },
  ]

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
    {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"> */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Grading Process?
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Join thousands of educators who have already revolutionized their assessment workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button) => (
              <button
                key={button.label}
                onClick={button.onClick}
                className={`${
                  button.primary
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-transparent border border-white text-white hover:bg-white/10'
                } px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2`}
              >
                {button.icon}
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTASection