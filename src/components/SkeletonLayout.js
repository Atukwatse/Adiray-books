import React from 'react';

const SkeletonLayout = ({ isLoading }) => {
  return (
    <div className={`skeleton-overlay ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Top Mini-Bar Placeholder */}
      <div className="bg-gray-50/50 py-2 hide-under-992 border-b border-gray-100">
        <div className="responsive-container flex justify-end items-center h-4">
          <div className="skeleton-block w-40 h-2.5 rounded"></div>
        </div>
      </div>

      {/* Main Bar Placeholder */}
      <div className="bg-white border-b border-gray-200">
        <div className="responsive-container h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="skeleton-block w-10 h-10 rounded"></div>
            <div className="skeleton-block w-44 h-8 rounded"></div>
          </div>
          <div className="skeleton-block flex-1 max-w-2xl mx-8 h-10 rounded hide-under-992"></div>
          <div className="flex items-center space-x-6 shrink-0">
            <div className="skeleton-block w-8 h-8 rounded-full"></div>
            <div className="skeleton-block w-8 h-8 rounded-full show-under-992"></div>
          </div>
        </div>
      </div>

      {/* Category Sub-Bar Placeholder */}
      <div className="bg-white border-b border-gray-200 py-3 hide-under-992">
        <div className="responsive-container flex justify-center items-center h-6">
          <div className="skeleton-block w-3/4 h-4 rounded"></div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="relative bg-white overflow-hidden py-8 lg:py-12">
        <div className="hero-content-container responsive-container">
          <div className="hero-grid">
            {/* Left Content Placeholder */}
            <div className="hero-text-col w-full">
              <div className="space-y-6 w-full">
                <div className="skeleton-block w-1/3 h-4 rounded mx-auto lg:mx-0"></div>
                <div className="space-y-3">
                  <div className="skeleton-block w-3/4 h-12 rounded mx-auto lg:mx-0"></div>
                  <div className="skeleton-block w-1/2 h-10 rounded mx-auto lg:mx-0"></div>
                </div>
                <div className="skeleton-block w-5/6 h-5 rounded mx-auto lg:mx-0"></div>
                <div className="skeleton-block w-2/3 h-5 rounded mx-auto lg:mx-0"></div>
              </div>
              <div className="hero-actions w-full pt-4">
                <div className="skeleton-block w-40 h-12 rounded mx-auto sm:mx-0"></div>
                <div className="skeleton-block w-40 h-12 rounded mx-auto sm:mx-0"></div>
              </div>
            </div>

            {/* Right Content Placeholder */}
            <div className="hero-img-col">
              <div className="hero-img-wrapper skeleton-img-box">
                <div className="skeleton-block w-full h-[300px] sm:h-[400px] lg:h-[500px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLayout;
