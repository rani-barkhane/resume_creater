"use client";

import { TemplateGallery } from "@/components/TemplateCards/TemplateGallery";

export default function TemplatesPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Choose a Template</h1>
        <p className="text-sm text-slate-500 mt-1">
          Click a template to select it, then create your resume. You can switch
          templates anytime in the editor without losing your data.
        </p>
      </div>
      <TemplateGallery mode="gallery" showCreateButton />
    </div>
  );
}
