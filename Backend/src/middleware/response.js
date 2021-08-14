// eslint-disable-next-line arrow-body-style
module.exports = (message, data, success) => {
  return {
    message: message || null,
    data: data || null,
    success: success == null ? true : success,
  };
};
