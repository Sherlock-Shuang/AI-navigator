'use client';

import { useState } from 'react';
import { Search, Wifi, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOLS_DATA } from '@/data/tools';


const CATEGORIES = ["全部", "聊天", "视频", "图片", "音乐", "代码", "生产力"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [showModal, setShowModal] = useState(false);

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVisitTool = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-teal-600">AI Navigator</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filter Bar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">分类</h2>
              
              {/* Desktop Sidebar */}
              <nav className="hidden lg:block space-y-1">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-teal-50 text-teal-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>

              {/* Mobile Horizontal Scroll */}
              <div className="lg:hidden overflow-x-auto pb-2">
                <div className="flex space-x-2 min-w-max">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? 'bg-teal-50 text-teal-600 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Tool Grid */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-800">{tool.name}</h3>
                      {tool.tags.includes("代理") && (
                        <button
                          onClick={() => setShowModal(true)}
                          className="text-slate-400 hover:text-teal-500 transition-colors"
                        >
                          <Wifi className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tool.desc}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              tag === "国产"
                                ? 'bg-green-100 text-green-800'
                                : tag === "代理"
                                ? 'bg-orange-100 text-orange-800'
                                : tag === "免费"
                                ? 'bg-blue-100 text-blue-800'
                                : tag === "基础免费"
                                ? 'bg-purple-100 text-purple-800'
                                : tag === "付费"
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {tag === "国产" && "🇨🇳 "}
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleVisitTool(tool.url)}
                        className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        打开
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">没有找到相关工具</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Network Guide Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">连接状态提示</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-slate-600 mb-4">
                该工具服务器位于海外，国内直连可能会出现响应超时或无法加载的情况。
              </p>
              
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-teal-800 text-sm font-medium mb-2">
                  如需稳定访问，建议配置网络加速服务。
                </p>
                <a
                  href="/guide"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
                >
                  📄 点击获取配置教程 (提取码: 8888)
                </a>
              </div>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}