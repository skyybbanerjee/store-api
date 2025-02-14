const notFound = (_, res) =>
  res.status(404).send("<h2>Route does not exist 🌵</h2>");

export default notFound;
