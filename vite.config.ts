import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// On Vercel, api/ is deployed as Node functions by the platform itself.
// `vite dev` doesn't serve those functions, so this dev-only plugin
// runs the same handler files directly against Vite's dev server middleware.
function apiDevServer(): Plugin {
  return {
    name: 'api-dev-server',
    apply: 'serve',
    configureServer(server) {
      // /classic (no trailing slash) needs a REAL redirect, not an internal
      // rewrite: rewriting only changes what gets served, not what the
      // browser's address bar shows, so relative links inside the old site
      // (href="tutorial.html") would resolve against "/" instead of
      // "/classic/" and 404 into the new app. The redirect fixes the address
      // bar first so every relative link on the old pages resolves correctly.
      server.middlewares.use((req, res, next) => {
        if (req.url === '/classic') {
          res.statusCode = 302
          res.setHeader('Location', '/classic/')
          res.end()
          return
        }
        if (req.url === '/classic/') {
          req.url = '/classic/index.html'
        }
        next()
      })

      server.middlewares.use('/api', async (req, res, next) => {
        const url = new URL(req.url ?? '', 'http://localhost')
        const segments = url.pathname.split('/').filter(Boolean)

        let modulePath: string | null = null
        let params: Record<string, string> = {}

        if (segments.length === 1 && segments[0] === 'chat') {
          modulePath = '/api/chat.ts'
        } else if (segments.length === 1 && segments[0] === 'evaluate') {
          modulePath = '/api/evaluate.ts'
        } else if (segments.length === 1 && segments[0] === 'scenarios') {
          modulePath = '/api/scenarios.ts'
        } else if (segments.length === 3 && segments[0] === 'scenarios' && segments[2] === 'start') {
          modulePath = '/api/scenarios/[id]/start.ts'
          params = { id: segments[1] }
        } else if (segments.length === 3 && segments[0] === 'scenarios' && segments[2] === 'trap') {
          modulePath = '/api/scenarios/[id]/trap.ts'
          params = { id: segments[1] }
        }

        if (!modulePath) {
          next()
          return
        }

        try {
          const mod = await server.ssrLoadModule(modulePath)
          const handler = mod.default as (req: unknown, res: unknown) => Promise<void> | void

          let body: unknown
          if (req.method === 'POST') {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(chunk as Buffer)
            const raw = Buffer.concat(chunks).toString('utf-8')
            body = raw ? JSON.parse(raw) : undefined
          }

          const devReq = Object.assign(req, { body, query: params })
          const devRes = {
            statusCode: 200,
            status(code: number) {
              this.statusCode = code
              return this
            },
            json(data: unknown) {
              res.statusCode = this.statusCode
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
            },
          }

          await handler(devReq, devRes)
        } catch (error) {
          console.error('[api-dev-server]', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Internal dev server error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), apiDevServer()],
  }
})
