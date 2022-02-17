export class UpdateResumeProjectRequestDto {
    id: number;
    resumeId: number;
    projectName: string;
    projectDetail: string;
    projectTerm: string;
    projectRole: string[];
    projectResult: string[];
    projectFeeling: string[];
};