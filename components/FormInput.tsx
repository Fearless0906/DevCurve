"use client";

import { CreateGuide } from "@/data/django/schema";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface FormInputProps {
  projectId: string;
  onSuccess?: () => void;
}

const FormInput = ({ projectId, onSuccess }: FormInputProps) => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    content: "",
    commands: "",
    image: null as File | null,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("project", projectId);
      data.append("topic", formData.topic);
      if (formData.content) data.append("content", formData.content);
      if (formData.commands) data.append("commands", formData.commands);
      if (formData.image) data.append("image", formData.image);

      await CreateGuide(data);
      toast.success("Guide created successfully!");
      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating guide:", error);
      toast.error("Failed to create guide. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Topic Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Topic
        </label>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, topic: e.target.value }))
          }
          className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          placeholder="Enter guide topic"
          required
        />
      </div>

      {/* Content Textarea */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-y"
          placeholder="Write your guide content here..."
        />
      </div>

      {/* Commands Textarea */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Example Data
        </label>
        <textarea
          value={formData.commands}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, commands: e.target.value }))
          }
          className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          placeholder="$ npm install example-package"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Image
        </label>
        <div
          className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
              : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file?.type.startsWith("image/")) {
              setFormData((prev) => ({ ...prev, image: file }));
              const reader = new FileReader();
              reader.onloadend = () => setPreview(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
        >
          {preview ? (
            <div
              className="relative w-full aspect-video"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFormData((prev) => ({ ...prev, image: null }));
                  setPreview(null);
                }}
                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white dark:bg-gray-950 shadow-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-500/10">
                <ImagePlus className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag and drop or click to upload
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Creating guide...</span>
          </div>
        ) : (
          "Create Guide"
        )}
      </Button>
    </form>
  );
};

export default FormInput;
