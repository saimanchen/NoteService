import fastifyJwt from "@fastify/jwt"; // fastify-plugin

import fp from "fastify-plugin";

async function Auth(server, options) {

  await server.register(fastifyJwt, {
    secret: "Hello123",
    sign: {
      expiresIn: "15m"
     }
  })

  await server.decorate("authenticate", async (req, res) => {
    try {
      await req.jwtVerify()
    } catch (error) {
      res.send(error)
    }
  })
}

export default fp(Auth)