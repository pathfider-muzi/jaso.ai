export const popUpCenter = (href: string, name: string, width: number, height: number, features?: string) => {
  let xPos = window.screen.width / 2 - width / 2;
  let yPos = window.screen.height / 2 - height / 2;
  xPos += window.screenLeft;
  yPos += window.screenTop;

  return window.open(href, name, `width=${width}, height=${height}, left=${xPos}, top=${yPos}, ${features}`);
};
