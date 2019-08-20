import request from '../../plugin/script/service/request';
class BaseHandler{
  constructor(uri) {
    this.uri = uri;
  }

  set_v1(url, data) {
    url = ['/v1', this.uri, '/w', url].join('');
    return request(url, data);
  }
  get_v1(url, data) {
    url = ['/v1', this.uri, '/r', url].join('');
    return request.post(url, data);
  }

  list_v1(url, data) {}
}

export default BaseHandler;
