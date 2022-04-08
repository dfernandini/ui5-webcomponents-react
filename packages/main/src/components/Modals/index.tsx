import React, { createRef, ElementType, MutableRefObject, RefObject } from 'react';
import * as ReactDOM from 'react-dom';
import {
  Dialog,
  DialogDomRef,
  DialogPropTypes,
  Popover,
  PopoverDomRef,
  PopoverPropTypes,
  ResponsivePopover,
  ResponsivePopoverDomRef,
  ResponsivePopoverPropTypes,
  Toast,
  ToastDomRef,
  ToastPropTypes
} from '../../webComponents';
import { MessageBox, MessageBoxPropTypes } from '../MessageBox';
import { ThemeProvider } from '../ThemeProvider';

// let createRoot;
// if ('createRoot' in ReactDOM) {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   createRoot = require(/* webpackIgnore: true */ 'react-dom/client').createRoot;
// }

// ReactDOM@18 Root
interface Root {
  render(children: React.ReactChild | Iterable<React.ReactNode>): void;

  unmount(): void;
}

type ModalReturnType<DomRef> = {
  ref: RefObject<DomRef>;
};

type ClosableModalReturnType<DomRef> = ModalReturnType<DomRef> & {
  close: () => void;
};

const getContainer = (givenContainer: HTMLElement) => {
  if (givenContainer) {
    return givenContainer;
  }
  const container = document.createElement('div');
  container.setAttribute('data-ui5wcr-modal', '');
  document.body.appendChild(container);
  return container;
};

const unmountComponent = (container: HTMLElement, root?: Root) => {
  if (root) {
    root.unmount();
  } else {
    ReactDOM.unmountComponentAtNode(container);
  }
  if (container.hasAttribute('data-ui5wcr-modal')) {
    container.remove();
  }
};

const render = async (
  Element: ElementType,
  props: { ref: MutableRefObject<any> } & Record<string, unknown>,
  container: HTMLElement
): Promise<void | Root> => {
  return new Promise((resolve) => {
    // if (createRoot) {
    //   const root = createRoot(container);
    //   root.render(
    //     <ThemeProvider>
    //       <Element
    //         {...props}
    //         ref={(el) => {
    //           resolve(root);
    //           props.ref.current = el;
    //         }}
    //       />
    //     </ThemeProvider>
    //   );
    // } else {
    setTimeout(() => {
      ReactDOM.render(
        <ThemeProvider>
          <Element {...props} />
        </ThemeProvider>,
        container,
        () => {
          resolve();
        }
      );
    }, 0);
    // }
  });
};

/**
 * Utility class for opening modals in an imperative way.
 *
 * These static helper methods might be useful for showing e.g. Toasts or MessageBoxes after successful or failed
 * network calls.
 *
 * @since 0.22.2
 */
export class Modals {
  public static showDialog(props: DialogPropTypes, container?: HTMLElement): ClosableModalReturnType<DialogDomRef> {
    const ref = createRef<DialogDomRef>();
    const domContainer = getContainer(container);
    let root;
    render(
      Dialog,
      {
        ...props,
        ref,
        open: true,
        onAfterClose: (event) => {
          if (typeof props.onAfterClose === 'function') {
            props.onAfterClose(event);
          }
          unmountComponent(domContainer, root);
        }
      },
      domContainer
    ).then((componentRoot) => {
      root = componentRoot;
    });

    return {
      ref,
      close: () => {
        ref.current?.close();
      }
    };
  }

  public static showPopover(props: PopoverPropTypes, container?: HTMLElement): ClosableModalReturnType<PopoverDomRef> {
    const ref = createRef<PopoverDomRef>();
    const domContainer = getContainer(container);
    let root;
    render(
      Popover,
      {
        ...props,
        ref,
        open: true,
        onAfterClose: (event) => {
          if (typeof props.onAfterClose === 'function') {
            props.onAfterClose(event);
          }
          unmountComponent(domContainer, root);
        }
      },
      domContainer
    ).then((componentRoot) => {
      root = componentRoot;
    });
    return {
      ref,
      close: () => {
        ref.current?.close();
      }
    };
  }

  public static showResponsivePopover(
    props: ResponsivePopoverPropTypes,
    container?: HTMLElement
  ): ClosableModalReturnType<ResponsivePopoverDomRef> {
    const ref = createRef<ResponsivePopoverDomRef>();
    const domContainer = getContainer(container);
    let root;
    render(
      ResponsivePopover,
      {
        ...props,
        ref,
        open: true,
        onAfterClose: (event) => {
          if (typeof props.onAfterClose === 'function') {
            props.onAfterClose(event);
          }
          unmountComponent(domContainer, root);
        }
      },
      domContainer
    ).then((componentRoot) => {
      root = componentRoot;
    });
    return {
      ref,
      close: () => {
        ref.current?.close();
      }
    };
  }

  public static showMessageBox(
    props: MessageBoxPropTypes,
    container?: HTMLElement
  ): ClosableModalReturnType<DialogDomRef> {
    const ref = createRef<DialogDomRef>();
    const domContainer = getContainer(container);
    let root;
    render(
      MessageBox,
      {
        ...props,
        ref,
        open: true,
        onClose: (event) => {
          if (typeof props.onClose === 'function') {
            props.onClose(event);
          }
          unmountComponent(domContainer, root);
        }
      },
      domContainer
    ).then((componentRoot) => {
      root = componentRoot;
    });

    return {
      ref,
      close: () => {
        ref.current?.close();
      }
    };
  }

  public static showToast(props: ToastPropTypes, container?: HTMLElement): ModalReturnType<ToastDomRef> {
    const ref = createRef<ToastDomRef>();
    const domContainer = getContainer(container);
    render(Toast, { ...props, ref }, domContainer).then((root) => {
      ref.current.show();
      setTimeout(() => {
        if (root) {
          root.unmount();
        } else {
          unmountComponent(domContainer);
        }
      }, props.duration ?? Toast.defaultProps.duration);
    });

    return {
      ref
    };
  }
}