import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
import executeSchema from "./Apis/schema.ts";

console.log("server is creating Router");

const router = new Router();
router.post("/graphql", async ({ request, response }) => {
  try {
    if (request.hasBody) {
      const body = await request.body();
      response.body = await executeSchema(body.value);
    } else {
      response.status = Status.BadRequest;
      response.body = "no graphQL request found";
    }
  } catch (ex) {
    response.status = Status.InternalServerError;
    response.body = ex;
  }
});

console.log("server is creating Application");
const app = new Application();
app.use(router.routes(), router.allowedMethods());

console.log("server is listening on PORT 3030");
app.listen({ port: 3030 });
