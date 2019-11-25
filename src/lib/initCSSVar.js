
export default function (setting) {
  setting = setting || {}

  for (const _key in setting) {
    if (/^__/.test(_key)) {
      const eHTML = window.document.documentElement
      eHTML.style.setProperty(_key.replace(/^__/, '--'), setting[_key])
    }
  }
}
