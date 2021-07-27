export class ComparisonRequestData {
  type: string;
  url1: string;
  url2: string;
}

export class InfoExtracted {
  origin: string;
  comment: string[];
  info: {
    nbFrame: number;
    totalDiv: number;
    totalHRef: number;
    totalScript: number;
    totalCss: number;
    totalMeta: number;
    totalSection: number;
    hop: number;
  };
  constructor() {
    this.origin = '';
    this.comment = [];
    this.info = {
      nbFrame: 0,
      totalDiv: 0,
      totalHRef: 0,
      totalScript: 0,
      totalCss: 0,
      totalMeta: 0,
      totalSection: 0,
      hop: 0,
    };
  }
}

export class ComparisonResult {
  url1: InfoExtracted;
  url2: InfoExtracted;
  constructor() {
    this.url1 = new InfoExtracted();
    this.url2 = new InfoExtracted();
  }
}

export class Summary {
  infoURL1: string[];
  infoURL2: string[];
  winner: number;
  constructor() {
    this.infoURL1 = [];
    this.infoURL2 = [];
  }
}

export class ComparisonResponseData {
  comparison: ComparisonResult;
  summary: Summary;

  constructor() {
    this.comparison = new ComparisonResult();
    this.summary = new Summary();
  }
}
