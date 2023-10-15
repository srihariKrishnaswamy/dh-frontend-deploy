import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const CompleteHeader = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ marginLeft: '240px', flexGrow: 1 }}>
            <Header />
            <div style={{ padding: '16px' }}>
              {children}
            </div>
          </div>
        </div>
      );
};

export default CompleteHeader;