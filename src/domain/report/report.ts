export enum ReportVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export type ReportProperties = {
  id: string;
  title: string;
  year: number;
  week: number;
  visibility: ReportVisibility;
  createdAt: Date;
};
