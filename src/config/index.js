export const service = {
  baseUrl: {
    fallback: 'http://localhost'
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
