import { useState } from 'react';

export default function useCount() {
  const [count, setCount] = useState(0);
  return [count, setCount];
}
