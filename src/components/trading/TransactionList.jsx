import { IconExternalLink } from '../ui/Icons'

export default function TransactionList({ transactions }) {
  return (
    <div className="tx-table-wrap">
      <table className="tx-table">
        <thead>
          <tr>
            <th className="tx-th">Date</th>
            <th className="tx-th">Type</th>
            <th className="tx-th">USD</th>
            <th className="tx-th">Amount</th>
            <th className="tx-th">Price</th>
            <th className="tx-th">Platform</th>
            <th className="tx-th">Maker</th>
            <th className="tx-th">Remaining USD</th>
            <th className="tx-th">Explorer</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i} className="tx-tr">
              <td className="tx-td tx-td--muted">{tx.date}</td>
              <td className="tx-td">
                <span className={`tx-type-badge ${tx.type}`}>
                  {tx.type === 'buy' ? 'BUY' : 'SELL'}
                </span>
              </td>
              <td className="tx-td tx-td--mono">{tx.usd}</td>
              <td className="tx-td tx-td--mono">{tx.amount}</td>
              <td className="tx-td tx-td--mono">{tx.price}</td>
              <td className="tx-td tx-td--muted">{tx.platform}</td>
              <td className="tx-td">
                <span className="tx-maker">{tx.maker}</span>
              </td>
              <td className="tx-td tx-td--mono">{tx.remainingUsd}</td>
              <td className="tx-td">
                <a
                  className="tx-explorer-link"
                  href={tx.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tx.explorerLabel}
                  <IconExternalLink size={10} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
