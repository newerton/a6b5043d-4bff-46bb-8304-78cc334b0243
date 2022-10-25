const { fakeDatabase } = require('../database/fakeDatabase');
const {
  respondWith405MethodNotAllowed,
  urlPathnameArray,
  respondWith404NotFound,
  respondWith200OkJson,
} = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');
const _ = require('lodash');

function handle(request, response) {
  if (!(request.method === 'GET' || request.method === 'DELETE')) {
    respondWith405MethodNotAllowed(response);
    return routerHandleResult.HANDLED;
  }

  const id = urlPathnameArray(request)[1];
  const contact = fakeDatabase.selectFromContactsById(id);

  if (_.isEmpty(contact)) {
    respondWith404NotFound(response);
    return routerHandleResult.HANDLED;
  }

  if (request.method === 'GET') {
    respondWith200OkJson(response, contact[0]);
  } else {
    const remaingContants = fakeDatabase.deleteContactsById(id);
    respondWith200OkJson(response, remaingContants);
  }

  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
