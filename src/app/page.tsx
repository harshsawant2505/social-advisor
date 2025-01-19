/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React from 'react';
import { Search, Brain, BarChart3, Globe, Activity, LineChart } from 'lucide-react';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
const LandingPage = () => {
  const router = useRouter();

    const handleStart = () => {
        router.push('/analytics');
    };
  

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden ">
        <div className="absolute inset-0 bg-purple-600/10 backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-32 pb-40 relative ">
          <div className="text-center min-h-[50vh]">
            <div className="inline-block animate-float">
              
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
              ART aumatic
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Harness the power of AI to decode user behavior and craft perfect ad campaigns with real-time analytics, engagement tracking, and visual reports. Transform your marketing strategy with data-driven insights.
            </p>
            <button 
              onClick={() =>handleStart()}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105" 

            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      {/* 3D Feature Section */}
      <div className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AI-Powered Research Engine
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Search, text: "Automated data collection from multiple platforms" },
                  { icon: Brain, text: "Advanced sentiment analysis and pattern recognition" },
                  { icon: Globe, text: "Global market insights and competitor analysis" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <item.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: LineChart,
                title: "Real-time Analytics",
                description: "Track performance metrics and user behavior in real-time",
                image: "/api/placeholder/400/300"
              },
              {
                icon: Activity,
                title: "Engagement Tracking",
                description: "Monitor user interactions and conversion patterns",
                image: "/api/placeholder/400/300"
              },
              {
                icon: BarChart3,
                title: "Visual Reports",
                description: "Beautiful dashboards that tell the story behind your data",
                image: "/api/placeholder/400/300"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-900/50 p-6 hover:bg-gray-900 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Stats Section */}
      

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-purple-600/10 backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 animate-pulse"></div>
        </div>
        
       
      </div>
    </div>
    </div>

  );
};

export default LandingPage;