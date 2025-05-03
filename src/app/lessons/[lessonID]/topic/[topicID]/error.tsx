"use client";

export default function Error({ error }: { error: Error }) {
  return <div>Failed to load lessons: {error.message}</div>;
}
