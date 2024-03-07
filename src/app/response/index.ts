import {
  BadRequestException,
UnauthorizedException,
NotFoundException,
ForbiddenException,
NotAcceptableException,
RequestTimeoutException,
ConflictException,
GoneException,
HttpVersionNotSupportedException,
PayloadTooLargeException,
UnsupportedMediaTypeException,
UnprocessableEntityException,
InternalServerErrorException,
NotImplementedException,
ImATeapotException,
MethodNotAllowedException,
BadGatewayException,
ServiceUnavailableException,
GatewayTimeoutException,
PreconditionFailedException,
} from '@nestjs/common/exceptions';


export function badRequest(msg:string='bad request', data:any=[]) {
  throw new BadRequestException({
      msg,
      data,
      status:false,
      code:400
    })
}

export function notFound(msg:string='Route or resource not found', data:any=[]) {
  throw new NotFoundException({
      msg,
      status:false,
      code:404
    })
}

