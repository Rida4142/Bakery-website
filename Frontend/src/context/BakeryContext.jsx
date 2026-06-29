import { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const BakeryContext = createContext();

export const BakeryProvider = ({ children }) => {
  const [bakery, setBakery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/settings')
      .then(res => {
        const data = res.data;
        setBakery(data);
        if (data?.theme) {
          const root = document.documentElement;
          if (data.theme.primaryColor) {
            root.style.setProperty('--brand-primary', data.theme.primaryColor);
          }
          if (data.theme.secondaryColor) {
            root.style.setProperty('--brand-secondary', data.theme.secondaryColor);
          }
          if (data.theme.accentColor) {
            root.style.setProperty('--brand-accent', data.theme.accentColor);
          }
          if (data.theme.fontFamily) {
            root.style.setProperty('--brand-font', data.theme.fontFamily);
          }
        }
        if (data?.bakeryName) {
          document.title = data.bakeryName;
        }
      })
      .catch(err => {
        setError(err.message || 'Failed to load bakery settings');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center p-8">
          <p className="text-red-600 text-lg mb-4">Error loading bakery: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <BakeryContext.Provider value={{ bakery }}>
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};

export default BakeryContext;