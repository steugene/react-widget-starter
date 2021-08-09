interface Window {
  Widget: {
    (
      el: string | JSX.Element | DocumentFragment,
    ): void;
    unmount?: () => void;
  }
}

declare module '*.scss' {
  const css: { [key: string]: string };
  export default css;
}
