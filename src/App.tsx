import { useState, useEffect } from 'react';
import './App.css';
import IndexList from './IndexList';
import ValidationComponent from './ValidationComponent';

const PARTNER_ID = '7'; // Replace with your actual partner ID

function App() {
  const [packages, setPackages] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [appData, setAppData] = useState({
    mac: '',
    ip: '',
    link_login: '',
    link_login_only: '',
    error: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mac = params.get('mac');
    const ip = params.get('ip');
    const link_login = params.get('link-login');
    const link_login_only = params.get('link-login-only');
    const error = params.get('error');

    if (mac && ip && link_login && link_login_only) {
      setAppData({ mac, ip, link_login, link_login_only, error: error || '' });
    } else {
      setError('You are not in the hotspot network at the moment!');
    }
  }, []);

  useEffect(() => {
    if (appData.mac) {
      console.info('Mac Address fetching validation status:', appData.mac);

      fetch(`/api/user/${appData.mac}`)
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            setIsValidating(true);
          } else {
            setError(data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching validation status:', error);
        });
    }
  }, [appData.mac]);

  useEffect(() => {
    if (!isValidating && appData.mac) {
      fetch('/api/user/packages/7')
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            setPackages(data.data);
          }
        })
        .catch(error => console.error('Error fetching packages:', error));
    }
  }, [isValidating, appData.mac]);

  const handleSubscribe = (phone: string, packageId: number) => {
    const api_url = `/api/user/subscribe`;
    const data = {
      phone_number: phone,
      package_id: packageId,
      mac_address: appData.mac,
      partner_id: PARTNER_ID,
    };
    const headers = { 'Content-Type': 'application/json' };

    fetch(api_url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(`subscribe response: ${data}`);
        if (data.status) {
          setIsValidating(true);
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('Error subscribing:', error);
        setError('Subscription failed. Please try again.');
      });
  };

  if (error) {
    return (
      <div className="error-page">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (isValidating) {
    return <ValidationComponent error={error} linkLoginOnly={appData.link_login_only} mac={appData.mac} />;
  }

  return (
    <div className="App">
      <IndexList businessName="Kredoh WIFI" packages={packages} appData={appData} onSubscribe={handleSubscribe} />
    </div>
  );
}

export default App;