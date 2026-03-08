// frontend/src/components/ui/tooltip.tsx
import React, { ReactNode } from "react";

interface TooltipProviderProps {
  children: ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>; // just render children, no real tooltip logic
};