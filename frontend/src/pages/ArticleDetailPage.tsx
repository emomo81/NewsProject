import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export function ArticleDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 max-w-4xl mt-8"
      >
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-6">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-8">
          {article.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 border-b pb-8">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">{article.author || 'Unknown Author'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.readTime || '5 min read'}</span>
          </div>
        </div>

        {/* Main Image */}
        {article.imageUrl && article.imageUrl !== 'None' && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        )}

        {/* Content - Since we only get excerpt/description usually, we'll display what we have 
            and link to original source if available in the data object context, 
            but using standard fields for now. 
            Note: Currents API mainly gives description. We'll simulate body or use description. 
        */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif">
          <p className="text-xl leading-relaxed mb-6 font-sans text-gray-600">
            {article.excerpt}
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 my-8">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Read the full story</h3>
            <p className="mb-4 text-blue-800">
              This is a preview of the article. You can read the full story on the original source.
            </p>
            <a 
              href={article.url} /* Assuming 'url' might be passed in article object, wait, interface didn't show url. I need to check interface again */
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Read full article on source
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
        
        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
           {['News', article.category, 'Global'].map((tag) => (
             <div key={tag} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
               <Tag className="w-3 h-3" />
               {tag}
             </div>
           ))}
        </div>

      </motion.div>
    </div>
  );
}

// Helper component for icon
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
