hexo.extend.filter.register('before_post_render', function(data){
  if(data._bypass === undefined) {
    data._bypass = {};
  }
  return data;
}, -99);
