import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { graphql } from "https://cdn.pika.dev/graphql@^15.1.0";
import schema from "./Apis/schema.ts";
import resolvers from "./Apis/resolvers.ts";

console.log("server is creating Router");

const router = new Router();
router.post("/graphql", async ({ request, response }) => {
  try {
    if (request.hasBody) {
      console.log("request has body");
      const body = await request.body();

      console.log(`body is ${JSON.stringify(body)}`);
      response.body = await executeSchema(body.value);
    } else {
      response.body = "tout roule mais aucune requête GraphQL n'a été fournie";
    }
  } catch (ex) {
    response.body = `something wrong is append : ${ex.message}`;
  }
});

const executeSchema = async ({ query, variables }: any) => {
  return (await graphql(
    schema,
    query,
    resolvers,
    undefined,
    variables
  )) as object;
};

console.log("server is creating Application");
const app = new Application();
app.use(router.routes(), router.allowedMethods());

console.log("server is listening on PORT 3030");
app.listen({ port: 3030 });
