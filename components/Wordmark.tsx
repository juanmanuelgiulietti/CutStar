import styles from "./Wordmark.module.css";

const LETTERS = ["C", "U", "T", "S", "T", "A", "R"] as const;

const OFFSETS_Y = [0, 0.05, -0.035, 0.07, -0.02, 0.045, -0.055];
const ROTATIONS = [-1.2, 0.8, -0.6, 1.4, -0.9, 0.5, -1.1];

type WordmarkProps = {
  className?: string;
  ariaLabel?: string;
};

export default function Wordmark({
  className,
  ariaLabel = "CUTSTAR",
}: WordmarkProps) {
  return (
    <span
      className={`${styles.wordmark} ${className ?? ""}`}
      role="img"
      aria-label={ariaLabel}
    >
      {LETTERS.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={styles.letter}
          style={
            {
              "--ty": `${OFFSETS_Y[i]}em`,
              "--rot": `${ROTATIONS[i]}deg`,
            } as React.CSSProperties
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}
