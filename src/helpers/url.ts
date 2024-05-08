export const convertObjectToQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString()

export const getParamObjectFromURL = (url: string): Record<string, string> => {
  const urlData = new URL(url)
  const res:Record<string, string> = {}
  
  for (const p of  Array.from(urlData.searchParams)) {
    res[p[0]] = p[1]
  }

  return res
}
