import { Qna } from "./Qna";

export interface SelfIntroduction {
  id: number;
  createdDate: Date;
  updatedDate: Date;
  title: string;
  organisationName: string;
  role: string;
  qnas: Qna[];
}