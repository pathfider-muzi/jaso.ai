import EditForm from "@/components/Editor/EditForm";
import PageMark from "@/components/Editor/PageMark";
import { useState } from "react";

const useEditor = () => {
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [editForms, setEditForms] = useState([
    <></>,
    <EditForm key={1} number={1}></EditForm>,
    <EditForm key={2} number={2}></EditForm>,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageMarks, setPageMarks] = useState([
    <></>,
    <PageMark
      color="red"
      textColor="white"
      key={1}
      number={1}
      goToPage={goToPage}
    ></PageMark>,
    <PageMark
      color="red"
      textColor="white"
      key={2}
      number={2}
      goToPage={goToPage}
    ></PageMark>,
  ]);

  return {
    currentPage,
    pageMarks,
    editForms,
  };
};

export default useEditor;
