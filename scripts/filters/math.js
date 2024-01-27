'use strict';

hexo.extend.filter.register('after_post_render', (data) => {
  if (hexo.theme.config.post.math.engine === 'mathjax' && hexo.theme.config.post.math.mathjax.preprocess === true) {
    if (hexo.theme.config.post.math.specific === false || (hexo.theme.config.post.math.specific === true && data.math === true)) {
      const { mathjax } = require('mathjax-full/js/mathjax.js');
      const { TeX } = require('mathjax-full/js/input/tex.js');
      const { CHTML } = require('mathjax-full/js/output/chtml.js');
      const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
      const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
      const { AssistiveMmlHandler } = require('mathjax-full/js/a11y/assistive-mml.js');
      const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');
      const urlJoin = require('../utils/url-join');

      const adaptor = liteAdaptor();
      const handler = RegisterHTMLHandler(adaptor);
      AssistiveMmlHandler(handler);

      const tex = new TeX({ packages: AllPackages });
      const font_url = urlJoin(hexo.theme.config.static_prefix.mathjax.replace('es5/', ''), 'es5/output/chtml/fonts/woff-v2');
      const chtml = new CHTML({ fontURL: font_url });
      const html = mathjax.document(data.content, { InputJax: tex, OutputJax: chtml });

      html.render();

      const css = adaptor.textContent(chtml.styleSheet(html));
      data.content = adaptor.innerHTML(adaptor.body(html.document));

      if(hexo.theme.config._mathjax_css === undefined) {
        hexo.theme.config._mathjax_css = [];
      }
      hexo.theme.config._mathjax_css[data._id] = `<style>${css}</style>`;
    }
  }
});
