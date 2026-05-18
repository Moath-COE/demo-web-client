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

export type TopicState = "not_started" | "current" | "done";

export interface UIControlData {
  action: string;
  page?: number;
  topic?: string;
  section?: string;
  number_of_sections?: number;
  current_section_index?: number;
  checkpoint_question?: string;
  add?: { [key: string]: markerPayload };
  remove?: string[];
}

export interface StudyLauncherProps {
  api: CarouselApi | null;
  numPages: number;
  topicsJSON: Json;
  courseSlug: string;
  chapterIndex: number;
  setActiveMarker: React.Dispatch<
    React.SetStateAction<Record<string, markerPayload>>
  >;
  onTopicChange?: (
    topicName: string | null,
    topicSlug: string | null,
    sections: number | null,
    sectionIndex: number | null,
  ) => void;
  onListeningChange?: (listening: boolean) => void;
  onTopicsDataChange?: (
    topics: Topic[],
    topicStates: Record<string, TopicState>,
    onTopicSelect: (slug: string) => void,
  ) => void;
}

export interface ConnectedStateHandlerProps {
  api: CarouselApi | null;
  numPages: number;
  setActiveMarker: React.Dispatch<
    React.SetStateAction<Record<string, markerPayload>>
  >;
  onAgentStateChange: (state: string) => void;
  onTopicNameChange: (name: string | null) => void;
  onSectionsChange: (total: number | null, index: number | null) => void;
  onCheckpointChange: (question: string | null) => void;
  onDisconnect: (roomName: string) => void;
  onMicToggleChange: (toggle: {
    toggle: () => void;
    enabled: boolean;
    pending: boolean;
  }) => void;
  onDisconnectPropsChange: (props: {
    onClick: () => void;
    disabled: boolean;
  }) => void;
}
