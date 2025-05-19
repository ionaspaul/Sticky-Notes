/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

const StickyNotesWidget = () => {
  const [authorsData, setAuthorsData] = useState([]);
  const [currentSort, setCurrentSort] = useState('author-asc');
  const [widgetSize, setWidgetSize] = useState('medium');

  const names = [
    "Yury Zeliankouski",
    "No author name",
    "Jane Doe",
  ];

  const generateRandomData = () => {
    return names.map(name => ({
      name,
      count: Math.floor(Math.random() * 20) + 1
    }));
  };

  const refreshData = () => {
    const newData = generateRandomData();
    setAuthorsData(newData);
  };

  const setSort = (type) => {
    setCurrentSort(type);
  };

  const applySorting = () => {
    let sortedData = [...authorsData];
    switch (currentSort) {
      case "author-asc":
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "author-desc":
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "count-asc":
        sortedData.sort((a, b) => a.count - b.count);
        break;
      case "count-desc":
        sortedData.sort((a, b) => b.count - a.count);
        break;
      default:
        break;
    }
    return sortedData;
  };

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Author,Count\n";
    authorsData.forEach(item => {
      csvContent += `${item.name},${item.count}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sticky_notes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const adjustSize = (size) => {
    setWidgetSize(size);
  };

  const getWidgetWidth = () => {
    switch (widgetSize) {
      case "small": return 220;
      case "medium": return 320;
      case "large": return 400;
      case "xlarge": return 480;
      case "huge": return 560;
      default: return 320;
    }
  };

  const getControlBarWidth = () => {
    return getWidgetWidth() + 40;
  };

  useEffect(() => {
    refreshData();
  }, []);

  const sortedData = applySorting();
  const totalCount = sortedData.reduce((sum, item) => sum + item.count, 0);

  const selectStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '4px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    width: '90%',
    height: '100%',
    textAlign: 'center',
    appearance: 'none',
    WebkitAppearance: 'none',
    textAlignLast: 'center',
    borderRadius: '8px',
  };

  return (
      <div className="responsive-scale-wrapper">

    <div style={{
      backgroundColor: '#0f0f0f',
      fontFamily: "'Segoe UI', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <div className="control-bar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        marginBottom: '10px',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        width: `${getControlBarWidth()}px`,
        overflowX: 'auto',
        padding: '8px 0'
      }}>
        {/* Combined author sort buttons */}
        <div style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
           gap: widgetSize === 'small' ? '4px' : 
       widgetSize === 'medium' ? '6px' :
       widgetSize === 'large' ? '8px' :
       widgetSize === 'xlarge' ? '10px' : '12px'
        }}>
          <button 
            title="Sort A-Z" 
            onClick={() => setSort('author-asc')} 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
<div style={{ display: 'flex', alignItems: 'center', margin: '0 6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="18 11 12 5 6 11" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1', gap: "3px"}}>
                <span style={{ fontSize: '0.6rem', color: 'white' }}>A</span>
                <span style={{ fontSize: '0.6rem', color: 'white' }}>Z</span>
              </div>
            </div>
          </button>
          
          <button 
            title="Sort Z-A" 
            onClick={() => setSort('author-desc')} 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
<div style={{ display: 'flex', alignItems: 'center', margin: '0 6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="6 13 12 19 18 13" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1', gap: "3px"}}>
                <span style={{ fontSize: '0.6rem', color: 'white' }}>Z</span>
                <span style={{ fontSize: '0.6rem', color: 'white' }}>A</span>
              </div>
            </div>
          </button>
        </div>

        {/* Combined count sort buttons */}
        <div style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderLeft: '1px solid #444',
          gap: widgetSize === 'small' ? '4px' : 
       widgetSize === 'medium' ? '6px' :
       widgetSize === 'large' ? '8px' :
       widgetSize === 'xlarge' ? '10px' : '12px'
        }}>
          <button 
            title="Sort Count Asc" 
            onClick={() => setSort('count-asc')} 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="17" x2="6" y2="7" />
              <polyline points="3 10 6 7 9 10" />
              <line x1="18" y1="12" x2="14" y2="12" />
              <line x1="16" y1="8"  x2="14" y2="8"  />
              <line x1="20" y1="16" x2="14" y2="16" />
            </svg>
          </button>
          
          <button 
            title="Sort Count Desc" 
            onClick={() => setSort('count-desc')} 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="7" x2="6" y2="17" />
              <polyline points="3 14 6 17 9 14" />
              <line x1="20" y1="8"  x2="14" y2="8"  />
              <line x1="18" y1="12" x2="14" y2="12" />
              <line x1="16" y1="16" x2="14" y2="16" />
            </svg>
          </button>
        </div>

        {/* Export CSV button */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderLeft: '1px solid #444',
          height: '100%'
        }}>
          <button 
            title="Export CSV" 
            onClick={exportToCSV} 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              textAlign: 'center'
            }}
          >
            <div style={{
              padding: '6px 8px',
              backgroundColor: 'transparent',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: 'white',
              border: '1px solid #444',
              letterSpacing: '0.5px'
            }}>
              CSV
            </div>
          </button>
        </div>

        {/* Size selector */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderLeft: '1px solid #444',
          height: '100%',
          position: 'relative'
        }}>
          <select 
            id="size-select" 
            title="Widget Size" 
            value={widgetSize}
            onChange={(e) => adjustSize(e.target.value)}
            style={selectStyle}
          >
            <option value="small" style={{ backgroundColor: '#1e1e1e' }}>Small</option>
            <option value="medium" style={{ backgroundColor: '#1e1e1e' }}>Medium</option>
            <option value="large" style={{ backgroundColor: '#1e1e1e' }}>Large</option>
            <option value="xlarge" style={{ backgroundColor: '#1e1e1e' }}>Extra Large</option>
            <option value="huge" style={{ backgroundColor: '#1e1e1e' }}>Huge</option>
          </select>
        </div>
      </div>

      <div className="widget" style={{
        backgroundColor: '#1e1e1e',
        color: 'white',
        borderRadius: '16px',
        padding: '24px',
        width: `${getWidgetWidth()}px`,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        transition: 'width 0.3s ease'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>How many Sticky Notes?</h2>
        <table className="list" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Authors</th>
              <th style={{ textAlign: 'right' }}>Count</th>
            </tr>
          </thead>
          <tbody id="notes-list">
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '6px 0', textAlign: 'left', fontSize: '0.95rem' }}>{item.name}</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontSize: '0.95rem' }}>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="separator" style={{ borderTop: '1px solid #444', margin: '12px 0' }}></div>
        <div className="total" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total: {totalCount}</div>
        <button 
          className="refresh-btn" 
          onClick={refreshData}
          style={{
            marginTop: '16px',
            width: '100%',
            backgroundColor: '#a259ff',
            border: 'none',
            color: 'white',
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          &#x21bb; Refresh
        </button>
      </div>
    </div>
    </div>
  );
};

export default StickyNotesWidget;