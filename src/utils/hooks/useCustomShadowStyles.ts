import { useEffect } from "react";
import { waitForShadowElemCb } from "../waitForElement";

export function useCustomShadowStyles() {
  useEffect(() => {
    adjustHeader();
  }, []);
}

function adjustHeader() {
  waitForShadowElemCb(
    ".wb-header-bar.hydrated",
    "div.inner > div.logo-container > a.logo",
    (wbHeaderBar: Element) => {
      if (wbHeaderBar instanceof HTMLElement) {
        wbHeaderBar.style.display = "flex";
        wbHeaderBar.style.flexDirection = "row-reverse";
        wbHeaderBar.style.justifyContent = "space-around";
      }
    },
    {
      attributes: true
    }
  );

  waitForShadowElemCb(
    ".wb-header-bar.hydrated",
    "div.inner > div.logo-container > a.logo > svg.claim",
    (headerText: Element) => {
      if (headerText instanceof SVGElement) {
        headerText.style.position = "relative";
        headerText.style.insetBlockEnd = "0px";
      }
    },
    {
      attributes: true
    }
  );
}
