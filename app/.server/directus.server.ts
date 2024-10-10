import { Todos } from "../types/types"
import { createDirectus, rest, authentication } from "@directus/sdk";


type Schema = {
  Todos: Todos[];
}



const directusClient = createDirectus<Schema>(process.env.DIRECTUS_URL!)
  .with(rest())
  .with(authentication("json"))

export default directusClient;