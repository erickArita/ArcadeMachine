export default function createScriptURLFromFunction(fn: () => string): string {
  const code = fn().toString();

  const blob = new Blob([code], { type: 'application/javascript' });
  const workerScript = URL.createObjectURL(blob);

  return workerScript;
}
