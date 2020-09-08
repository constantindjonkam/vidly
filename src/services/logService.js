const init = () => {};
const log = (error) => {
  // Raven.captureException(error);
  console.error(error);
};

export default { init, log };
