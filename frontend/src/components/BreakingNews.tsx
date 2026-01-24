import React from 'react'
import { motion } from 'framer-motion'
interface BreakingNewsProps {
  headlines: string[]
}
export function BreakingNews({ headlines }: BreakingNewsProps) {
  return (
    <div className="bg-editorial-black text-white py-3 overflow-hidden border-b-4 border-editorial-red relative z-20">
      <div className="flex items-center">
        <div className="bg-editorial-red text-white px-6 py-1 font-mono font-bold text-sm uppercase tracking-wider absolute left-0 z-10 shadow-lg">
          Breaking
        </div>

        <div className="flex overflow-hidden w-full mask-linear-fade">
          <motion.div
            className="flex whitespace-nowrap pl-32"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 30,
            }}
          >
            {[...headlines, ...headlines].map((headline, index) => (
              <span
                key={index}
                className="mx-8 font-medium flex items-center text-sm md:text-base"
              >
                <span className="w-2 h-2 bg-editorial-red rounded-full mr-4 animate-pulse"></span>
                {headline}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
