import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { supabase } from '../client';
import { Box, Heading, Link, Text, SimpleGrid, VStack, HStack, Center, Button, Select } from "@chakra-ui/react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('newest');

  useEffect(() => {
    fetchPosts();
  }, [sortType]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortType === 'newest' ? 'created_at' : 'upvotes', { ascending: false });
      if (error) {
        throw error;
      }
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  return (
    <VStack padding={5}>
      <Center>
        <Heading as='h2' size='2xl'>Blogger</Heading>
      </Center>
      <Center>
        <Heading as='h4' size='md'>
          <Button margin={5} colorScheme="blue" _hover={{ cursor: 'pointer' }}><Link as={RouterLink} to="/create">Create Post</Link></Button>
        </Heading>
      </Center>
      <Select maxWidth={200}placeholder="Sort by" onChange={e => setSortType(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="most_upvoted">Most Upvoted</option>
      </Select>
      <SimpleGrid columns={1} spacing={10}>
        {posts.map(post => (
          <Box key={post.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p="6">
              <Link as={RouterLink} to={`/post/${post.id}`}>
                <Heading as='h4' size='md'>{post.title}</Heading>
              </Link>
              <Text mt={4}>{post.content}</Text>
              <HStack mt={4} spacing={4}>
                <Text>Created at: {new Date(post.created_at).toLocaleString()}</Text>
                <Text>Upvotes: {post.upvotes}</Text>
              </HStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default Home;