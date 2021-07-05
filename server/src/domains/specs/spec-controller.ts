import {
  Get,
  getMetadataArgsStorage,
  JsonController,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { MetadataStorage, getFromContainer } from "class-validator";

@JsonController()
export default class SpecController {
  @Get("/spec")
  getSpec() {
    const metadatas = (getFromContainer(MetadataStorage) as any)
      .validationMetadatas;

    const schemas = validationMetadatasToSchemas(metadatas);

    const storage = getMetadataArgsStorage();
    return routingControllersToSpec(
      storage,
      {},
      {
        components: {
          schemas,
          securitySchemes: {
            bearerAuth: {
              scheme: "bearer",
              type: "http",
              bearerFormat: "JWT",
            },
          },
        },
        info: { title: "SimplyShift", version: "1.0.0" },
      }
    );
  }
}
