import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Hero } from '../components/Hero'
import { BreakingNews } from '../components/BreakingNews'
import { ArticleCard, Article } from '../components/ArticleCard'
import { CategoryTabs } from '../components/CategoryTabs'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { Menu, Search, User, X } from 'lucide-react'

// Mock Data (Fallback)
const BREAKING_HEADLINES = [
  'Global Markets Rally as Tech Stocks Hit Record Highs',
  'New Climate Accord Signed by 150 Nations in Historic Summit',
  'Breakthrough in Quantum Computing Announced by Researchers',
  'SpaceX Successfully Launches First Commercial Mars Mission',
  'Artificial Intelligence Regulation Bill Passes Senate',
]

// ... existing mock data kept as fallback ...
const FEATURED_ARTICLES_FALLBACK: Article[] = [
  {
    id: '1',
    title: 'The Architecture of Tomorrow: Sustainable Cities',
    excerpt:
      'How urban planners are reimagining metropolitan spaces to combat climate change while improving quality of life for millions of residents.',
    category: 'Design',
    author: 'Elena Fisher',
    date: 'Oct 24, 2023',
    imageUrl:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop',
    readTime: '8 min read',
    url: '#',
  },
  /* Lines 29-57 omitted */
  {
    id: '5',
    title: 'Minimalism: A Design Philosophy',
    excerpt: 'Less is more, but better.',
    category: 'Style',
    author: 'Anna Wintour',
    date: 'Oct 20, 2023',
    imageUrl:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2070&auto=format&fit=crop',
    readTime: '3 min read',
    url: '#',
  },
]
const LATEST_NEWS_FALLBACK: Article[] = [
  {
    id: '6',
    title: 'Electric Aviation Takes Flight',
    excerpt:
      'The first commercial electric flight routes are opening this year, promising a greener future for regional travel.',
    category: 'Tech',
    author: 'David Miller',
    date: 'Oct 24, 2023',
    imageUrl:
      'https://images.unsplash.com/photo-1559067515-bf7d799b23e2?q=80&w=2070&auto=format&fit=crop',
    readTime: '6 min read',
    url: '#',
  },
  /* Lines 80-117 omitted */
  {
    id: '11',
    title: 'The Future of Remote Work',
    excerpt: 'Hybrid models are settling into permanence.',
    category: 'Work',
    author: 'Lisa Boss',
    date: 'Oct 19, 2023',
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=2070&auto=format&fit=crop',
    readTime: '4 min read',
    url: '#',
  },
]

const CATEGORIES = ['All', 'World', 'Tech', 'Culture', 'Business', 'Design', 'Science']

