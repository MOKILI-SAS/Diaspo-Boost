export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export function notFound(message = 'Ressource introuvable'): HttpError {
  return new HttpError(404, 'NOT_FOUND', message)
}

export function conflict(message: string): HttpError {
  return new HttpError(409, 'DUPLICATE', message)
}

export function unauthorized(message = 'Accès non autorisé'): HttpError {
  return new HttpError(401, 'UNAUTHORIZED', message)
}
