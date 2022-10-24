export class RoutinePreviewResponse {
  id!: string;
  title!: string;
  days!: number[];
  types!: string[];

  constructor(data: {
    id: string;
    title: string;
    days: number[];
    types: string[];
  }) {
    this.id = data.id;
    this.title = data.title;
    this.days = data.days;
    this.types = data.types;
  }
}
