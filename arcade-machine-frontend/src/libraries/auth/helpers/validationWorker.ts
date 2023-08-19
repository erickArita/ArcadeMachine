export const workerTask = (broadcastChannelName: string) => {
  const aceptedNames = ['verifyToken'];

  if (!aceptedNames.includes(broadcastChannelName)) return '';

  return `
  self.addEventListener('message', (event) => {
    const { exp } = event.data;

    const currentTime = Date.now() / 1000;
    const timeRemaining = (exp - currentTime);

    const id = setTimeout(() => {
      postMessage({ type: '${broadcastChannelName}' });
    }, timeRemaining);

   });`;
};
