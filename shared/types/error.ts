export interface FetchError {
  data?: {
    statusMessage: string
    data?: { message?: string }
  }
}
