import { NextRequest, NextResponse } from "next/server";
import { uploadRateLimiter } from "@/lib/rateLimiter";
import { requestQueue } from "@/lib/requestQueue";

import { ResumeData } from "@/types/resume";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 },
      );
    }

    // Get user identifier (IP address for rate limiting)
    const userIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimitResult = uploadRateLimiter.check(userIp);
    if (!rateLimitResult.allowed) {
      console.log(`🚫 Rate limit exceeded for ${userIp}`);
      return NextResponse.json(
        {
          error: rateLimitResult.message,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 },
      );
    }

    console.log(
      `✅ Rate limit OK for ${userIp} (${rateLimitResult.remaining} remaining)`,
    );

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 },
      );
    }

    // Queue the API request to respect Groq's rate limits
    const resumeData = await requestQueue.add(async () => {
      // Initialize Groq client using OpenAI SDK
      const OpenAI = (await import("openai")).default;
      const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1",
      });

      const prompt = `You are a resume parser. Extract and structure the following resume text into a JSON object with this exact schema:

{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "github": "string (optional)",
    "linkedin": "string (optional)",
    "portfolio": "string (optional)",
    "location": "string (optional)"
  },
  "summary": "string (optional)",
  "skills": {
    "languages": ["array of programming languages"],
    "technologies": ["array of frameworks/libraries"],
    "tools": ["array of tools"],
    "other": ["array of other skills"]
  },
  "experience": [
    {
      "title": "string",
      "company": "string",
      "location": "string (optional)",
      "startDate": "string",
      "endDate": "string (or 'Present')",
      "description": ["array of bullet points"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["array of technologies used"],
      "liveUrl": "string (optional)",
      "githubUrl": "string (optional)",
      "highlights": ["array of key achievements/features"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string",
      "marks": "string (optional)"
    }
  ],
  "certificates": ["array of certificate names"],
  "interests": ["array of interests"]
}

IMPORTANT: 
- Return ONLY valid JSON, no markdown formatting, no code blocks, no explanations
- Extract all information accurately from the resume
- If a field is not present in the resume, omit it or use an empty array/string as appropriate
- Preserve all URLs, emails, and phone numbers exactly as they appear

Resume text:
${text}`;

      // Call Groq API
      const completion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 2048,
      });

      const generatedText = completion.choices[0]?.message?.content || "";

      // Parse the JSON response
      try {
        // Remove markdown code blocks if present
        const cleanedText = generatedText
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        return JSON.parse(cleanedText) as ResumeData;
      } catch (parseError) {
        console.error("Failed to parse Groq response:", parseError);
        console.error("Raw response text:", generatedText);
        throw new Error("Failed to parse AI response");
      }
    });

    // Log queue stats
    const queueStats = requestQueue.getStats();
    console.log("📊 Queue stats:", queueStats);

    return NextResponse.json({ data: resumeData }, { status: 200 });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
