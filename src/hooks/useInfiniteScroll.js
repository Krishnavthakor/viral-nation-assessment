import { useState, useRef, useCallback, useEffect } from 'react';

// Hook is created for implementing custom infnite pagination.
function useInfiniteScroll(onHandleScroll) {
  const [page, setPage] = useState(0);
  const loadMoreRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting) {
      onHandleScroll?.();
      setPage((prev) => prev + 1);
    }
  }, [onHandleScroll]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    };
  }, [handleObserver]);

  return { loadMoreRef, page };
}

export default useInfiniteScroll;