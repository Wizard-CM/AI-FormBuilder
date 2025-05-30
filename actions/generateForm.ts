"use server";
import { NEXT_AUTH_CONFIG } from "@/lib/nextAuthConfig";
import { getServerSession } from "next-auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!
);

export const generateForm = async (prevState: unknown, formData: FormData) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session.user) {
    return { success: false, message: "User unAuthenticated" };
  }
  try {
    const schema = z.object({
      description: z.string().min(1, "Description is required"),
    });

    const zodParsedResult = schema.safeParse({
      description: formData.get("description") as string,
    });

    if (!zodParsedResult.success) {
      return {
        success: false,
        message: "Invalid form data",
        error: zodParsedResult.error.errors,
      };
    }

    const description = zodParsedResult.data.description;
    const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
    {
    "formTitle": "string", // The title of the form
    "formFields": [        // An array of fields in the form
        {
        "label": "string", // The label to display for the field
        "name": "string",  // The unique identifier for the field (used for form submissions)
        "placeholder": "string" // The placeholder text for the field
        }
    ]
    }
    Requirements:
    - Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
    - Always include at least 3 fields in the "formFields" array.
    - Keep the field names consistent across every generation for reliable rendering.
    - Provide meaningful placeholder text for each field based on its label.
    - Note( Important ) : Provide the output without any file markings like json or txt ?
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // const result = await model.generateContent(`${description}  ${prompt}`);
    const result = await model.generateContent(`${description} ${prompt}`);
    const jsonResponse =
      (result?.response?.candidates)![0].content.parts[0].text;

    let cleanText = jsonResponse?.split("```json")[1].split("```")[0].trim();

    // console.log(cleanText, "Response from gemini");

    if (!jsonResponse) {
      return {
        success: false,
        message: "No Prompt Response , Failed to generate form content",
      };
    }

    const form = await prisma.form.create({
      data: {
        ownerId: session.user.id,
        content: cleanText!,
      },
    });

    // revalidatePath("/dashboard/forms");

    return {
      success: true,
      message: "Form generated successfully.",
      data: form,
    };
  } catch (error) {
    console.log("Error While Generating Form", error);
    return {
      success: false,
      message: "An error occurred while generating the form",
    };
  }
};
