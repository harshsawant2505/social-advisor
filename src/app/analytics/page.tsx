'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [input, setInput] = useState<string>("");

  async function concatStringWithArray(baseString: string, arr:any) {
    return `${baseString}, ${arr.join(', ')}`;
  }

  const runFlowFunction = async(message:any) => {
    try {
      const res = await axios.post<any>('/api/runFlow', {
        flowId: process.env.NEXT_PUBLIC_FLOW_ID,
        langflowId: process.env.NEXT_PUBLIC_LANG_FLOW_ID,
        inputValue: message,
        tweaks: {},
        stream: false
      });
      console.log("Response from server:");
      console.log(res);
      if ('error' in res.data) {
        throw new Error(res.data.details || res.data.error);
      }
      setData(JSON.parse(res.data.outputs[0].outputs[0].artifacts.message.slice(8,-6)));
      console.log(JSON.parse(res.data.outputs[0].outputs[0].artifacts.message.slice(8,-6)));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      console.error('Error submitting form:', err);
    }
  }

  async function fetchdata() {
    try {
      const res:any = await axios.post("/api/search", {q: input});
      console.log(res.data)
      setData(res.data.organic_results)
      runFlowFunction(await concatStringWithArray(input, res.data.organic_results.map((result: any) => result.link)));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const formatData = data?.Format ? Object.entries(data.Format).map(([name, value]) => ({
    name,
    value
  })) : [];
 
  const keyWords = data?.Word ? data.Word.split(',').map(word => word.trim()) : [];

  return (
    <div className="min-h-screen bg-gray-900 p-4 transition-all duration-300 ease-in-out">
      <Header />
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="space-y-4 animate-fadeIn">
          <Input 
            onChange={(e)=>setInput(e.target.value)} 
            placeholder='Input your type of product'
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 hover:border-blue-500 focus:border-blue-500"
          />
          <Button 
            onClick={fetchdata}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Search
          </Button>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-xl transition-all duration-300 animate-slideUp">
          <CardHeader>
            <CardTitle className="text-2xl text-white">{data?.Point}</CardTitle>
            <p className="text-gray-400">{data?.SellingPoint}</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="text-white">
              <TabsList className="mb-4 bg-gray-700">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">Overview</TabsTrigger>
                <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">Content Strategy</TabsTrigger>
                <TabsTrigger value="script" className="data-[state=active]:bg-blue-600">Marketing Script</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-white">Trending Point</h3>
                    <div className="bg-gray-700 p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.01]">
                      <p className="text-sm text-gray-200">{data?.TrendingPoint}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-white">Key Words</h3>
                    <div className="flex flex-wrap gap-2">
                      {keyWords.map(word => (
                        <span key={word} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm transform transition-all duration-300 hover:scale-[1.05]">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="animate-fadeIn">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-white mb-4">Format Priority</h3>
                    <div className="h-64 w-full bg-gray-700 rounded-lg p-4 transform transition-all duration-300 hover:scale-[1.01]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={formatData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                            itemStyle={{ color: '#E5E7EB' }}
                          />
                          <Bar dataKey="value" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-4">Marketing Tips</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {data?.Tips?.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-2 bg-gray-700 p-3 rounded-lg transform transition-all duration-300 hover:scale-[1.02]">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-200">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="script" className="animate-fadeIn">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.01]">
                    <h3 className="font-bold text-lg text-white mb-3">Video Script</h3>
                    <p className="text-sm leading-relaxed text-gray-200">{data?.Script?.TrendingScript}</p>
                    <div className="mt-2 text-sm text-gray-400">
                      Format: {data?.Script?.Format}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;