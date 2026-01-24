import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, ArrowRight } from 'lucide-react'
export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1500)
  }
  return (
    <section className="bg-editorial-black text-editorial-white py-20 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-gold/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-editorial-red/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <Mail className="w-12 h-12 mx-auto mb-6 text-editorial-gold" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto font-sans text-lg">
            Get the most important stories, exclusive interviews, and expert
            analysis delivered straight to your inbox every morning.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status !== 'idle'}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-6 py-4 rounded-none focus:outline-none focus:border-editorial-gold focus:ring-1 focus:ring-editorial-gold transition-all duration-300"
              />
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.button
                    key="submit"
                    initial={{
                      opacity: 0,
                      x: 10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -10,
                    }}
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-editorial-white text-editorial-black px-4 font-bold hover:bg-editorial-gold transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
                {status === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      }}
                    exit={{
                      opacity: 0,
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                  >
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-green-400"
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {status === 'success' && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="text-green-400 mt-4 font-mono text-sm"
              >
                Welcome to the inner circle.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
