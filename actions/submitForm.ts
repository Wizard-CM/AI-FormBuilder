"use server";
import { NEXT_AUTH_CONFIG } from "@/lib/nextAuthConfig";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const submitForm = async (formId: number, formData: any) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  try {
    const user = session.user;

    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!formId) {
      return { success: false, message: "Form id not found" };
    }
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
    if (!form) {
      return { success: false, message: "form not found" };
    }
    await prisma.submissions.create({
      data: {
        formId,
        content: formData,
      },
    });

    await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        submissions: {
          increment: 1,
        },
      },
    });
    return { success: true, message: "Form submitted successsfully." };
  } catch (error) {
    console.log(error);
  }
};
