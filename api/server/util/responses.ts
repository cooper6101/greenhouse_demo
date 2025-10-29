export const handleError = (res, statusCode = 500) => {
  return function (err) {
    if (err.statusCode) {
      statusCode = err.statusCode;
      console.error('code', statusCode, err);
    }

    return res.status(statusCode).send(err.message || err);
  };
};

export const respondWithResult = (res, statusCode = 200) => {
  return function (entity = '' as any) {
    return res.status(statusCode).send(entity);
  };
};
