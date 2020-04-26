import React, { useContext, useCallback } from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'wouter';
import { AppStoreContext } from '../../stores';

import './AppBar.less';

const AppBar: React.FC = observer(() => {
  const [_, setLocation] = useLocation();

  const setRoute = useCallback(
    (route: string) => () => {
      setLocation(route);
    },
    [setLocation]
  );

  return (
    <nav className="navigator">
      <div className="navigator-logo" onClick={setRoute('/')}></div>
      <div className="navigator-items">
        <div
          className="navigator-item active"
          onClick={setRoute('/graph-management')}
        >
          <span>图管理</span>
        </div>
      </div>
      <div className="navigator-additions">
        <span>FE-v1.4.0-beta.0</span>
      </div>
    </nav>
  );
});

export default AppBar;
