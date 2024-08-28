import { MagnifyingGlassIcon } from "@/shared/icons";
import styles from "./SearchInput.module.scss";

type TSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: TSearchInputProps) {
  return (
    <div className={styles.container}>
      <MagnifyingGlassIcon className={styles.searchIcon} />
      <input
        placeholder="Search"
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
