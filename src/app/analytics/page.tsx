'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const Dashboard = () => {

//   const data = {
//     "Point": "Hair oil benefits and usage",
//     "TrendingPoint": "Hair oil benefits and usage #longhair #haircare #naturalremedies",
//     "Word": ["hair oil", "benefits", "growth", "healthy", "natural"],
//     "SellingPoint": "Achieve luscious, healthy hair with our natural hair oil, enriched with essential nutrients for maximum growth and shine.",
//     "Format": {
//       "Image": 6,
//       "Video": 5,
//       "Text": 4,
//       "Responsive": 3,
//       "Carousel": 2,
//       "Collection": 1
//     },
//     "Script": {
//       "TrendingScript": "(Video showcasing someone using the hair oil with trending music) Tired of dull, lifeless hair? (Show before/after) Our hair oil, infused with natural ingredients, transforms your hair, giving it the shine and strength you've always dreamed of! #hairtransformation #healthyhairjourney",
//       "Format": "Image",
//       "Tips": [
//         "Use high-quality images and videos showcasing the product's benefits.",
//         "Highlight natural ingredients and their specific advantages.",
//         "Target specific hair concerns like hair fall, dryness, or frizz.",
//         "Include customer testimonials and before/after photos.",
//         "Run targeted ads on social media platforms."
//       ]
//     },
//     "Tips": [
//       "Focus on visual storytelling through high-quality images and videos.",
//       "Emphasize natural ingredients and their benefits.",
//       "Target specific hair concerns and offer solutions.",
//       "Leverage user-generated content and testimonials.",
//       "Utilize relevant hashtags and keywords for better reach."
//     ]
//   };

const [data, setData] = useState<any>(null);


const [input, setInput] = useState<string>("");




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


    setData(JSON.parse(res.data.outputs[0].outputs[0].artifacts.message.slice(8,-6)) );
    console.log(JSON.parse(res.data.outputs[0].outputs[0].artifacts.message.slice(8,-6)));


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

const formatData = data?.Format ? Object.entries(data.Format).map(([name, value]) => ({
    name,
    value
  })) : [];
 
 const keyWords = data?.Word ? data.Word.split(',').map(word => word.trim()) : [];

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
        < Input onChange={(e)=>setInput(e.target.value)} placeholder='Input your type of product'/>
        <Button onClick={fetchdata}>Search</Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{data?.Point}</CardTitle>
          <p className="text-gray-500">{data?.SellingPoint}</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Strategy</TabsTrigger>
              <TabsTrigger value="script">Marketing Script</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Trending Point</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">{data?.TrendingPoint}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Key Words</h3>
                  <div className="flex flex-wrap gap-2">
                    {keyWords.map(word => (
                      <span key={word} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Format Priority</h3>
                  <div className="h-64 w-full bg-gray-50 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formatData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Marketing Tips</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data?.Tips?.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-lg">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="script">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Video Script</h3>
                  <p className="text-sm leading-relaxed">{data?.Script?.TrendingScript}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Format: {data?.Script?.Format}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;