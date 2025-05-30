"use server";

import { NEXT_AUTH_CONFIG } from "@/lib/nextAuthConfig";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getMyForms = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  try {
    const user = session.user;

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const forms = await prisma.form.findMany({
      where: {
        ownerId: user.id,
      },
    });

    if (!forms) {
      return { success: false, message: "No Forms Found for the User " };
    }

    return {
      success: true,
      message: "Found Successfully",
      data: forms,
    };
  } catch (error: any) {
    console.log(error.message);
  }
};
