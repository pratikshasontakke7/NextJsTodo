import { Box, Button, Input, Text, VStack, useToast } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "@/services/tasks"; // Assuming ADD_TODO_PAYLOAD type is imported from "@/services/tasks"
import { ADD_TODO_PAYLOAD } from "@/types/payload";

interface FormData extends ADD_TODO_PAYLOAD {}

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const TOAST = useToast();
  const queryClient = useQueryClient();
  {
    console.log({ isSubmitting });
  }

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const onSubmit = async (data: FormData) => {
    const todoPayload: ADD_TODO_PAYLOAD = {
      title: data.title,
      description: data.description,
    };

    await addTodoMutation.mutateAsync(todoPayload);
    reset();
    TOAST({
      title: "Todo created.",
      description: "Added todo",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Box w="100%" p={4} borderRadius="lg" boxShadow={"md"}>
      <VStack
        spacing={4}
        align="stretch"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text fontSize="lg" fontWeight="semibold">
          Title
        </Text>
        <Input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter todo title"
          size="md"
        />
        {errors.title && <Text color="red">{errors.title.message}</Text>}
        <Text fontSize="lg" fontWeight="semibold">
          Description
        </Text>
        <Input
          type="text"
          {...register("description", { required: "Description is required" })}
          placeholder="Enter todo description"
          size="md"
        />
        {errors.description && (
          <Text color="red">{errors.description.message}</Text>
        )}

        <Button
          colorScheme="teal"
          mt={4}
          type="submit"
          isLoading={isSubmitting}
        >
          Add Todo
        </Button>
      </VStack>
    </Box>
  );
};

export default TodoForm;
