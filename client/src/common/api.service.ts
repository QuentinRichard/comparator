import Vue from 'vue'
import axios, { AxiosResponse } from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/common/config'
import { ComparisonRequestData, ComparisonResponseData } from '../models/ComparisonModels'

const ApiService = {

  init (): void {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
    Vue.axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
  },

  // query (resource: string, params: any): any {
  //   return Vue.axios.get(resource, params).catch((error: Error) => {
  //     throw new Error(`[RWV] ApiService ${error}`)
  //   })
  // },

  // get (resource: string, params: any): any {
  //   return Vue.axios.get(resource, { params }).catch((error: Error) => {
  //     throw new Error(`[RWV] ApiService ${error}`)
  //   })
  // },

  // update (resource: string, slug: string, params: any): any {
  //   return Vue.axios.put(`${resource}/${slug}`, params)
  // },

  // put (resource: string, params: any): any {
  //   return Vue.axios.put(`${resource}`, params)
  // },

  // delete (resource: string): any {
  //   return Vue.axios.delete(resource).catch((error: Error) => {
  //     throw new Error(`[RWV] ApiService ${error}`)
  //   })
  // },

  post (resource: string, params: ComparisonRequestData): Promise< AxiosResponse<ComparisonResponseData> > {
    return Vue.axios.post<ComparisonResponseData>(`${resource}`, params)
  }
}

export default ApiService

export const ComparatorService = {
  async getCompare (params: ComparisonRequestData): Promise<AxiosResponse<ComparisonResponseData>> {
    return await ApiService.post('comparison', params)
  }
}
