"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * TODO — build the curtain-wipe page transition here.
 *
 * The finished version uses an explicit phase machine:
 *   idle -> covering -> covered -> revealing -> idle
 *
 * - `navigate(href)` sets phase to "covering".
 * - A fixed, full-screen, origin-bottom "cover" bar animates scaleY 0 -> 1.
 *   Once that finishes (onAnimationComplete), set phase to "covered" and
 *   only THEN call `router.push(href)` — this is what keeps the new page
 *   from flashing in before the curtain has actually closed.
 * - A second fixed, full-screen, origin-top "reveal" bar sits at scaleY 1
 *   while "covered". Once the pathname actually changes (the new route has
 *   mounted underneath), set phase to "revealing", animating this bar
 *   scaleY 1 -> 0 to wipe open onto the new page.
 * - On mount, start in "covered" (not "idle") and immediately trigger a
 *   "revealing" transition — this gives a hard reload / first load the
 *   same wipe-open animation instead of an abrupt flash.
 *
 * For now this is a plain pass-through: TransitionLink navigates
 * immediately with no animation.
 */

interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export const useTransitionNavigate = () => {
  const ctx = useContext(TransitionContext);
  const router = useRouter();
  return ctx?.navigate ?? router.push;
};

const RouteTransition = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div className="relative">{children}</div>

      {/* TODO: fixed, full-screen "cover" bar (origin-bottom) animated via framer-motion */}
      {/* TODO: fixed, full-screen "reveal" bar (origin-top) animated via framer-motion */}
    </TransitionContext.Provider>
  );
};

export default RouteTransition;
