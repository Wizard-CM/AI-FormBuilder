"use server";
import { NEXT_AUTH_CONFIG } from "@/lib/nextAuthConfig";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const publishForm = async (formId: number) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  try {
    const user = session.user;
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (!formId) {
      return { success: false, message: "Form is not found" };
    }

    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
    if (!form) {
      return { success: false, message: "Form not found" };
    }
    if (form.ownerId !== user.id) {
      return { success: false, message: "Unauthorized" };
    }
    await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        published: true,
      },
    });
  } catch (error) {
    console.log("Error publishing form", error);
    return {
      success: false,
      message: "An error occured while publishing the form",
    };
  }
};
