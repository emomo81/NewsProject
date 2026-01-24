import React from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  imageUrl: string
  readTime: string
  url: string // Link to original article
  isLarge?: boolean
}
interface ArticleCardProps {
  article: Article
  index?: number
  variant?: 'standard' | 'large' | 'compact' | 'minimal'
}
export function ArticleCard({
  article,
  index = 0,
  variant = 'standard',
}: ArticleCardProps) {
  const navigate = useNavigate()
  const isLarge = variant === 'large'
  const isCompact = variant === 'compact'
  const isMinimal = variant === 'minimal'

  const handleCardClick = () => {
    navigate(`/article/${article.id}`, { state: { article } })
  }

  return (
    <motion.article
      onClick={handleCardClick}
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
        margin: '-50px',
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className={`group cursor-pointer flex flex-col h-full ${isMinimal ? 'border-b border-gray-200 pb-4' : ''}`}
    >
      {!isMinimal && (
        <div
          className={`overflow-hidden relative mb-4 ${isLarge ? 'aspect-[16/9]' : isCompact ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 z-10" />
          <motion.img
            src={article.imageUrl}
            alt={article.title}
            className="object-cover w-full h-full"
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
            }}
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-editorial-white text-editorial-black px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              {article.category}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-grow">
        {isMinimal && (
          <div className="mb-2">
            <span className="text-editorial-red text-xs font-mono font-bold uppercase tracking-wider">
              {article.category}
            </span>
          </div>
        )}

        <h3
          className={`font-serif font-bold leading-tight group-hover:text-editorial-red transition-colors duration-300 ${isLarge ? 'text-3xl md:text-4xl mb-3' : isCompact ? 'text-lg mb-2' : 'text-xl md:text-2xl mb-2'}`}
        >
          {article.title}
        </h3>

        {!isCompact && !isMinimal && (
          <p className="text-gray-600 line-clamp-2 mb-4 font-sans text-sm md:text-base leading-relaxed">
            {article.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center text-xs text-gray-500 font-mono pt-2">
          <span className="font-semibold text-editorial-black">
            {article.author}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {article.readTime}
          </span>

          <motion.div
            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{
              x: -10,
            }}
            whileHover={{
              x: 0,
            }}
          >
            <ArrowRight className="w-4 h-4 text-editorial-red" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
