import { GraphQLError, GraphQLFormattedError } from 'graphql';

interface NestHttpError {
  getStatus?: () => number;
  status?: number;
  message?: string;
  response?: {
    message?: string | string[];
    [key: string]: unknown;
  };
}

export function formatGraphQLError(error: GraphQLError): GraphQLFormattedError {
  const originalError = error.originalError;

  const isNestHttpError = (err: unknown): err is NestHttpError =>
    typeof err === 'object' &&
    err !== null &&
    ('getStatus' in err || 'status' in err || 'response' in err);

  let status = 500;
  let message = 'Internal server error';
  let code = 'INTERNAL_SERVER_ERROR';

  if (isNestHttpError(originalError)) {
    status =
      originalError.getStatus?.() ??
      originalError.status ??
      (typeof error.extensions?.status === 'number'
        ? error.extensions.status
        : 500);

    const rawMessage = originalError.response?.message;
    message = Array.isArray(rawMessage)
      ? rawMessage[0]
      : (rawMessage ?? originalError.message ?? message);

    code =
      status === 404
        ? 'NOT_FOUND'
        : status === 400
          ? 'BAD_REQUEST'
          : status === 401
            ? 'UNAUTHORIZED'
            : status === 403
              ? 'FORBIDDEN'
              : 'INTERNAL_SERVER_ERROR';
  } else {
    status =
      typeof error.extensions?.status === 'number'
        ? error.extensions.status
        : 500;
    message = error.message ?? message;

    code =
      status === 404
        ? 'NOT_FOUND'
        : status === 400
          ? 'BAD_REQUEST'
          : status === 401
            ? 'UNAUTHORIZED'
            : status === 403
              ? 'FORBIDDEN'
              : 'INTERNAL_SERVER_ERROR';
  }

  return {
    message,
    path: error.path,
    extensions: {
      code,
      status,
    },
  };
}
