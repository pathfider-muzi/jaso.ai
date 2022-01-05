import * as React from "react";
import * as ReactDOM from "react-dom";
import ExtensionButton from "./components/ExtensionButton";
import removeFootnoteNumber from "./utils/filter/removeFootnoteNumber";
import getNamuWikiContentElements from "./utils/findContentElement/getNamuWikiContentElements";

const init = async () => {
  const $contents = getNamuWikiContentElements();

  $contents.forEach(($content) => {
    $content.setAttribute("style", "position:relative;");

    const $div = document.createElement("div");
    $div.setAttribute("style", "position: absolute; right: 0; top: 0;");

    $content.insertAdjacentElement("beforeend", $div);

    const text = removeFootnoteNumber($content.textContent || "");

    ReactDOM.render(<ExtensionButton inputText={text} />, $div);
  });
};

init();

export default init;
