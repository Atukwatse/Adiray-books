import React from 'react';

const HeaderSkeleton = () => (
  <>
    <div className="bg-gray-50/50 py-2 hide-under-992 border-b border-gray-100">
      <div className="responsive-container flex justify-end items-center h-4">
        <div className="skeleton-block w-40 h-2.5 rounded"></div>
      </div>
    </div>

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

    <div className="bg-white border-b border-gray-200 py-3 hide-under-992">
      <div className="responsive-container flex justify-center items-center h-6">
        <div className="skeleton-block w-3/4 h-4 rounded"></div>
      </div>
    </div>
  </>
);

const MiniBookSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
    <div className="skeleton-block h-48 w-full"></div>
    <div className="p-5 space-y-4">
      <div className="skeleton-block w-3/4 h-5 rounded"></div>
      <div className="skeleton-block w-1/2 h-4 rounded"></div>
      <div className="skeleton-block w-2/3 h-4 rounded"></div>
      <div className="skeleton-block w-1/3 h-6 rounded"></div>
      <div className="space-y-2">
        <div className="skeleton-block w-full h-3 rounded"></div>
        <div className="skeleton-block w-5/6 h-3 rounded"></div>
      </div>
      <div className="skeleton-block w-full h-10 rounded-lg"></div>
    </div>
  </div>
);

const HomeSkeleton = () => (
  <div className="relative bg-white overflow-hidden py-8 lg:py-12">
    <div className="hero-content-container responsive-container">
      <div className="hero-grid">
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

        <div className="hero-img-col">
          <div className="hero-img-wrapper skeleton-img-box">
            <div className="skeleton-block w-full h-[300px] sm:h-[400px] lg:h-[500px]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CatalogSkeleton = () => (
  <div className="bg-[#F5F2EB] py-10">
    <div className="responsive-container">
      <div className="skeleton-block h-12 w-full max-w-4xl mx-auto rounded mb-10"></div>
      <div className="flex gap-8">
        <div className="hidden lg:block w-60 xl:w-64 shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="skeleton-block w-20 h-5 rounded"></div>
            <div className="space-y-3">
              <div className="skeleton-block w-28 h-4 rounded"></div>
              <div className="skeleton-block w-32 h-4 rounded"></div>
              <div className="skeleton-block w-24 h-4 rounded"></div>
              <div className="skeleton-block w-28 h-4 rounded"></div>
            </div>
            <div className="skeleton-block w-20 h-5 rounded"></div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="skeleton-block w-full h-4 rounded"></div>
              ))}
            </div>
            <div className="skeleton-block w-24 h-5 rounded"></div>
            <div className="skeleton-block w-full h-10 rounded"></div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-8 space-y-3">
            <div className="skeleton-block w-64 h-7 rounded"></div>
            <div className="skeleton-block w-80 h-4 rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <MiniBookSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonLayout = ({ isLoading, variant = 'home' }) => {
  return (
    <div className={`skeleton-overlay ${
      isLoading 
        ? 'opacity-100 pointer-events-auto' 
        : 'opacity-0 pointer-events-none transition-opacity duration-500 ease-in-out'
    }`}>
      <HeaderSkeleton />
      {variant === 'home' ? <HomeSkeleton /> : <CatalogSkeleton />}
    </div>
  );
};

export default SkeletonLayout;
