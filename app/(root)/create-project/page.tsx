"use client";

import { CreateComponent } from "@/data/django/schema";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null as File | null,
    react: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }
      data.append("react", String(formData.react));

      const response = await CreateComponent(data);
      toast.success("Project created successfully!");
      router.refresh();
      // Navigate to the new project page
      router.push(`/component/${response.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="wrapper pt-32 pb-8">
      <div className="container">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border rounded-lg min-h-[150px]"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Thumbnail</label>
              <div
                className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
                  isDragging
                    ? " bg-blue-50 dark:bg-blue-500/10"
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
                    setFormData((prev) => ({ ...prev, thumbnail: file }));
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setPreview(reader.result as string);
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
                        setFormData((prev) => ({ ...prev, thumbnail: null }));
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
                      <ImagePlus className="w-6 h-6 text-slate-500" />
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
              variant="default"
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 text-white rounded-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating project...</span>
                </div>
              ) : (
                "Create Project"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
