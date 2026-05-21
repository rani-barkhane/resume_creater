"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useResumeStore } from "@/store/resume-store";
import type { SectionKey } from "@/types/resume";

const LABELS: Record<SectionKey, string> = {
  personal: "Personal",
  summary: "Summary",
  education: "Education",
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  social: "Social",
};

function SortableItem({ id }: { id: SectionKey }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <span>{LABELS[id] || id}</span>
    </div>
  );
}

export function SectionOrderDnd() {
  const sectionOrder = useResumeStore((s) => s.data.sectionOrder);
  const setSectionOrder = useResumeStore((s) => s.setSectionOrder);

  const order = sectionOrder.filter(
    (k) => k !== "personal"
  ) as SectionKey[];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id as SectionKey);
    const newIndex = order.indexOf(over.id as SectionKey);
    const newOrder = arrayMove(order, oldIndex, newIndex);
    setSectionOrder(newOrder);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-slate-500">Drag to reorder sections</p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {order.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
