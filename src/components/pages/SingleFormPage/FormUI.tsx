"use client";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { publishForm } from "../../../../actions/publishForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormPublishDialog from "./FormPublishDialog";
import { submitForm } from "../../../../actions/submitForm";
import { useRouter } from "next/navigation";
import { Eye, Send, Settings, Share2, Sparkles, Trash2 } from "lucide-react";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { updateForm } from "../../../../actions/updateForm";
import { addNewInput } from "../../../../actions/AddNewInput";

type Props = { form: any; isEditMode: boolean; formId: string };

const FormUI: React.FC<Props> = ({ form, isEditMode, formId }) => {
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [isFormInputEditMode, setIsFormInputEditMode] =
    useState<boolean>(false);
  const [formInputEditedData, setFormInputEditedData] = useState<any>();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputState, setModalInputState] = useState("");
  const [modalInputPlaceHolder, setModalInputPlaceHolder] = useState("");

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [label]: value });
  };
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      await publishForm(form.id);
      setSuccessDialogOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData, "Form Data");
    const data = await submitForm(form.id, formData);

    if (data?.success) {
      toast.success(data.message);
      setFormData({});
      return router.push("/");
    }
    if (!data?.success) {
      toast.error(data?.message!);
    }
  };
  const handleOkay = async () => {
    setIsFormInputEditMode(false);
    await updateForm(formId, formInputEditedData);
  };
  const handleDelete = async (index: number) => {
    const newInputLabels = formInputEditedData.map((elem: any, ind: number) => {
      return index != ind ? elem : null;
    });
    console.log(newInputLabels, "deleted wala");
    setFormInputEditedData(newInputLabels);
  };
  const handleInputEditModeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string,
    index: number
  ) => {
    const newLabelValue = e.target.value;
    const newInputLabels = formInputEditedData.map((elem: any) => {
      return elem.label != label
        ? elem
        : {
            ...elem,
            label: newLabelValue,
          };
    });
    setFormInputEditedData(newInputLabels);
  };
  const handleAddInput = async () => {
    // Add it into the database
    console.log(formInputEditedData);

    const newInputObj = {
      label: modalInputState,
      name: `CustomerCustomInput`,
      placeholder: modalInputPlaceHolder,
    };

    setFormInputEditedData((prev: any) => [...prev, newInputObj]);
    await addNewInput(formId, [...formInputEditedData, newInputObj]);
    setIsModalOpen(false);
  };

  const value =
    typeof form.content !== "object"
      ? JSON.parse(form.content as any)
      : form.content;

  let data;

  useEffect(() => {
    if (typeof value === "object" && form !== null && !Array.isArray(value)) {
      data = value.formFields;
      setFormInputEditedData(data);
    } else {
      data = value[0].formFields;
      setFormInputEditedData(data);
    }
  }, []);

  // console.log(formInputEditedData)

  return (
    <div className="space-y-6 relative">
      <div className="w-full text-end text-white font-semibold">
        {!isFormInputEditMode && isEditMode && (
          <button
            onClick={() => {
              setIsFormInputEditMode(true);
            }}
            className="flex-1  cursor-pointer flex items-center justify-center gap-2 p-3 bg-yellow-900/20 hover:bg-yellow-900/30 border border-yellow-800/50 hfover:border-yellow-700 rounded-lg text-yellow-400 hover:text-red-300 transition-all duration-200 group/delete"
          >
            <span className="font-medium"> Edit Mode</span>
          </button>
        )}
      </div>

      <div className="">
        <form
          onSubmit={isEditMode ? handlePublish : handleSubmit}
          className="space-y-6"
        >
          {/* Loader until formInputEditedData bhitra data naaye samma  */}
          {formInputEditedData?.map((item: any, index: number) => {
            if (item == null) return;

            return (
              <div key={index} className="group">
                {!isFormInputEditMode && (
                  <Label className="text-gray-300 font-medium mb-2 block group-focus-within:text-yellow-400 transition-colors">
                    {item.label}
                    {!isEditMode && (
                      <span className="text-red-400 ml-1">*</span>
                    )}
                  </Label>
                )}

                {isFormInputEditMode && (
                  <div className="flex justify-between items-center gap-2">
                    <Input
                      type="text"
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all duration-300 h-12"
                      placeholder={`Edit label : ${item.label}`}
                      // value={}
                      onChange={(e) => {
                        handleInputEditModeChange(e, item.label, index);
                      }}
                    />

                    <button
                      onClick={() => {
                        handleDelete(index);
                      }}
                      className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-red-900/20 hover:bg-red-900/30 border border-red-800/50 hover:border-red-700 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 group/delete"
                    >
                      <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200" />
                      <span className="font-medium">Delete</span>
                    </button>
                  </div>
                )}

                {!isFormInputEditMode && (
                  <div className="relative">
                    <Input
                      type="text"
                      name={item.name}
                      placeholder={item.placeholder}
                      required={!isEditMode}
                      onChange={(e) => {
                        handleChange(e, item.label);
                      }}
                      value={formData[item.label] || ""}
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all duration-300 h-12"
                    />
                    {isEditMode && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Settings className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            {!isFormInputEditMode && (
              <button
                type="submit"
                className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-yellow-900/20 hover:bg-yellow-900/30 border border-yellow-800/50 hover:border-yellow-700 rounded-lg text-yellow-400 hover:text-yellow-300 transition-all duration-200 group/delete"
              >
                <span>{isEditMode ? "Publish" : "Submit"}</span>
              </button>
            )}
          </div>
        </form>
        {isFormInputEditMode && (
          <div className="flex gap-2 justify-start text-white">
            <button
              onClick={handleOkay}
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-green-900/20 hover:bg-green-900/30 border border-green-800/50 hover:border-green-700 rounded-lg text-green-400 hover:text-green-300 transition-all duration-200 group/delete"
            >
              <span className="font-medium">Confirm Changes</span>
            </button>

            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-blue-900/20 hover:bg-blue-900/30 border border-blue-800/50 hover:border-blue-700 rounded-lg text-blue-400 hover:text-blue-300 transition-all duration-200 group/delete"
            >
              <span className="font-medium"> Add New Input</span>
            </button>
          </div>
        )}
      </div>

      {/* Success Dialog Placeholder */}
      <FormPublishDialog
        formId={form.id}
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
      />

      {/* Modal Logic */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-200 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Input
              </h3>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Label
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter label for new input..."
                    value={modalInputState}
                    onChange={(e) => {
                      setModalInputState(e.target.value);
                    }}
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                    Input PlaceHolder
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter PlaceHolder for new input..."
                    value={modalInputPlaceHolder}
                    onChange={(e) => {
                      setModalInputPlaceHolder(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <button
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddInput}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
              >
                Add Input
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormUI;
