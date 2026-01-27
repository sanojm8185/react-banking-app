import { useEffect, useState } from "react";

export function useInfiniteTransactions(options?: { mock?: boolean, mockDescriptions?: string[] }) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (options?.mock) {
      fetchMockTransactions(page);
    } else {
      fetchTransactions(page);
    }
  }, [page]);

  // Mock data generator
  function fetchMockTransactions(page: number) {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const descriptions = options?.mockDescriptions || [
        'ATM Withdrawal', 'Salary Credit', 'Online Shopping', 'Interest Credit', 'Utility Bill',
      ];
      const items = Array.from({ length: 10 }, (_, i) => {
        const id = (page - 1) * 10 + i + 1;
        const amount = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5000 + 100);
        const date = new Date(Date.now() - (id * 86400000)).toISOString().slice(0, 10);
        return {
          id,
          date,
          description: descriptions[Math.floor(Math.random() * descriptions.length)],
          amount: Math.round(amount * 100) / 100,
        };
      });
      setTransactions(prev => [...prev, ...items]);
      setHasMore(page < 5); // 5 pages max
      setLoading(false);
    }, 700);
  }

  async function fetchTransactions(page: number) {
    if (loading || !hasMore) return;
    setLoading(true);
    const response = await fetch(
      `/api/transactions?page=${page}&limit=10`
    );
    const data = await response.json();
    setTransactions(prev => [...prev, ...data.items]);
    setHasMore(data.items.length > 0);
    setLoading(false);
  }

  return { transactions, hasMore, loading, loadMore: () => setPage(p => p + 1) };
}
