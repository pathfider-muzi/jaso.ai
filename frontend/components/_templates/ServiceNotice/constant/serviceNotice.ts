const SERVICE_NOTICE = [
  {
    title: "👉 자기소개서 생성 시, 입력 형식 안내",
    content:
      "자기소개서 생성할 때 쓰이는 정보들에는 영어보다는 한국어로, 약자보다는 전문으로 입력해달라고 공지 넣어주시면 좀 더 정확한 결과를 반환합니다. \nex) SR -> 삼성리서치\n금감원 -> 금융감독원",
    date: "2022/2/22"
  },
  {
    title: "👉 시스템 건의사항, 버그 발견 시 안내",
    content: "'eddy.storm@kakaobrain.com'으로 언제든 문의 주세요.",
    date: "2022/2/22"
  },
  {
    title: "👉 AI 자기소개서 생성 개선 안내",
    content:
      "현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다.\n빠른 시일 내에 조치하도록 하겠습니다.",
    date: "2022/2/20"
  }
] as const;

export default SERVICE_NOTICE;
