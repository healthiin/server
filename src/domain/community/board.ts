export type BoardProperties = {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
