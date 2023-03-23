import { useRef, useEffect, useState } from 'react';

export default function ProgressBar() {
  const progressBarRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const width = (scrollY / (documentHeight - windowHeight)) * 100;
      setWidth(width);
    };

    // Lắng nghe sự kiện scroll của trang web
    window.addEventListener('scroll', updateProgress);

    return () => {
      // Hủy lắng nghe sự kiện scroll khi component unmount
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="progress-bar h-[5px] bg-teal-600"
      style={{ width: `${width}%` }}
    />
  );
}