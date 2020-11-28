export const service = {
  baseUrl: {
    fallback: '/api/'
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
