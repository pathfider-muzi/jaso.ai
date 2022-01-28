const decodeHTML = (str: string) => {
  const element = document.createElement("div");
  const result = str
    .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "")
    .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");

  element.innerHTML = result;

  return element.textContent || "";
};

export default decodeHTML;
