import * as React from 'react';
import * as ReactDOM from 'react-dom';

window.Widget = (
  el: string | JSX.Element | DocumentFragment,
): void => {
  const node: string | JSX.Element | DocumentFragment | HTMLElement | null =
    typeof el === 'string' ? document.getElementById(el) : el;
  const app: JSX.Element = (
    <div>hello</div>
  );

  if (node) {
    ReactDOM.unmountComponentAtNode(
      node as Element | DocumentFragment | HTMLElement,
    );
    ReactDOM.render(app, node as Document | Element | DocumentFragment | null);
  }

  window.Widget.unmount = function unmount(): void {
    if (node) {
      ReactDOM.unmountComponentAtNode(node as Element | DocumentFragment);
    }
  };
};
