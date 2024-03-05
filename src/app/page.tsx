"use client";
import { Box, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchTodos } from "@/services/tasks";
import TodoForm from "@/components/TodoForm";
import TodoListItem from "@/components/TodoListItem";

export default function Home() {
  const { data: todos, isLoading } = useQuery("tasks", fetchTodos);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="100%" align="center" p={4}>
      <Heading as="h1" size="xl" my={8}>
        Todo App
      </Heading>
      <Box w={{ base: "90%", md: "50%", lg: "30%" }} mx="auto">
        <VStack spacing={5}>
          <TodoForm />
          <VStack h={"50vh"} overflowY={"scroll"}>
            {todos?.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}{" "}
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
}
