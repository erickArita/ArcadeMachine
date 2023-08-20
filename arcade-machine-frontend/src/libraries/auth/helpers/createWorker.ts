import createScriptURLFromFunction from '../utils/createAScriptUrlFromFunction';

export type ReturnWorker = {
  workerRef: Worker;
  destroy: () => void;
};

export function createWorker(workerFunction: () => string): ReturnWorker {
  // Creamos el Worker utilizando la función workerFunction
  const workerScriptURL = createScriptURLFromFunction(workerFunction);
  const workerRef = new Worker(workerScriptURL, {
    name: 'worker',
    type: 'module',
  });

  workerRef.postMessage('message');

  //  liberamos recursos
  const destroy = () => {
    //unregister worker
    if (workerRef) {
      workerRef.terminate();
    }
    URL.revokeObjectURL(workerScriptURL);
  };

  return { workerRef, destroy };
}
