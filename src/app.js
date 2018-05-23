import log from './modules/js/log'

if (module.hot) {
  module.hot.accept()
}

const yo = Symbol('')

// eslint-disable-next-line
String.prototype[yo] = () => 'Yo 👋'

log(''[yo]())
