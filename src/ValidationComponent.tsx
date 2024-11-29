import React, { useEffect } from 'react';
import logo from './assets/logo.png'; // Import the logo image

interface ValidationComponentProps {
  error: string;
  linkLoginOnly: string;
  mac: string;
}

const ValidationComponent: React.FC<ValidationComponentProps> = ({ error, linkLoginOnly, mac }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const form = document.getElementById('sendin') as HTMLFormElement;
      if (form) {
        form.submit();
      }
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="page">
      <div className="head">
        <br />
        <figure id="logo">
          <img src={logo} height="150" width="150" alt="Logo" />
        </figure>
      </div>
      <div className="main">
        <section className="section">
          {error && (
            <div className="col s12">
              <div className="card-panel red lighten-2">
                <span className="white-text">{error}</span>
              </div>
            </div>
          )}
          <div className="container">
            <div id="margin_zero" className="content has-text-centered is-size-6">
              Please wait, you are being
            </div>
            <div id="margin_zero" className="content has-text-centered is-size-6">
              authorized on the network
            </div>
            <div id="margin_zero" className="content has-text-centered is-size-6">
              {linkLoginOnly}
            </div>
          </div>
        </section>
      </div>
      <form id="sendin" action={linkLoginOnly} method="post">
        <input type="hidden" name="username" value={mac} />
        <input type="hidden" name="password" />
        <input type="hidden" name="dst" value={linkLoginOnly} />
        <input type="hidden" name="popup" value="true" />
      </form>
    </div>
  );
};

export default ValidationComponent;