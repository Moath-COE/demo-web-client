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
