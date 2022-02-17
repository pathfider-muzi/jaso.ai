import { Project } from "./Project";

export interface Resume {
  id: number;
  createdDate: string;
  updatedDate: string;
  title: string;
  name: string;
  role: string;
  email: string;
  contacts: string[];
  resumeProjects: Project[];
}
