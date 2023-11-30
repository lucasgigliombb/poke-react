import { useEffect, useState } from "react";
import {
  MediaQuery,
  MediaQueryChangeEvent,
  MediaQueryService
} from "@workbench/core";

const mqService = new MediaQueryService(window);

type Props = {
  breakpoints: MediaQuery[];
};

export function useGetMediaQuery({ breakpoints }: Props): string {
  const [mediaQuery, setMediaQuery] = useState(
    breakpoints.includes(mqService.getCurrentMediaQuery())
      ? mqService.getCurrentMediaQuery()
      : ""
  );

  useEffect(() => {
    window.addEventListener("wbresize", handleWindowResize);
    return () => window.removeEventListener("wbresize", handleWindowResize);
  }, [breakpoints, mediaQuery]);

  function handleWindowResize(e: CustomEvent<MediaQueryChangeEvent>) {
    console.log(e.detail.current);
    setMediaQuery(
      breakpoints.includes(e.detail.current) ? e.detail.current : mediaQuery
    );
  }

  return mediaQuery;
}
