export function uuid(hasHyphen = false) {
  return (
    hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  ).replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getToken() {
  return 'sk-a6df182f06d049a895cfc91692a27444'
}

export const scrollIntoView = (eleId: string) => {
  const ele = document.getElementById(eleId)
  if (!ele) return
  setTimeout(() => {
    ele.scrollIntoView({ behavior: 'smooth', block: 'end' })
  })
}
