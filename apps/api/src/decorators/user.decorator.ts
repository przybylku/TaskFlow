import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const getUser = createParamDecorator((data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user
})