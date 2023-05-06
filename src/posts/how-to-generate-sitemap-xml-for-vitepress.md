# How to generate sitemap.xml for Vitepress (Vitepress 블로그에 sitemap.xml 생성하는 방법)

> 참고: https://github.com/vuejs/vitepress/issues/520

```bash
# install sitemap
npm i -D sitemap
```

```javascript{1,11,12,17,18}
// .vitepress/config.js
import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs'
import { resolve } from 'path'
// ...
export default {
  // ...
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated
      })
  },
  buildEnd: ({ outDir }) => {
    // you need to change hostname to your domain
    const sitemap = new SitemapStream({ hostname: 'https://example.com/foo' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
  }
  // ...
}
```