/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

const StickyNotesWidget = () => {
  const [authorsData, setAuthorsData] = useState([]);
  const [currentSort, setCurrentSort] = useState('author-asc');
  const [widgetSize, setWidgetSize] = useState('medium');
  const [isHovered, setIsHovered] = useState(null);

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
      case "small": return 260;
      case "medium": return 340;
      case "large": return 420;
      case "xlarge": return 500;
      case "huge": return 580;
      default: return 340;
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

  return (
    <div style={{
      background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Control Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: 'linear-gradient(145deg, #222222, #1a1a1a)',
        borderRadius: '14px',
        marginBottom: '20px',
        alignItems: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        width: `${getControlBarWidth()}px`,
        padding: '10px 20px',
        gap: '12px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Sort Controls */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <button 
            title="Sort A-Z" 
            onClick={() => setSort('author-asc')} 
            style={{
              background: currentSort === 'author-asc' 
                ? 'linear-gradient(145deg, #3a3a3a, #2a2a2a)' 
                : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: currentSort === 'author-asc' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
              ':hover': {
                background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
                transform: 'translateY(-1px)'
              }
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
              background: currentSort === 'author-desc' 
                ? 'linear-gradient(145deg, #3a3a3a, #2a2a2a)' 
                : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: currentSort === 'author-desc' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
              ':hover': {
                background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
                transform: 'translateY(-1px)'
              }
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
          
          <div style={{ 
            height: '24px', 
            width: '1px', 
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' 
          }}></div>
          
          <button 
            title="Sort Count Asc" 
            onClick={() => setSort('count-asc')} 
            style={{
              background: currentSort === 'count-asc' 
                ? 'linear-gradient(145deg, #3a3a3a, #2a2a2a)' 
                : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: currentSort === 'count-asc' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
              ':hover': {
                background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
                transform: 'translateY(-1px)'
              }
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
              background: currentSort === 'count-desc' 
                ? 'linear-gradient(145deg, #3a3a3a, #2a2a2a)' 
                : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: currentSort === 'count-desc' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
              ':hover': {
                background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
                transform: 'translateY(-1px)'
              }
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

        {/* Export and Size Controls */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <button 
            title="Export CSV" 
            onClick={exportToCSV} 
            style={{
              background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              ':hover': {
                background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }
            }}
          >
            <span>CSV</span>
          </button>
          
          <select 
            id="size-select" 
            title="Widget Size" 
            value={widgetSize}
            onChange={(e) => adjustSize(e.target.value)}
            style={{
              background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: '500',
              appearance: 'none',
              WebkitAppearance: 'none',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              ':hover': {
                background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }
            }}
          >
            <option value="small" style={{ background: '#2a2a2a' }}>Small</option>
            <option value="medium" style={{ background: '#2a2a2a' }}>Medium</option>
            <option value="large" style={{ background: '#2a2a2a' }}>Large</option>
            <option value="xlarge" style={{ background: '#2a2a2a' }}>XL</option>
            <option value="huge" style={{ background: '#2a2a2a' }}>XXL</option>
          </select>
        </div>
      </div>

      {/* Widget */}
      <div style={{
        background: 'linear-gradient(145deg, #222222, #1a1a1a)',
        color: 'white',
        borderRadius: '16px',
        padding: '28px',
        width: `${getWidgetWidth()}px`,
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
        ':before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #4f46e5, #a855f7, #ec4899)',
          zIndex: 1
        }
      }}>
        <h2 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '24px',
          fontWeight: '600',
          color: '#fff',
          position: 'relative',
          paddingBottom: '12px',
          ':after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #4f46e5, transparent)',
            borderRadius: '3px'
          }
        }}>How many Sticky Notes?</h2>
        
        <div style={{ 
          marginBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
            fontWeight: '500',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.85rem',
            padding: '0 4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <span>Authors</span>
            <span>Count</span>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {sortedData.map((item, index) => (
              <div 
                key={index} 
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  background: isHovered === index 
                    ? 'linear-gradient(90deg, rgba(79,70,229,0.1), transparent)' 
                    : 'transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  ':before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: isHovered === index ? '4px' : '0',
                    background: 'linear-gradient(to bottom, #4f46e5, #a855f7)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <span style={{ 
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#fff',
                  position: 'relative',
                  zIndex: 1
                }}>{item.name}</span>
                <span style={{ 
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.8)',
                  position: 'relative',
                  zIndex: 1
                }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '12px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <span style={{ 
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.7)'
          }}>Total</span>
          <span style={{ 
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#fff',
            background: 'linear-gradient(90deg, #4f46e5, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>{totalCount}</span>
        </div>
        
        <button 
          onClick={refreshData}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
            border: 'none',
            color: 'white',
            padding: '14px',
            fontSize: '0.95rem',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)',
              background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)'
            },
            ':after': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(transparent, rgba(255,255,255,0.1), transparent)',
              transform: 'rotate(30deg)',
              transition: 'all 0.3s ease'
            },
            ':hover:after': {
              left: '100%'
            }
          }}
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              transition: 'transform 0.5s ease'
            }}
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default StickyNotesWidget;