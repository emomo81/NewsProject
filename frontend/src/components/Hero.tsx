import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  onReadMore?: () => void
}

export function Hero({ onReadMore }: HeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const headline = 'The Future of Digital Journalism is Here'
  const words = headline.split(' ')
  return (
    <section
      ref={ref}
      className="relative h-[90vh] w-full overflow-hidden bg-editorial-black text-editorial-white"
    >
      {/* Parallax Background */}
      <motion.div
        style={{
          y,
          opacity,
        }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-black via-editorial-black/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-80"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="max-w-4xl"
        >
          <span className="inline-block py-1 px-3 border border-editorial-white/30 rounded-full text-sm font-mono mb-6 backdrop-blur-sm">
            Featured Story
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] mb-6 tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-4"
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 font-sans leading-relaxed"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.2,
              duration: 0.8,
            }}
          >
            Explore how modern storytelling is evolving through immersive
            technologies and data-driven narratives that reshape our
            understanding of the world.
          </motion.p>

          <motion.button
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1.4,
              duration: 0.5,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onReadMore}
            className="group flex items-center gap-3 bg-editorial-red text-white px-8 py-4 rounded-none font-mono font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
          >
            Read Full Story
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
