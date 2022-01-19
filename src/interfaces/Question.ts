export interface Question {
  id: number;
  question: string;
  answer?: number;
  options?: Option[];
  dependencies?: {
    id: number;
    depends: number;
    value: any;
    options: Option[];
  }[];
}

export interface Option {
  id: number;
  title: string;
  description: string;
  value: any;
}
