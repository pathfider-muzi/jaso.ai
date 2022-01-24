function splitByStep(step: number, target: any[]) {
  let splitedResult: any[][] = [];
  let curIndex = -1;

  for (let i = 0; i < target.length; i++) {
    if (i % step == 0) {
      splitedResult.push([]);
      curIndex += 1;
    }
    splitedResult[curIndex].push(target[i]);
  }

  return splitedResult;
}

export default splitByStep;
