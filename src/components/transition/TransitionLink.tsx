"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { useTransitionNavigate } from "./RouteTransition";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

// Use this instead of next/link for internal same-app navigation (nav
// links, "next project" links, project thumbnails, etc.) so the click
// triggers the curtain-cover animation before the route actually changes.
// External links (mailto:, https://..., target="_blank") should keep using
// plain next/link — they aren't part of this transition.
const TransitionLink = ({ href, children, onClick, ...rest }: TransitionLinkProps) => {
  const navigate = useTransitionNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Let modifier-key clicks (open in new tab, etc.) behave natively.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (rest.target === "_blank") return;

    event.preventDefault();
    navigate(href.toString());
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default TransitionLink;
