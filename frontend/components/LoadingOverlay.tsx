'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white dark:bg-(--bg-dark) shadow-soft-lg">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-12 h-12 text-primary" />
          <h2 className="loading-title">Synthesizing Your Image</h2>
          <p className="text-[#777] dark:text-(--text-secondary) text-center max-w-xs">
            Please wait while we process your Image and make prediction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
