"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EmailVerified() {
    return (
      <main className="min-h-[calc(100vh-4rem)] pt-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md">
          <motion.div 
            className="bg-white shadow-xl rounded-2xl p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
            
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Email Verified!</h1>
              <p className="text-gray-600 text-center mb-6">
                Your email has been successfully verified. You can now access all features of your account.
              </p>
  
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 
                           hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white"
              >
                <Link href="/login">
                  Go to Login
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }