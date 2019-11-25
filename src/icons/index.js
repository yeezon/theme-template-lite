import Vue from 'vue'
import Icon from './Icon'

// Register Globally
Vue.component(Icon.name, Icon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)

requireAll(req)
