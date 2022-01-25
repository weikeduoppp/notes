# Next

[ 文档 ]: https://nextjs.org/docs/getting-started



### 部署到vercel

一个存储库, 引用到vercel

分支预览. 生成master;	



getStaticPaths

```js
export async function getStaticPaths() {
  return {
    paths: Array<string | { params: { [key: string]: string } }>,
    fallback: boolean
  }
}
```

### 环境变量

.env.* 加载环境变量

Next.js允许您在`.env`（所有环境），`.env.development`（开发环境）和`.env.production`（生产环境）中设置默认值。

`.env.local` 始终会覆盖默认设置。

### 路由预加载和守卫

假设您有一个登录页面，登录后将用户重定向到仪表板。对于这种情况，我们可以预取仪表板以进行更快的转换，如以下示例所示：

```react
import { useCallback, useEffect } from 'react'
import Router from 'next/router'

export default function Login() {
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) Router.push('/dashboard')
    })
  }, [])

  useEffect(() => {
    // Prefetch the dashboard page as the user will go there after the login
    Router.prefetch('/dashboard')
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  )
}
```

在某些情况下（例如，如果使用[Custom Server](https://nextjs.org/docs/advanced-features/custom-server)），您可能希望监听[popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate)并在路由器[对其](https://developer.mozilla.org/en-US/docs/Web/Events/popstate)进行操作之前执行某些操作。

```react
import Router from 'next/router'

Router.beforePopState(({ url, as, options }) => {
  // I only want to allow these two routes!
  if (as !== '/' && as !== '/other') {
    // Have SSR render bad routes as a 404.
    window.location.href = as
    return false
  }

  return true
})
```



### 自定服务器

[express]: https://github.com/vercel/next.js/tree/canary/examples/custom-server-express	"express"



```js
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()	

app.prepare().then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```



### 引入redux

