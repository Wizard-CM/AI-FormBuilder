"use server";
import { NEXT_AUTH_CONFIG } from "@/lib/nextAuthConfig";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getFormStats = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  const user = session.user;

  if (!user || !user.id) {
    // throw new Error("User not found")
    console.log("User not found");
    return;
  }

  const stats = await prisma.form.aggregate({
    where: {
      ownerId: user.id as string,
    },
    _sum: {
      submissions: true,
    },
  });

  const submissions = stats._sum.submissions || 0;

  return submissions;
};
