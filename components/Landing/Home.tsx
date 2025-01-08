"use client"

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Upload } from 'lucide-react';
import Link from 'next/link';
import EasmarkNavbar from './EasmarkNavbar';
import CTASection from './CTASection';
import BenefitsSection from './BenefitsSection';
import WhyChooseSection from './WhyChooseSection';
import HowItWorksSection from './HowItWorksSection';
import SubscriptionSection from './SubscriptionSection';
import SponsorsSection from './SponsorsSection';
import Footer from '../Footer/Footer';


const GradingLanding = () =>
{
  return (
    <>
      <div className="relative w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/background.png"
            alt="Student studying"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 mix-blend-multiply" />
        </div>

        <EasmarkNavbar />

        {/* Main Content - Responsive Centering */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] md:min-h-[600px] lg:min-h-[580px] px-4 md:px-8">
          <div className="w-full max-w-5xl mx-auto text-center">
            {/* Main Heading with Enhanced Styling */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Revolutionise Grading with
              <span className="relative inline-block mx-2">
                AI Efficiency
                <span className="absolute -right-7 md:-right-7 -top-1 md:-top-4 text-xl lg:text-2xl">✨</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                  <path
                    d="M0 4C50 4 150 4 200 4"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="#818CF8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-[1.2rem] md:text-xl lg:text-2xl text-blue-50/90 font-light mb-16 max-w-2xl mx-auto">
              Accelerate Grading and Enhance Student Engagement with Advanced AI Technology
            </p>

            {/* Buttons Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/Dashboard">
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-base font-medium shadow-lg hover:shadow-xl">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              {/* <Link href="/LearnMore">
                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-base font-medium border border-white/20">
                  Learn More
                </button>
              </Link> */}
            </div>
          </div>
        </div>

      </div>
      {/* <BenefitsSection /> */}
      <WhyChooseSection />
      <HowItWorksSection />
      <SponsorsSection />
      <CTASection />
      <SubscriptionSection />
      <Footer />
    </>

  );
};

export default GradingLanding;