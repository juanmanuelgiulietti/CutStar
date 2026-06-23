"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChooseYourPath, { type PathId } from "./ChooseYourPath";
import AgencyForm from "./forms/AgencyForm";
import ArtistForm from "./forms/ArtistForm";

/**
 * Scroll 3 + 4 container.
 * Holds the selected path. Clicking a card (Scroll 3) replaces both cards with
 * that path's form only (Scroll 4) — a click swap, not a scroll. The form's
 * X/back returns to the cards.
 */

const swap = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export default function PathSwitcher() {
  const [path, setPath] = useState<PathId | null>(null);
  const back = () => setPath(null);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {path === null ? (
        <motion.div key="cards" {...swap}>
          <ChooseYourPath onSelect={setPath} />
        </motion.div>
      ) : (
        <motion.div key={`form-${path}`} {...swap}>
          {path === "artist" ? (
            <ArtistForm onBack={back} />
          ) : (
            <AgencyForm onBack={back} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
