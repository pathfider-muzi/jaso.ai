import { MALGUN_FONT_BASE_64 } from "@/constants/fontBase64";
import useDebounce from "@/hooks/useDebounce";
import { Project } from "@/types/Project";
import { Resume } from "@/types/Resume";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

interface GeneratePdfFromResumeProps {
  resumeTitle: Resume["title"];
  projects: Project[];
}

const _generatePdfFromResume = ({ resumeTitle, projects }: GeneratePdfFromResumeProps) => {
  const resumeTitleContent = "\n\n" + resumeTitle + "\n\n\n";

  const projectContent = projects.reduce((acc, curr, index) => {
    acc += `${index + 1}. ${curr.projectName}`;
    acc += "\n\n";
    acc += `설명: ${curr.projectDetail}`;
    acc += "\n\n";
    acc += `기간: ${curr.projectTerm}`;
    acc += "\n\n";
    acc += `역할: ${curr.projectRole.join(", ")}`;
    acc += "\n\n";
    acc += `성과: ${curr.projectResult.join(", ")}`;
    acc += "\n\n";
    acc += `느낀점: ${curr.projectFeeling.join(", ")}`;
    acc += "\n\n\n";

    return acc;
  }, "프로젝트\n\n\n");

  const pdf = new jsPDF("p", "pt");
  pdf.addFileToVFS("malgun.ttf", MALGUN_FONT_BASE_64);
  pdf.addFont("malgun.ttf", "malgun", "normal");
  pdf.setFont("malgun");

  pdf.setFontSize(16);
  pdf.text(pdf.splitTextToSize(resumeTitleContent, 500), 10, 5);
  pdf.setFontSize(11);
  pdf.line(10, 15, 585, 15);
  pdf.text(pdf.splitTextToSize(projectContent, 500), 10, 70);

  return pdf;
};

interface Props extends GeneratePdfFromResumeProps {}

const useResumePdfPreview = ({ resumeTitle, projects }: Props) => {
  const [resumePdf, setResumePdf] = useState("");

  const [resumePreviewOffsetY, setResumePreviewOffsetY] = useState(0);

  const onScrollWindow = useDebounce({
    callback: () => {
      setResumePreviewOffsetY(window.pageYOffset);
    },
    delayMs: 1000
  });

  const generatePdfFromResume = () => {
    const pdf = _generatePdfFromResume({
      resumeTitle,
      projects
    });

    setResumePdf(pdf.output("datauristring"));
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollWindow);

    return () => {
      window.removeEventListener("scroll", onScrollWindow);
    };
  }, []);

  return {
    resumePdf,
    generatePdfFromResume,
    resumePreviewOffsetY
  };
};

export default useResumePdfPreview;
