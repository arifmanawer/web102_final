import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PostPage from './components/PostPage';
import CreatePost from './components/CreatePost';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;