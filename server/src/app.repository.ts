import { Injectable } from '@nestjs/common';
import {
  ComparisonRequestData,
  ComparisonResponseData,
  InfoExtracted,
  Summary,
} from './app.dto';
import axios from 'axios';
import { parse as htmlParser } from 'node-html-parser';
import * as Traceroute from 'nodejs-traceroute';
import { HttpStatus } from '@nestjs/common';
import { URL } from 'url';

@Injectable()
export class AppRepository {
  async downloadAndConvert(url: string): Promise<HTMLElement> {
    const urlData = await axios.get(url);
    if (urlData.status === HttpStatus.OK)
      return htmlParser(urlData.data) as unknown as HTMLElement;
    else
      throw new Error(`downloadAndConvert: Bad Status code ${urlData.status}`);
  }

  extractInfo(data: HTMLElement): InfoExtracted {
    const result = new InfoExtracted();
    result.info.nbFrame = data.querySelectorAll('frame').length;
    result.info.totalDiv = data.querySelectorAll('div').length;
    result.info.totalHRef = data.querySelectorAll('[href]').length;
    result.info.totalScript =
      data.querySelectorAll('script').length +
      data.querySelectorAll('link[href$=".js"]').length;
    result.info.totalCss =
      data.querySelectorAll('style').length +
      data.querySelectorAll('link[rel="stylesheet"]').length;
    result.info.totalMeta = data.querySelectorAll('meta').length;
    result.info.totalSection = data.querySelectorAll('section').length;

    if (result.info.nbFrame > 0) result.comment.push('Web Page protected');
    if (result.info.totalDiv < 2) result.comment.push('May be, is a SPA page');
    if (result.info.totalHRef > 600) result.comment.push('With several links');
    if (result.info.totalSection == 0)
      result.comment.push("No HTML5 structure's");
    return result;
  }

  // The distance is the number of hops between the server and the url host's
  async computeDistance(url: string): Promise<number> {
    const host = new URL(url);
    const traceroute = new Traceroute();

    return new Promise((resolve, reject) => {
      let hopVal = 0;
      traceroute
        .on('hop', (hop: any) => {
          hopVal = hop.hop;
        })
        .on('close', (code) => {
          if (!code) resolve(hopVal);
          else reject(code);
        });
      try {
        traceroute.trace(host.hostname);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  async processData(url: string): Promise<InfoExtracted> {
    const html = await this.downloadAndConvert(url);
    const info = this.extractInfo(html);

    info.info.hop = await this.computeDistance(url);
    info.origin = url;
    return info;
  }

  makeSummary(url1: InfoExtracted, url2: InfoExtracted): Summary {
    const summary = new Summary();
    let url1Count = 0,
      url2Count = 0;

    Object.keys(url1.info).forEach((value: string) => {
      if (value !== 'hop') {
        // For all others properties, the king is the bigger
        if (url1.info[value] > url2.info[value]) {
          summary.infoURL1.push(value);
          url1Count++;
        } else if (url2.info[value] > url1.info[value]) {
          summary.infoURL2.push(value);
          url2Count++;
        }
      } else {
        // For "hop" property, the king is the lower
        let urlEco = undefined;
        if (url1.info[value] < url2.info[value]) {
          summary.infoURL1.push(value);
          urlEco = url1;
          url1Count++;
        } else if (url2.info[value] < url1.info[value]) {
          summary.infoURL2.push(value);
          urlEco = url2;
          url2Count++;
        }
        urlEco?.comment.push('Requested this website is more ecological');
      }
    });

    if (url1Count > url2Count) summary.winner = 1;
    else if (url2Count > url1Count) summary.winner = 2;
    else summary.winner = 0;

    return summary;
  }

  async makeComparison(
    request: ComparisonRequestData,
  ): Promise<ComparisonResponseData> {
    const responseData = new ComparisonResponseData();

    const val1 = this.processData(request.url1);
    const val2 = this.processData(request.url2);

    await Promise.all([val1, val2]).then((values: InfoExtracted[]) => {
      responseData.comparison.url1 = values[0];
      responseData.comparison.url2 = values[1];
    });

    responseData.summary = this.makeSummary(
      responseData.comparison.url1,
      responseData.comparison.url2,
    );
    return responseData;
  }
}
