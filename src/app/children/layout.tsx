"use client";

import { Suspense } from "react";

export default function ChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
