'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';

export default function TopLoader() {
  const pathname = usePathname();
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current?.continuousStart();
    const timeout = setTimeout(() => {
      ref.current?.complete();
    }, 200); // you can tweak the delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <LoadingBar color="#0369a1" ref={ref} height={5} shadow={false} />;
}