export function NewsHomePage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredNews, setFilteredNews] = useState<Article[]>(LATEST_NEWS_FALLBACK)
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>(FEATURED_ARTICLES_FALLBACK)
  const [breakingHeadlines, setBreakingHeadlines] = useState<string[]>(BREAKING_HEADLINES)
  const [isLoading, setIsLoading] = useState(true)

  // UI States
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Refs for scrolling
  const topStoriesRef = React.useRef<HTMLDivElement>(null)
  const latestNewsRef = React.useRef<HTMLDivElement>(null)
  const newsletterRef = React.useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [allLatestNews, setAllLatestNews] = useState<Article[]>(LATEST_NEWS_FALLBACK)

  const fetchNews = async (page = 1) => {
    try {
      if (page === 1) setIsLoading(true)
      const apiKey = process.env.REACT_APP_CURRENT_NEWS_API_KEY
      if (!apiKey) {
        setIsLoading(false)
        return
      }

      const response = await fetch(
        `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&language=en&page_number=${page}${activeCategory !== 'All' ? `&category=${activeCategory}` : ''}${searchQuery ? `&keywords=${searchQuery}` : ''}`
      )
      const data = await response.json()

      if (data.status === 'ok' && data.news) {
        const articles: Article[] = data.news.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.description,
          category: item.category[0] || 'General',
          author: item.author || 'Unknown',
          date: new Date(item.published).toLocaleDateString(),
          imageUrl: item.image && item.image !== 'None' ? item.image : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
          readTime: `${Math.ceil((item.description?.length || 0) / 200)} min read`,
          url: item.url,
        }))

        if (articles.length > 0) {
          if (page === 1) {
            setFeaturedArticles(articles.slice(0, 5))
            const remaining = articles.slice(5)
            setAllLatestNews(remaining)
            setFilteredNews(remaining)
            setBreakingHeadlines(articles.slice(0, 5).map(a => a.title))
          } else {
            setAllLatestNews(prev => [...prev, ...articles])
          }
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]) // Re-fetch when category changes

  const handleSearch = () => {
    setIsSearchOpen(false)
    fetchNews(1)
  }

  /* Deleted client-side filtering execution block as we now use API filtering */

  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchNews(nextPage)
  }





  return (
    <div className="min-h-screen bg-editorial-white text-editorial-black selection:bg-editorial-red selection:text-white">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-editorial-red origin-left z-50"
        style={{
          scaleX,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-editorial-white/90 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="focus:outline-none"
              >
                {isSearchOpen ? (
                  <X className="w-5 h-5 text-gray-500 cursor-pointer hover:text-editorial-black transition-colors" />
                ) : (
                  <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-editorial-black transition-colors" />
                )}
              </button>
            </div>

            <div className="text-3xl font-serif font-black tracking-tighter text-center absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Emmanuel News<span className="text-editorial-red">.</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="hidden md:block font-mono text-sm font-bold uppercase tracking-wider hover:text-editorial-red transition-colors"
                onClick={() => scrollToSection(newsletterRef)}
              >
                Subscribe
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => alert("User profile coming soon!")}
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>


        {/* Search Overlay */}
        {
          isSearchOpen && (
            <div className="absolute top-20 left-0 w-full bg-white p-4 shadow-md z-30 animate-in slide-in-from-top-2">
              <div className="max-w-3xl mx-auto flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 p-2 border border-gray-300 font-sans focus:outline-none focus:border-editorial-red"
                  placeholder="Search news..."
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  className="bg-editorial-black text-white px-6 py-2 font-mono uppercase font-bold hover:bg-editorial-red transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          )
        }

        {/* Mobile Menu Overlay */}
        {
          isMenuOpen && (
            <div className="fixed inset-0 bg-editorial-white z-50 p-8 flex flex-col">
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <nav className="flex flex-col gap-6 text-center">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setIsMenuOpen(false)
                    }}
                    className={`text-2xl font-serif font-bold ${activeCategory === cat ? 'text-editorial-red' : 'text-editorial-black'}`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          )
        }
      </nav >

      <main className="pt-20">
        <Hero onReadMore={() => scrollToSection(topStoriesRef)} />

        <BreakingNews headlines={breakingHeadlines} />

        {/* Top Stories Section - Asymmetric Grid */}
        <section ref={topStoriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
            className="flex items-end justify-between mb-12 border-b border-black pb-4"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Top Stories
            </h2>
            <span className="font-mono text-sm text-gray-500 uppercase tracking-wider hidden sm:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Feature - Spans 7 cols */}
            <div className="lg:col-span-7">
              {featuredArticles[0] && (
                <ArticleCard article={featuredArticles[0]} variant="large" />
              )}
            </div>

            {/* Side Grid - Spans 5 cols */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {featuredArticles.slice(1).map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section ref={latestNewsRef} className="bg-editorial-gray py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold mb-8">
                Latest News
              </h2>
              <CategoryTabs
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredNews.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>

            <div className="mt-16 text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-8 py-3 border-2 border-editorial-black font-mono font-bold uppercase tracking-wider hover:bg-editorial-black hover:text-white transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Load More Stories'}
              </button>
            </div>
          </div>
        </section>

        <div ref={newsletterRef}>
          <NewsletterSignup />
        </div>
      </main>

      <footer className="bg-editorial-black text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif font-bold mb-6">Emmanuel News.</h3>
              <p className="text-gray-400 max-w-md font-sans">
                Delivering the most important stories from around the globe with
                depth, context, and perspective.
              </p>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase tracking-wider mb-6 text-editorial-gold">
                Sections
              </h4>
              <ul className="space-y-3 text-gray-400 font-sans">
                {[
                  'World',
                  'Politics',
                  'Business',
                  'Tech',
                  'Science',
                  'Health',
                ].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase tracking-wider mb-6 text-editorial-gold">
                Company
              </h4>
              <ul className="space-y-3 text-gray-400 font-sans">
                {[
                  'About Us',
                  'Careers',
                  'Code of Ethics',
                  'Privacy Policy',
                  'Contact',
                ].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-mono">
            <p>&copy; 2024 Emmanuel News News Media. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="/" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="/" className="hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}
