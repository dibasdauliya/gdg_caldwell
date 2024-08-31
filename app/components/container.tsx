import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto p-5 max-w-6xl ${className}`}>{children}</div>;
}
