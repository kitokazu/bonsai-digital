"use client";

import { motion } from "framer-motion";

/* Remounts on every navigation within /work, fading the incoming page in.
   Opacity only: a transform here would turn the fixed navbar's containing
   block into this wrapper and drag it during the animation. */
export default function WorkTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
