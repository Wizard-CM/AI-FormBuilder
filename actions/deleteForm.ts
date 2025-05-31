// "use server"

// import prisma from "@/lib/prisma"
// import { revalidatePath } from "next/cache";

// export const deleteForm = async (formId:number) => {
//     const form = await prisma.form.delete({
//         where:{
//             id:formId
//         }
//     });

//     if(!form){
//         return {success:false, message:"Form not found"}
//     }

//     // make sure update the form list
//     revalidatePath("/dashboard/forms");

//     return {
//         success:true,
//         message:"Form deleted successfully."
//     }
// }

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteForm = async (formId: number) => {
  try {
    // Use a transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // First, delete all submissions related to this form
      await tx.submissions.deleteMany({
        where: {
          formId: formId,
        },
      });

      // Then delete the form
      const deletedForm = await tx.form.delete({
        where: {
          id: formId,
        },
      });

      return deletedForm;
    });

    // Revalidate the forms list to update the UI
    revalidatePath("/dashboard/forms");

    return {
      success: true,
      message: "Form and All Related Submissions Deleted Successfully.",
    };
  } catch (error) {
    console.error("Error deleting form:", error);

    // Handle specific error cases
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return {
        success: false,
        message: "Form not found",
      };
    }

    return {
      success: false,
      message: "Failed to delete form. Please try again.",
    };
  }
};
