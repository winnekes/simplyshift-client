import {
    Get,
    getMetadataArgsStorage,
    JsonController,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

@JsonController()
export default class SpecController {
    @Get('/spec')
    getSpec() {
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage);
        console.log(spec);
        return spec;
    }
}
