# About

This is a sample Next.js application that uses [EZQ42](https://github.com/nicnocquee/ezq42.com) to run jobs in the serverless environment like Vercel.

Checkout the [/app/api/add](https://github.com/nicnocquee/ezq42example/blob/main/app/api/add/route.ts) route to see how to send a job to EZQ42.

Checkout the [/app/api/run](https://github.com/nicnocquee/ezq42example/blob/main/app/api/run/route.ts) route to see how to run a job from EZQ42.

Example curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"count": 10, "name": "My Job", "delay": 10000, "concurrency": 1}' https:/your-vercel-url/api/add
```
