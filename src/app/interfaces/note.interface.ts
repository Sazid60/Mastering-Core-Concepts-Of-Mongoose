export interface INote {
  title: string;
  content?: string;
  category?: "personal" | "work" | "study" | "others";
  pinned?: boolean;
  tags?: {
    label: string;
    color?: string;
  };
}
