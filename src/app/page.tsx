'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
export default function Home() {


const query = "hair oil ad"; // Replace with your search term
const [data, setData] = useState<any>(null);



// const [input, setInput] = useState<string>("hair oil ad by brands blogs");
 const [input, setInput] = useState<string>("trending memes on hair");


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

    const res:any = await axios.get("/api/search");
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {
        data&&data.map((result: any) => result.link) && data.map((result: any) => result.link).map((link: string, index: number) => (
          <div key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </div>
        ))
      }
    </div>
  );
}
