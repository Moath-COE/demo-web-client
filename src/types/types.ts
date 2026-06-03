import { CarouselApi } from "@/components/ui/carousel";
import { Json } from "./database.types";
export interface PageContentChunk {
  id: string;
  type: "paragraph" | "equation" | string;
  html_content: string;
}

export interface CoursePage {
  page_number: number;
  page_content_chunks: PageContentChunk[];
}

export type CourseContent = CoursePage[];

// This type represents the structure of the topics JSON file
export type markerPayload = {
  type: "highlight" | "circle" | "underline" | "point";
  page: number;
  span_id: number;
  delay: number;
};

export type UIMarkersUpdates = {
  add: { [key: string]: markerPayload };
  remove: string[];
};

// Agent UI control data structure

export type LauncherState = "idle" | "menu-open" | "active";

export interface Topic {
  name: string;
  brief: string;
  slug: string;
}

export type TopicState = "not_started" | "current";

export interface UIControlData {
  action: string;
  page?: number;
  topic?: string;
  section?: string;
  number_of_sections?: number;
  current_section_index?: number;
  question?: string;
  choices?: string[];
  add?: { [key: string]: markerPayload };
  remove?: string[];
}

export interface StudyLauncherProps {
  api: CarouselApi | null;
  numPages: number;
  topics: Topic[];
  courseSlug: string;
  chapterIndex: number;
  setActiveMarker: React.Dispatch<
    React.SetStateAction<Record<string, markerPayload>>
  >;
  onListeningChange?: (listening: boolean) => void;
}

export interface ConnectedStateHandlerProps {
  api: CarouselApi | null;
  numPages: number;
  setSelectedTopic: React.Dispatch<
    React.SetStateAction<{
      slug: string;
      totalSections: number;
    } | null>
  >;
  setSelectedSection: React.Dispatch<
    React.SetStateAction<{ name: string; index: number } | null>
  >;
  setActiveMarker: React.Dispatch<
    React.SetStateAction<Record<string, markerPayload>>
  >;
  onAgentStateChange: (state: string) => void;
  setCurrentCheckpointQuestion: (
    question: { question: string; choices: string[] } | null,
  ) => void;
  onDisconnect: () => void;
  onTextInputToggle: () => void;
  isTextInputOpen: boolean;
  setEndSessionMessage: React.Dispatch<React.SetStateAction<string | null>>;
}
