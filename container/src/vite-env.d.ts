/// <reference types="vite/client" />
import React from 'react';

declare module "savings/App" {
    const App: React.ComponentType<any>;
    export default App;
}

declare module "current/App" {
    const App: React.ComponentType<any>;
    export default App;
}
