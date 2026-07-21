"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after the component has mounted on the client.
 *
 * Used to wrap react-slick sliders (and other components whose SSR markup does
 * not match their client markup), which otherwise trigger React hydration
 * mismatches. On the server this renders `fallback` (nothing by default), so
 * there is no SSR/client difference to reconcile.
 */
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
