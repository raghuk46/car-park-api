import queryString from 'query-string';
import RoutesCollection from './routesCollection';

class URIGenerator {
  getURI(controllerAction, params, id) {
    const caArray = controllerAction.split('_');
    const routeData = RoutesCollection[caArray[0]][caArray[1]];
    const uri = params ? this.bindParams(routeData.uri, params) : routeData.uri;

    return {
      id: id || routeData.action,
      method: routeData.httpMethod,
      uri,
    };
  }

  bindParams(uri, params) {
    let match;
    let replacement;
    let uriParam = uri;
    const replacedParams = [];

    while ((match = /:([\w_]+)\??/gi.exec(uriParam))) {
      replacement = params[match[1]].toString() || '';
      if (replacement === '') {
        uriParam = uriParam.replace(`/${match[0]}`, '');
      } else {
        uriParam = uriParam.replace(match[0], replacement);
        replacedParams.push(match[1]);
      }
    }

    const paramsForQueryString = {};
    Object.keys(params).forEach((p) => {
      if (!replacedParams.includes(p)) {
        paramsForQueryString[p] = params[p];
      }
    });

    if (Object.keys(paramsForQueryString).length > 0) {
      uriParam = `${uriParam}?${queryString.stringify(paramsForQueryString)}`;
    }

    return uriParam;
  }
}

export default URIGenerator;
