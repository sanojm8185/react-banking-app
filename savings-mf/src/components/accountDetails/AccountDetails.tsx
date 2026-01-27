
const mockAccount = {
  name: 'John Doe',
  accountNumber: '1234567890',
  ifsc: 'BANK0001234',
  branch: 'Main Branch, Mumbai',
  balance: 78500.75,
  type: 'Savings',
  opened: '2018-06-15',
};

const AccountDetails = () => {
  return (
    <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px #0001', marginBottom: 24 }}>
      <h3 style={{ color: '#2d3748', marginBottom: 8 }}>{mockAccount.type} Account</h3>
      <p><strong>Name:</strong> {mockAccount.name}</p>
      <p><strong>Account No:</strong> {mockAccount.accountNumber}</p>
      <p><strong>IFSC:</strong> {mockAccount.ifsc}</p>
      <p><strong>Branch:</strong> {mockAccount.branch}</p>
      <p><strong>Opened:</strong> {mockAccount.opened}</p>
      <p style={{ fontSize: 18, color: '#38a169', fontWeight: 700 }}><strong>Balance:</strong> ₹{mockAccount.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
    </div>
  );
}
export default AccountDetails