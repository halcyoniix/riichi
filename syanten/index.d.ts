declare function syanten(haiArr: syanten.HaiArr): number;

declare namespace syanten {
  type Hai = 0 | 1 | 2 | 3 | 4;
  type HaiArr = [
    [Hai, Hai, Hai, Hai, Hai, Hai, Hai, Hai, Hai],
    [Hai, Hai, Hai, Hai, Hai, Hai, Hai, Hai, Hai],
    [Hai, Hai, Hai, Hai, Hai, Hai, Hai, Hai, Hai],
    [Hai, Hai, Hai, Hai, Hai, Hai, Hai]
  ];

  function syanten(haiArr: HaiArr): number;
  function syanten7(haiArr: HaiArr): number;
  function syanten13(haiArr: HaiArr): number;
  function syantenAll(haiArr: HaiArr): number;
  function hairi(haiArr: HaiArr, has7or13?: boolean): any;
  function checkChi(haiArr: HaiArr): number;
  function checkPon(haiArr: HaiArr): number;
  function checkKan(haiArr: HaiArr): number;
}

export = syanten;
