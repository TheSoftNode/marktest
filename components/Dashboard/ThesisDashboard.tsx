// "use client"

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Header } from '@/components/Dashboard/Header';
// import { staggerContainer } from '@/lib/animation';
// import { CircularProgress } from '@/components/Dashboard/CircularProgress';
// import { ScoreBreakdown } from '@/components/Dashboard/ScoreBreakdown';
// import { ScoreCard } from '@/components/Dashboard/ScoreCard';
// import { BarChart } from '@/components/Dashboard/BarChart';
// import { LiteratureReviewTips } from '@/components/Dashboard/LiteratureReviewTips';
// import { literatureReviewTips, thesisScores } from '@/app/data/thesis';


// const ThesisDashboard = () => {
//   const totalScore = thesisScores.reduce((acc, curr) => acc + curr.score, 0);

//   const handleShare = () => {
//     // Implement share functionality
//     console.log('Share clicked');
//   };

//   const handleDownload = () => {
//     // Implement download functionality
//     console.log('Download clicked');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Header aiPercentage={22} onShare={handleShare} onDownload={handleDownload} />
        
//         <motion.div 
//           variants={staggerContainer}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 lg:grid-cols-12 gap-6"
//         >
//           {/* Left Column */}
//           <div className="lg:col-span-4 space-y-6">
//             <CircularProgress data={thesisScores} totalScore={totalScore} />
//             <ScoreBreakdown scores={thesisScores} />
//           </div>

//           {/* Right Column */}
//           <div className="lg:col-span-8 space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <ScoreCard title="General Marking" score={65} total={100} />
//               <ScoreCard title="Critical Marking" score={100} total={100} />
//             </div>
//             <BarChart data={thesisScores} />
//             <LiteratureReviewTips tips={literatureReviewTips} />
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default ThesisDashboard;