
//  import './index.css';

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
// import AdminProvider from './contexts/AdminContext.jsx';
// import UserProvider from './contexts/UserContext.jsx';
// import { registerSW } from 'virtual:pwa-register';
// import './index.css';
// import 'react-toastify/dist/ReactToastify.css';

// registerSW();

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AdminProvider>
//         <UserProvider>
//           <App />
//         </UserProvider>
//       </AdminProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AdminProvider from './contexts/AdminContext.jsx';
import UserProvider from './contexts/UserContext.jsx';
import { registerSW } from 'virtual:pwa-register';
import { GoogleOAuthProvider } from '@react-oauth/google'; // ✅ ADD THIS
import 'react-toastify/dist/ReactToastify.css';

registerSW();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="280349889544-09nhi756g1kf0mgc1oggc8e2sv0gkoif.apps.googleusercontent.com">
      <BrowserRouter>
        <AdminProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AdminProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);

