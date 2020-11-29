export const service = {
  baseUrl: {
    fallback: 'http://10.60.17.43:8080/gdzcgl/'
  },
  getBaseUrl() {
    return this.baseUrl.fallback
  },
  getFormHeaderContentType() {
    return 'application/x-www-form-urlencoded'
  },
  getUploadHeaderContentType() {
    return 'multipart/form-data'
  },
  getJsonHeaderContentType() {
    return 'application/json'
  }
}
