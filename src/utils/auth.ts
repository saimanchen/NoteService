import fastifyJwt from "@fastify/jwt"; // fastify-plugin
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

async function Auth(server: FastifyInstance, options: FastifyPluginOptions): Promise<void> {

  await server.register(fastifyJwt, {
    secret: "Hello123",
    sign: {
      expiresIn: "15m"
     }
  })

  server.decorate("authenticate", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify()
    } catch (error) {
      res.code(401).send(error)
    }
  })
}

export default fp(Auth)