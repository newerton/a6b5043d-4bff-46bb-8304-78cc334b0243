const { 
  respondWith404NotFound, 
  urlPathOf, 
  urlPathnameArray, 
  respondWith200OkJson 
} = require('./httpHelpers');
const { routerHandleResult } = require('./routerHandleResult');

const routers = [
  require('./ping').pingRouter,
  require('./contacts').contactsRouter,
  require('./contactDetails').contactDetailsRouter,
];

module.exports = function(request, response) {
  if (
    !(
      urlPathOf(request).includes('ping') ||
      urlPathOf(request).includes('contacts')
    )
  ) {
    return respondWith404NotFound(response);
  }

  if (urlPathOf(request) === '/ping') {
    if (routers[0].handle(request, response) !== routerHandleResult.HANDLED) {
      return respondWith404NotFound(response);
    }
  }

  if (urlPathOf(request).includes('contacts')) {
    const pathnameArray = urlPathnameArray(request);

    if (pathnameArray.length === 1) {
      if (routers[1].handle(request, response) !== routerHandleResult.HANDLED) {
        respondWith404NotFound(response);
      } else {
        respondWith200OkJson(response);
      }
    } else {
      if (routers[2].handle(request, response) !== routerHandleResult.HANDLED) {
        respondWith404NotFound(response);
      } else {
        respondWith200OkJson(response);
      }
    }
  }
};