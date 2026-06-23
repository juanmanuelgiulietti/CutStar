"use client";

import { motion, type Variants } from "framer-motion";
import StarLogo from "./StarLogo";
import Wordmark from "./Wordmark";
import styles from "./Hero.module.css";

/**
 * Scroll 1 — Hero.
 * No nav bar. Semi-transparent star behind the headline (slow pulse).
 * Copy is locked, in the size hierarchy defined by the brief.
 * Elements fade/scale in as the section mounts in the viewport.
 */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      {/* Ambient violet wash for depth */}
      <div
        className="ambient-glow"
        style={{
          width: 620,
          height: 620,
          top: "-12%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(124, 92, 252, 0.14)",
        }}
        aria-hidden="true"
      />

      {/* Star logo behind the headline */}
      <StarLogo className={styles.star} />

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.brandRow} variants={rise}>
          <Wordmark className={styles.wordmark} />
        </motion.div>

        <motion.h1 id="hero-headline" className={styles.headline} variants={rise}>
          Months of content.
          <br />
          Delivered within a day.
        </motion.h1>

        <motion.p className={styles.subhead} variants={rise}>
          The internet never stops. Neither should your content.
        </motion.p>

        <motion.p className={styles.body} variants={rise}>
          Send us your songs and footage. Our AI delivers a full batch of
          beat-synced, viral-optimized edits across multiple styles, ready to
          post. No briefs. No back and forth. No waiting on editors.
        </motion.p>

        <motion.p className={styles.credibility} variants={rise}>
          The first AI music edit engine trained on the editing patterns behind
          thousands of viral TikToks. It does more than sync to the beat. It
          knows when to cut, zoom, hold a shot, switch angles, and create the
          moments that keep people watching.
        </motion.p>
      </motion.div>
    </section>
  );
}
