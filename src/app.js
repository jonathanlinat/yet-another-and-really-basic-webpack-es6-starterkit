if (module.hot) {
  module.hot.accept();
}

import log from "./modules/js/log"

const yo = Symbol()
String.prototype[yo] = () => "Yo 👋"

log(""[yo]())
