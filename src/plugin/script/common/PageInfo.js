/** 页面数据 **/
class PageInfo {

  constructor(page=0, pageSizes, total=0) {
    if (isNaN(Number(page))) {
      throw "pageInfo page is not number";
    }
    if (Object.prototype.toString.call(pageSizes) !== '[object Array]') {
      throw "pageInfo pageSize is not Array";
    }
    if (isNaN(Number(total))){
      throw "pageInfo total is not number";
    }
    this.page = page;
    this.pageSizes = pageSizes;
    this.total = total;
  }
}

export default PageInfo;

