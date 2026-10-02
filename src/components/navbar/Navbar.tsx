"use client";

/**
 * TODO — build the primary nav + collaborator flyout here.
 *
 * - Import `navLinks` from "@/data/nav" and render each as a pill button
 *   using <TransitionLink> (from "@/components/transition/TransitionLink")
 *   so navigation goes through the page transition.
 * - Import `articleItems` from "@/data/nav" and render the expandable
 *   "flyout" stack — a stack of `.article-item` pills that spread apart
 *   when a `isActive` state is toggled (see the `.nav-external-links`
 *   rules you'll add to globals.css).
 * - Add a "Show less" button that collapses the flyout back down.
 */

const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 z-[2] flex w-full justify-between p-[1.5em] max-[900px]:p-[1em]">
      {/* TODO: primary nav links */}

      {/* TODO: collaborator flyout */}
    </div>
  );
};

export default Navbar;
