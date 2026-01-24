import React from 'react'
import { motion } from 'framer-motion'
interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}
export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 mb-8 pb-1">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-6 py-3 text-sm md:text-base font-mono font-medium uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${activeCategory === category ? 'text-editorial-black' : 'text-gray-400 hover:text-gray-600'}`}
        >
          {category}
          {activeCategory === category && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-editorial-black"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
