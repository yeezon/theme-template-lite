// import DemoComponent from './DemoComponent'

const componentDefs = [
  // DemoComponent
]

const install = function (Vue, options) {
  if (install.installed) return

  for (const oComDef of componentDefs) {
    Vue.component(oComDef.name, oComDef)
  }

  install.installed = true
}

export default {
  install
  // DemoComponent
}
