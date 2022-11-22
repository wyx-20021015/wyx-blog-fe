import wRequest from '..'
const url = '/upload'
const getField = async () => {
  const res = await wRequest.get<string[]>({ url: `${url}/field` })
  return res.data
}
const getFiles = async (field: string) => {
  if (field === null || !field?.length) return null
  const res = await wRequest.get<string[]>({ url: `${url}/${field}` })
  return res.data
}
export { getField, getFiles }
