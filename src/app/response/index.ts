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


const parse= (msg, data) => ({msg, status:false, data})


export function badRequest(msg:string='bad request', data:any=[]) {
  throw new BadRequestException(parse(msg,data))
}

export function unauthorized(msg:string='Unauthorized', data:any=[]) {
  throw new BadRequestException(parse(msg,data))
}


export function notFound(msg:string='Route or resource not found', data:any=[]) {
  throw new NotFoundException(parse(msg,data))
}

