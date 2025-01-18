
'use client'
import Image from "next/image";

import axios from 'axios';




//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {
//         data&&data.map((result: any) => result.link) && data.map((result: any) => result.link).map((link: string, index: number) => (
//           <div key={index}>
//             <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
//           </div>
//         ))
//       }
//     </div>
//   );
// }

import React, { useEffect,useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, Target, Zap, MessageCircle, 
  Eye, ThumbsUp, BarChart2, Settings,
  Instagram, Youtube, Facebook
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const SocialAdAssistant = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all'); 
const query = "hair oil ad"; // Replace with your search term
const [data, setData] = useState<any>(null);



// const [input, setInput] = useState<string>("");
 const [input, setInput] = useState<string>("hair oil ad by brands blogs");


const [response, setResponse] = useState<any>(null);

async function concatStringWithArray(baseString: string, arr:any) {

  return `${baseString}, ${arr.join(', ')}`;
}
const runFlowFunction = async(message:any) => {
  try {
    const res = await axios.post<any>('/api/runFlow', {
      flowId: process.env.NEXT_PUBLIC_FLOW_ID, // Changed to NEXT_PUBLIC prefix
      langflowId: process.env.NEXT_PUBLIC_LANG_FLOW_ID, // Changed to NEXT_PUBLIC prefix
      inputValue: message,
      tweaks: {},
      stream: false
    });
    console.log("Response from server:");
    console.log(res);
    // Type guard to check if response is an error
    if ('error' in res.data) {
      throw new Error(res.data.details || res.data.error);
    }

    setResponse(res.data as any);
  } catch (err) {
    const errorMessage = err instanceof Error 
      ? err.message 
      : "An unexpected error occurred";
   
    console.error('Error submitting form:', err);
  }
}
async function fetchdata(){

  try {

    const res:any = await axios.post("/api/search", {q: input});
    console.log(res.data)
    setData(res.data.organic_results)
    runFlowFunction(await concatStringWithArray(input, res.data.organic_results.map((result: any) => result.link)));
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
 

    
} 

useEffect(() => {
  fetchdata();

}, []);

  const trendingTopics = [
    { topic: "Sustainable Living", engagement: 85, growth: 40 },
    { topic: "Tech Reviews", engagement: 75, growth: 30 },
    { topic: "Food Hacks", engagement: 90, growth: 45 },
    { topic: "Wellness Tips", engagement: 70, growth: 25 }
  ];

  const engagementData = [
    { day: "Mon", posts: 45, engagement: 82 },
    { day: "Tue", posts: 50, engagement: 85 },
    { day: "Wed", posts: 55, engagement: 90 },
    { day: "Thu", posts: 48, engagement: 88 },
    { day: "Fri", posts: 52, engagement: 86 }
  ];

  const suggestedHooks = [
    {
      title: "Problem-Solution",
      example: "Struggling with ad performance? Here's how AI changes everything...",
      engagement: "High"
    },
    {
      title: "FOMO Trigger",
      example: "While others guess, smart marketers use this tool to...",
      engagement: "Medium"
    },
    {
      title: "Social Proof",
      example: "Join 10,000+ marketers who stopped guessing and started...",
      engagement: "High"
    }
  ];

  const platformStats = [
    { name: 'Instagram', value: 35 },
    { name: 'Facebook', value: 30 },
    { name: 'YouTube', value: 25 },
    { name: 'TikTok', value: 10 }
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Ad Creation Assistant</h1>
            <p className="text-gray-400">AI-Powered Social Media Ad Insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <Instagram className="h-5 w-5 text-pink-400 cursor-pointer" />
            <Youtube className="h-5 w-5 text-red-400 cursor-pointer" />
            <Facebook className="h-5 w-5 text-blue-400 cursor-pointer" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trending Topics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendingTopics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="topic" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="engagement" fill="#4ECDC4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platform Performance */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-400" />
                Platform Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformStats}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Hooks */}
          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                AI-Suggested Hooks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {suggestedHooks.map((hook, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="h-4 w-4 mr-2 text-blue-400" />
                      <h3 className="font-semibold">{hook.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{hook.example}</p>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-2 text-green-400" />
                      <span className="text-sm text-gray-400">Engagement: {hook.engagement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-purple-400" />
                Engagement Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="engagement" stroke="#4ECDC4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <div className="mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-400" />
                Optimization Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <Eye className="h-5 w-5 mb-2 text-blue-400" />
                  <h3 className="font-semibold mb-2">Monitor Trends</h3>
                  <p className="text-sm text-gray-400">Track emerging patterns in real-time</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <Target className="h-5 w-5 mb-2 text-green-400" />
                  <h3 className="font-semibold mb-2">A/B Testing</h3>
                  <p className="text-sm text-gray-400">Test different hooks and visuals</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <MessageCircle className="h-5 w-5 mb-2 text-yellow-400" />
                  <h3 className="font-semibold mb-2">Engagement</h3>
                  <p className="text-sm text-gray-400">Optimize for audience interaction</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <TrendingUp className="h-5 w-5 mb-2 text-purple-400" />
                  <h3 className="font-semibold mb-2">Timing</h3>
                  <p className="text-sm text-gray-400">Post at peak engagement hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialAdAssistant;