const removeFootnoteNumber = (originalText: string) => {
  const regex = /(\[[0-9]+\])+/gi;

  return originalText.replace(regex, "");
};

export default removeFootnoteNumber;
