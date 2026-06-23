"use client";

import { motion, type Variants } from "framer-motion";
import styles from "./HowItWorks.module.css";

/**
 * Scroll 2 — How It Works.
 * Three video-placeholder cards, staggered asymmetrically (not a flat grid),
 * each a visibly styled card. Cards fade/scale in as they enter the viewport.
 */

type Step = {
  index: string;
  title: string;
  body: string;
  /** vertical offset (rem) to break the grid into an editorial stagger */
  offset: number;
};

const STEPS: Step[] = [
  {
    index: "01",
    title: "Upload",
    body: "Drop in your songs and any footage you want included.",
    offset: 0,
  },
  {
    index: "02",
    title: "We handle the rest",
    body: "Our engine syncs every cut to the beat, pulls in outside clips where needed, and builds out a full batch across multiple styles.",
    offset: 4.5,
  },
  {
    index: "03",
    title: "Post",
    body: "Receive ready-to-post content and start flooding the For You Page.",
    offset: 1.75,
  },
];

const card: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-title">
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.eyebrow}>How it works</span>
        <h2 id="how-title" className={styles.title}>
          From raw files to a full batch.
        </h2>
      </motion.header>

      <div className={styles.grid}>
        {STEPS.map((step) => (
          <motion.article
            key={step.index}
            className={styles.card}
            style={{ marginTop: `${step.offset}rem` }}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.ratio}>9 : 16</span>
              <span className={styles.play}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </div>

            <div className={styles.meta}>
              <span className={styles.index}>{step.index}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
