
import { useEffect, useRef } from "react";
import './TransactionDetails.css';
import { useInfiniteTransactions } from "./useInfiniteTransaction";
const TransactionDetails = () => {

  // Mock data for demonstration
  const mockDescriptions = [
    'ATM Withdrawal',
    'Salary Credit',
    'Online Shopping',
    'Interest Credit',
    'Utility Bill',
    'Grocery Store',
    'Mobile Recharge',
    'Dining',
    'Movie Ticket',
    'Insurance Premium',
  ];

  // Use the custom hook for infinite scroll, but override with mock data
  const { transactions, loadMore, hasMore, loading } = useInfiniteTransactions({
    mock: true,
    mockDescriptions,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="transaction-details-container">
      <h4 className="transaction-details-title">Recent Transactions</h4>
      <div className="transaction-table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn: any) => (
              <tr key={txn.id}>
                <td>{txn.date}</td>
                <td className="transaction-description">
                  {txn.amount < 0 ? (
                    <span className="txn-icon debit" title="Debit">&#8595;</span>
                  ) : (
                    <span className="txn-icon credit" title="Credit">&#8593;</span>
                  )}
                  {txn.description}
                </td>
                <td className={txn.amount < 0 ? 'transaction-amount-debit' : 'transaction-amount-credit'}>
                  {txn.amount < 0 ? '-' : '+'}₹{Math.abs(txn.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p className="transaction-loading">Loading...</p>}
      {!hasMore && <p className="transaction-nomore">No more transactions.</p>}
      {/* Trigger point */}
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
}


export default TransactionDetails