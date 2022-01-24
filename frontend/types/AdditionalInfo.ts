import { UserInfo } from "./User";

export type AdditionalInfo = Pick<
  UserInfo,
  "university" | "major" | "grade" | "languageScore" | "career" | "activity" | "license"
>;
