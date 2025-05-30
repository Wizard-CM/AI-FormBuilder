"use server";
import prisma from "@/lib/prisma";

export const addNewInput = async (formId: string, formInputEditedData: any) => {
  const form: any = await prisma.form.findUnique({
    where: { id: Number(formId) },
  });

  const parsedContent = JSON.parse(form?.content);

  const updatedContent = {
    formFields: formInputEditedData,
    formTitle: parsedContent.formTitle,
  };


  await prisma.form.update({
    where: { id: Number(formId) },
    data: {
      content: JSON.stringify(updatedContent),
    },
  });

  return {
    success: true,
    message: "Form Content Updated Successfully",
  };
};
