"use client";

import { motion, type Variants } from "framer-motion";
import styles from "./ChooseYourPath.module.css";

/**
 * Scroll 3 — Choose Your Path.
 * Two cards side by side. Locked copy per brief.
 * `onSelect` is wired in Entrega 4: clicking a card's CTA replaces both cards
 * with that path's form. For now it is optional so the section stands alone.
 */

export type PathId = "artist" | "agency";

type ChooseYourPathProps = {
  onSelect?: (path: PathId) => void;
};

const PATHS: {
  id: PathId;
  title: string;
  blurb: string;
  cta: string;
  primary: boolean;
}[] = [
  {
    id: "artist",
    title: "I'm an artist or creator",
    blurb: "Claim your free edit + get notified when unlimited drops.",
    cta: "Get My Free Edit",
    primary: true,
  },
  {
    id: "agency",
    title: "I represent a label, agency, or management",
    blurb: "See what we can do for your roster.",
    cta: "Apply for a Demo",
    primary: false,
  },
];

const card: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ChooseYourPath({ onSelect }: ChooseYourPathProps) {
  return (
    <section className={styles.section} aria-labelledby="path-title">
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.eyebrow}>Choose your path</span>
        <h2 id="path-title" className={styles.title}>
          Two ways in.
        </h2>
      </motion.header>

      <div className={styles.grid}>
        {PATHS.map((p, i) => (
          <motion.article
            key={p.id}
            className={`${styles.card} ${p.primary ? styles.cardPrimary : ""}`}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.blurb}>{p.blurb}</p>
            </div>

            <button
              type="button"
              className={`${styles.cta} ${
                p.primary ? styles.ctaPrimary : styles.ctaSecondary
              }`}
              onClick={() => onSelect?.(p.id)}
            >
              {p.cta}
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
