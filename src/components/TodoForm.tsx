import { addTodo } from "@/services/tasks";
import { Box, Button, Input, Text, Toast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = formData;

  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
  const handleAddTodo = async () => {
    await addTodoMutation.mutateAsync({ title, description });
    setFormData({
      title: "",
      description: "",
    });
    Toast({
      title: "Todo created.",
      description: "Added todo",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box w="100%" p={4} borderRadius="lg" boxShadow={"md"}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="semibold">
          Title
        </Text>
        <Input
          type="text"
          value={title}
          onChange={handleChange}
          name="title"
          placeholder="Enter todo title"
          size="md"
        />
        <Text fontSize="lg" fontWeight="semibold">
          Description
        </Text>
        <Input
          type="text"
          value={description}
          onChange={handleChange}
          name="description"
          placeholder="Enter todo description"
          size="md"
        />
        <Button colorScheme="teal" mt={4} onClick={handleAddTodo}>
          Add Todo
        </Button>
      </VStack>
    </Box>
  );
};

export default TodoForm;
