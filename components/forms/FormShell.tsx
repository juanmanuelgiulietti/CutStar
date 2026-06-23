"use client";

import type { ReactNode } from "react";
import styles from "./forms.module.css";

type FormShellProps = {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: ReactNode;
};

export default function FormShell({
  title,
  subtitle,
  onBack,
  children,
}: FormShellProps) {
  return (
    <section className={styles.section} aria-labelledby="form-title">
      <div className={styles.panel}>
        <button
          type="button"
          className={styles.back}
          onClick={onBack}
          aria-label="Back to options"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M18 6 6 18M6 6l12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <header className={styles.header}>
          <h2 id="form-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        {children}

        <p className={styles.note}>
          We review every application. Selected applicants receive a private
          access code.
        </p>
      </div>
    </section>
  );
}
