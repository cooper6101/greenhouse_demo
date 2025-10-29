export const getError = (err, msg = 'Failed') => {
  if (!err) return msg;
  if (typeof err === 'string') return err;
  if (err.error) {
    if (typeof err.error === 'string') return err.error;
  }
  if (err.data) {
    if (typeof err.data === 'string') return err.data;
    if (err.data.error) return err.data.error;
  }

  return msg;
};
