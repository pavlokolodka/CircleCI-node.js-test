export interface IHint {
  id: number;
  title: string;
  info: string;
  user_id: number;
  createdAt: Date;
  volunteer_hints_photo?: IHintPhoto[];
}

interface IHintPhoto {
  id: number;
  photo: string;
  hint_id: number;
  createdAt: Date;
}
