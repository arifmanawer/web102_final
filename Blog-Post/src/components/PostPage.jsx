import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { supabase } from '../client';
import { Box, Heading, Text, Button, VStack, Center, HStack, Input } from "@chakra-ui/react";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0); // Initialize with 0
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Track editing state
  const [newTitle, setNewTitle] = useState(''); // Store updated title
  const [newContent, setNewContent] = useState(''); // Store updated content

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
      if (error) {
        throw error;
      }
      setPost(data);
      setUpvotes(data.upvotes); // Set upvotes to the value from the database
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error.message);
    }
  };

  const handleUpvote = async () => {
    try {
      // Increment the upvotes count in the database
      const { error } = await supabase
        .from('posts')
        .update({ upvotes: upvotes + 1 })
        .eq('id', postId);

      if (error) {
        throw error;
      }

      // Update the local state
      setUpvotes(upvotes + 1);
    } catch (error) {
      console.error('Error upvoting post:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) {
        throw error;
      }

      window.location.href = '/'; // Redirect to the home page after deletion
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Update the post with the new title and content
      const { error } = await supabase
        .from('posts')
        .update({ title: newTitle, content: newContent })
        .eq('id', postId);

      if (error) {
        throw error;
      }

      // Reset the editing state and reload the post
      setEditing(false);
      fetchPost();
    } catch (error) {
      console.error('Error editing post:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Center>
      <VStack spacing={5}>
        {editing ? ( // Show input fields for editing if editing mode is enabled
          <>
            <Input marginTop={5} placeholder="New title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <Input placeholder="New content" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
            <Button colorScheme="teal" onClick={handleEdit} _hover={{ cursor: 'pointer' }}>Save</Button>
          </>
        ) : (
          <>
            <Heading as='h2' size='xl' style={{ paddingTop: "15px" }}>{post.title}</Heading>
            <Text>{post.content}</Text>
            <Text>Upvotes: {upvotes}</Text>
            <HStack>
              <Button colorScheme="teal" onClick={handleUpvote} _hover={{ cursor: 'pointer' }}>Upvote</Button>
              <Button colorScheme="red" onClick={handleDelete} _hover={{ cursor: 'pointer' }}>Delete</Button>
              <Button colorScheme="blue" onClick={() => setEditing(true)} _hover={{ cursor: 'pointer' }}>Edit</Button>
              <Button as={RouterLink} to='/' colorScheme="blue" _hover={{ cursor: 'pointer' }}>Home</Button>
            </HStack>
          </>
        )}
      </VStack>
    </Center>
  );
}

export default PostPage;
