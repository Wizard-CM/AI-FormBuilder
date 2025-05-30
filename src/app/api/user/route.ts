import { NEXT_AUTH_CONFIG } from "@/lib/nextAuthConfig";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


// const genAI = new GoogleGenerativeAI(
//   process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!
// );


export async function GET() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  // await dbConnect();
  
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // // const result = await model.generateContent(`${description}  ${prompt}`);
    // const result = await model.generateContent(`Hi , What is your name ?`);
    // const response =(result?.response?.candidates)![0].content.parts[0].text;
  return NextResponse.json({
    session: session,
  });
}
