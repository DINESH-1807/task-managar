import React, { useState, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  isRefreshing?: boolean;
}

export function PullToRefresh({ onRefresh, children, isRefreshing = false }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const pullThreshold = 70;

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;

    if (distance > 0 && window.scrollY === 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, pullThreshold));
      setIsPulling(distance > pullThreshold);
    }
  };

  const handleTouchEnd = async () => {
    if (isPulling) {
      await onRefresh();
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  return (
    <div
      className="pull-refresh"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ paddingTop: isPulling ? pullDistance : 0 }}
    >
      <div
        className={`pull-refresh-indicator ${isPulling ? 'pulling' : ''}`}
        style={{ transform: `translateY(${pullDistance - pullThreshold}px)` }}
      >
        <div className="flex items-center justify-center p-4">
          <RefreshCw
            className={`h-6 w-6 text-primary ${
              isRefreshing || isPulling ? 'animate-spin' : ''
            }`}
          />
        </div>
      </div>
      {children}
    </div>
  );
}