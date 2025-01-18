
import axios from "axios";
import { NextResponse } from "next/server";



export async function POST(req:any, res:any){
  console.log("here")
const { q } = await req.json();
console.log("q: ",q)
  try {
 
  const apiKey = process.env.API_KEY; // Replace with your SerpAPI key
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(q as string)}&hl=en&gl=us&api_key=${apiKey}`;

  try {
    const response = await axios.get(url); // Fetch data from SerpAPI
   return NextResponse.json(response.data)// Return the data to the client
  } catch (error:any) {
    console.error("Error fetching data:", error);
    return NextResponse.json({error: error.message}, {status: 500}); // Return an error to the client
  }
        
    } catch (error:any) {
        console.log(error)  
        return NextResponse.json({error: error.message}, {status: 500});    
    }
    
}