export default interface Question {
  id: number;
  question: string;
  answer?: number;
  options?: {
    id: number;
    title: string;
    description: string;
    value: any;
  }[];
  dependencies?: {
    id: number;
    depends: number;
    value: any;
    options: {
      id: number;
      title: string;
      description: string;
      value: any;
    }[];
  }[];
}
