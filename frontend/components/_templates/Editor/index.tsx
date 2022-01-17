import PageMarks from "@/components/Editor/PageMarks";
import HorizontalStyle from "@/components/_common/HorizontalStyle";
import Screen from "@/components/_layouts/Screen";
import useEditor from "@/hooks/useEditor";

const Editor = () => {
  const { currentPage, pageMarks, editForms } = useEditor();

  return (
    <Screen title="editor" description="자소서를 편집하고 저장할 수 있는 페이지입니다.">
      <HorizontalStyle height={10.3}>
        <PageMarks>{pageMarks}</PageMarks>
        {editForms[currentPage]}
      </HorizontalStyle>
    </Screen>
  );
};

export default Editor;
