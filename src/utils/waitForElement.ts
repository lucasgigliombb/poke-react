export function waitForShadowElemCb(
  selector: string,
  shadowSelector: string,
  callbackFn: (el: Element) => void,
  options: {
    parentNode?: HTMLElement | null;
    attributes?: boolean;
  } = {
    parentNode: null,
    attributes: false
  }
): void {
  const { parentNode, attributes } = options;
  waitForElemCb(
    selector,
    (awaitedElem) => {
      void waitForShadowElemWithHostCb(
        awaitedElem,
        shadowSelector,
        callbackFn,
        true
      );
    },
    { parentNode, attributes }
  );
}

export async function waitForShadowElemWithHostCb(
  hostElem: Element,
  shadowSelector: string,
  callbackFn: (el: Element) => void,
  onlyOnce?: boolean
): Promise<void> {
  if (!hostElem.shadowRoot) {
    await pause(process.env.IS_JEST === "yes" ? 20000 : 3000);
  }

  if (!hostElem.shadowRoot) {
    throw new Error(
      `waitForShadowElemWithHostCb > shadowRoot missing on element: ${
        hostElem.localName
      }.${hostElem.className.replaceAll(" ", ".")}`
    );
  }

  const { shadowRoot } = hostElem;

  function tryToResolve(currentObserver?: MutationObserver) {
    const awaitedInnerElem = shadowRoot.querySelector(shadowSelector);
    if (awaitedInnerElem) {
      onlyOnce && currentObserver && currentObserver.disconnect();
      callbackFn(awaitedInnerElem);
      return true;
    }
  }

  if (tryToResolve()) return;

  const observer = new MutationObserver((_, currentObserver) =>
    tryToResolve(currentObserver)
  );
  observer.observe(hostElem, {
    childList: true,
    subtree: true,
    attributes: true
  });
}

/**
 * Registers a callbackFn which is executed every time an element specified
 * by @param `selector` enters DOM. Will run only once if @param `options.onlyOnce` is
 * set to `true`.
 */
export function waitForElemCb(
  selector: string,
  callbackFn: (el: Element) => void,
  options: {
    parentNode?: HTMLElement | null;
    attributes?: boolean;
    onlyOnce?: boolean;
  } = {
    parentNode: null,
    attributes: false,
    onlyOnce: false
  }
): void {
  const { parentNode, attributes, onlyOnce } = options;
  verifySelector(selector);

  const targets = new WeakSet();
  const observer = new MutationObserver((mutations, currentObserver) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (mutation.target instanceof HTMLElement) {
          const el: HTMLElement = mutation.target;
          const matches = selector
            .split(".")
            .filter((s) => s !== "")
            .every((s) => el.classList.contains(s));
          if (matches) {
            if (!targets.has(mutation.target)) {
              targets.add(mutation.target);
              onlyOnce && currentObserver.disconnect();
              callbackFn(mutation.target);
            }
          }
        }
      }
    }
  });

  observer.observe(parentNode || document.body, {
    childList: true,
    subtree: true,
    attributes
  });
}

function pause(millis = 3000) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(null);
    }, millis)
  );
}

function verifySelector(selector: string) {
  if (!selector.startsWith("."))
    throw new Error("Selector must start with '.'");
  if (selector.includes("[") || selector.includes("]"))
    throw new Error("Selector must be a list of classes");
}
