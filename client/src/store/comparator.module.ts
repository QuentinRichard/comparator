import { ActionContext } from 'vuex'
import { AxiosResponse } from 'axios'
import { ComparatorService } from '@/common/api.service'
import { ComparisonResponseData } from '../models/ComparisonModels'

export interface ComparatorState {
  url1: string,
  url2: string,
  ComparisonResultData: ComparisonResponseData,
  isLoading: boolean,
  isUrlsReady: boolean,
  isDataLoadded: boolean
}

export interface itUpdateUrlAction {
  id: number,
  url: string
}

const state: ComparatorState = {
  url1: '',
  url2: '',
  ComparisonResultData: new ComparisonResponseData(),
  isLoading: false,
  isUrlsReady: false,
  isDataLoadded: false
}

const getters = {
  url1 (state: ComparatorState): string {
    return state.url1
  },
  url2 (state: ComparatorState): string {
    return state.url2
  },
  isLoading (state: ComparatorState): boolean {
    return state.isLoading
  },
  isUrlsReady (state: ComparatorState): boolean {
    return state.isUrlsReady
  },
  isDataLoadded (state: ComparatorState): boolean {
    return state.isDataLoadded
  },
  ComparisonResultData (state: ComparatorState): ComparisonResponseData {
    return state.ComparisonResultData
  }
}

const actions = {
  async startComparison (context: ActionContext<ComparatorState, ComparatorState>): Promise<void> {
    context.commit('setLoadingState', true)
    context.commit('setDataLoaded', false)
    const req = {
      type: 'url',
      url1: context.state.url1,
      url2: context.state.url2
    }
    // For local debugging
    // context.commit('updateResult', JSON.parse('{"comparison":{"url1":{"comment":["44", "ljlj"], "info":{"nbFrame":0,"totalDiv":111,"totalHRef":139,"totalScript":4,"totalCss":4,"totalMeta":21,"totalSection":1,"hop":17},"origin":"https://www.alsacreations.com/article/lire/1376-html5-section-article-nav-header-footer-aside.html"},"url2":{"comment":["ou uu "], "info":{"nbFrame":0,"totalDiv":111,"totalHRef":139,"totalScript":4,"totalCss":4,"totalMeta":21,"totalSection":1,"hop":17},"origin":"https://www.alsacreations.com/article/lire/1376-html5-section-article-nav-header-footer-aside.html"}},"summary":{"infoURL1":["totalMeta","totalSection"],"infoURL2":["hop"],"winner":0}}'))
    // context.commit('setLoadingState', false)
    // context.commit('setDataLoaded', true)
    // return;
    await ComparatorService.getCompare(req)
      .then((data: AxiosResponse<ComparisonResponseData>) => {
        context.commit('updateResult', data.data)
        context.commit('setLoadingState', false)
        context.commit('setDataLoaded', true)
      })
      .catch((error:Error) => {
        context.commit('setLoadingState', false)
        throw new Error(error.message)
      })
  },

  updateUrl (context: ActionContext<ComparatorState, ComparatorState>, data: itUpdateUrlAction):void {
    context.commit(`setUpdateUrl${data.id}`, data.url)
    context.commit(
      'setUrlsReady',
      context.getters[`url${data.id}`].length > 0 && context.getters[`url${data.id}`].length > 0
    )
  }
}

const mutations = {
  setLoadingState (state: ComparatorState, loadingState: boolean): void {
    state.isLoading = loadingState
  },
  updateResult (state: ComparatorState, data: ComparisonResponseData): void {
    state.ComparisonResultData = data
  },
  setUpdateUrl1 (state: ComparatorState, url: string): void {
    state.url1 = url
  },
  setUpdateUrl2 (state: ComparatorState, url: string): void {
    state.url2 = url
  },
  setUrlsReady (state: ComparatorState, val: boolean): void {
    state.isUrlsReady = val
  },
  setDataLoaded (state: ComparatorState, val: boolean): void {
    state.isDataLoadded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
