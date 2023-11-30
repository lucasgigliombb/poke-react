import { WbPagination } from "@workbench/react";
import { PokeDropdown } from "../PokeDropdown/PokeDropdown";
import styles from "./pokeFooter.module.scss";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

type Props = {
  maxResults: number;
  pkmnPerPage: number;
  currentPage: number;
  onPageChange: (event: CustomEvent) => void;
  onPageSizeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const OPTIONS: number[] = [5, 10, 20, 50];

export function PokeFooter({
  maxResults: totalResults,
  pkmnPerPage,
  currentPage,
  onPageChange,
  onPageSizeChange
}: Props) {
  console.log("Rendering PokeFooter");
  const [totalOfPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(getTotalOfPages());
  }, [pkmnPerPage]);

  return (
    <div className={styles.footer}>
      <PokeDropdown
        label="Pkmn per page"
        options={OPTIONS}
        selectedValue={pkmnPerPage}
        onChange={onPageSizeChange}
      />
      <WbPagination
        pages={totalOfPages}
        onWbchange={onPageChange}
        currentPage={currentPage}
        className={styles.pagination}
      />
    </div>
  );

  function getTotalOfPages() {
    return totalResults > pkmnPerPage
      ? (totalResults / pkmnPerPage) % 2 > 0
        ? Math.ceil(totalResults / pkmnPerPage)
        : totalResults / pkmnPerPage
      : 1;
  }
}
