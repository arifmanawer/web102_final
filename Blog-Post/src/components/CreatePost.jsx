import React, { useState } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Center, Input, Textarea } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { supabase } from '../client';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('posts').insert({ title, content });
      if (error) {
        throw error;
      }
      // Navigate back to the home page after creating the post
      window.location.href = '/'; // or use <Link to="/"> component
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <Center>
      <VStack spacing={5}>
        <Heading paddingTop={5} as='h1' size='xl'>Create Post</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5} align="start">
            <Box>
              <Text mb={2}>Title:</Text>
              <Input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </Box>
            <Box>
              <Text mb={2}>Content:</Text>
              <Textarea value={content} onChange={e => setContent(e.target.value)} required />
            </Box>
          </VStack>
          <Center><Button marginTop={5} type="submit" colorScheme="teal" _hover={{ cursor: 'pointer' }}>Submit</Button></Center>
        </form>
        <Button as={RouterLink} to='/' colorScheme="blue" _hover={{ cursor: 'pointer' }}>Back to Home</Button>
      </VStack>
    </Center>
  );
}

export default CreatePost;
