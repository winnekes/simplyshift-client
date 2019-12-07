import {
    JsonController,
    Get,
    Param,
    Body,
    Post,
    getMetadataArgsStorage,
} from 'routing-controllers';

import User from './entity';
import { routingControllersToSpec } from 'routing-controllers-openapi';

@JsonController()
export default class UserController {
    @Get('/users/:id')
    getUser(@Param('id') id: number) {
        return User.findOne(id);
    }

    @Post('/users')
    async createUser(@Body() user: User) {
        const { password, ...rest } = user;
        const entity = User.create(rest);
        await entity.setPassword(password);
        return entity.save();
    }

    @Get('/spec')
    getSpec() {
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage);
        console.log(spec);
        return spec;
    }
}
