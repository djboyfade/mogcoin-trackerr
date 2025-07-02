import { useState, useEffect } from 'react';

export default function MogcoinTracker() {
  const [startingCapital, setStartingCapital] = useState(1000);
  const [growthRate, setGrowthRate] = useState(20);
  const [weeks, setWeeks] = useState(4);
  const [results, setResults] = useState([]);
  const [price, setPrice] = useState(null);
  const [threshold, setThreshold] = useState(0.00000090);
  const [alert, setAlert] = useState("");

  // Simulated price tracking (update every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = (Math.random() * (0.0000012 - 0.00000085) + 0.00000085).toFixed(10);
      setPrice(newPrice);
      if (parseFloat(newPrice) < threshold) {
        setAlert(`🚨 MOG price dropped below threshold! Current: $${newPrice}`);
      } else {
        setAlert("");
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [threshold]);

  const calculateGrowth = () => {
    let capital = parseFloat(startingCapital);
    let rate = parseFloat(growthRate) / 100;
    let data = [];

    for (let week = 1; week <= weeks; week++) {
      capital = capital * (1 + rate);
      data.push({
        week,
        value: capital.toFixed(2),
        profit: (capital - startingCapital).toFixed(2)
      });
    }

    setResults(data);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Mogcoin Weekly Growth Tracker</h2>
      <input
        type='number'
        value={startingCapital}
        onChange={e => setStartingCapital(e.target.value)}
        placeholder='Starting Capital ($)'
      />
      <input
        type='number'
        value={growthRate}
        onChange={e => setGrowthRate(e.target.value)}
        placeholder='Weekly Growth Rate (%)'
      />
      <input
        type='number'
        value={weeks}
        onChange={e => setWeeks(e.target.value)}
        placeholder='Number of Weeks'
      />
      <button onClick={calculateGrowth}>Calculate</button>

      {results.length > 0 && (
        <div>
          <h3>Results</h3>
          {results.map(r => (
            <div key={r.week}>
              Week {r.week}: Value: ${r.value} | Profit: ${r.profit}
            </div>
          ))}
        </div>
      )}

      <h2>Mogcoin Price Watcher</h2>
      <input
        type='number'
        value={threshold}
        onChange={e => setThreshold(e.target.value)}
        placeholder='Alert Threshold ($)'
      />
      <div>📉 Current Price: {price ? `$${price}` : 'Loading...'}</div>
      {alert && <div style={{ color: 'red', fontWeight: 'bold' }}>{alert}</div>}
    </div>
  );
}
