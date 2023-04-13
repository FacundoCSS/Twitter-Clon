import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import {Toaster} from 'react-hot-toast'

import Home from './pages/Home'
import Auth from './pages/Auth'
import ImageUpload from './pages/ImageUpload'
import Profile from './pages/Profile';

import AuthProvider from './context/AuthContext';
import PostProvider from "./context/PostContext";
import UserProvider from './context/UserContext';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Tweet from './pages/Tweet';

function App() {
 

  return (
    <div className='h-full'>
      <div className='flex w-full min-h-screen'>
      <AuthProvider>
        <UserProvider>
          <PostProvider>
            <Routes>
              <Route path="/auth" element={<Auth/>}  />
              <Route 
                path='/' 
                element={
                  <PrivateRoute>
                    <Home/>
                  </PrivateRoute>
                }/>
              <Route 
              path="/auth/image" 
              element={
                  <PrivateRoute>
                    <ImageUpload/>
                  </PrivateRoute>
              } />
              <Route
              path="/user/:id"
              element={
                <PrivateRoute>
                  <Profile/>
                </PrivateRoute>
              }
              />
              <Route
              path="/:id/following"
              element={
                <PrivateRoute>
                  <Following/>
                </PrivateRoute>
              }/>
              <Route
              path="/:id/followers"
              element={
                <PrivateRoute>
                  <Followers/>
                </PrivateRoute>
              }/>
              <Route
              path="tweet/:tweet"
              element={
                <PrivateRoute>
                  <Tweet/>
                </PrivateRoute>
              }/>
            </Routes>
            <Toaster/>
          </PostProvider>
        </UserProvider>
      </AuthProvider>
      </div>
    </div>
  );
}

export default App;
