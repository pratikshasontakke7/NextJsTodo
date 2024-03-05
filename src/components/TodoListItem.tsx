import { deleteTodo, updateTodo } from "@/services/tasks";
import { TODO, UPDATED_TODO } from "@/types/tasks";
import {
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface TodoListItemProps {
  todo: TODO;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const [editedData, setEditedData] = useState<UPDATED_TODO>({
    title: todo.title,
    description: todo.description,
  });
  const TOAST = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: ({
      id,
      updatedTodo,
    }: {
      id: number;
      updatedTodo: UPDATED_TODO;
    }) => updateTodo(id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleUpdateTodo = async () => {
    updateTodoMutation.mutate({
      id: todo?.id,
      updatedTodo: editedData,
    });
    setIsEditing(false);
    TOAST({
      title: "Todo updated.",
      description: "Updated todo successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const { mutate: handleDelete } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      TOAST({
        title: "Todo deleted.",
        description: "Deleted todo successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });

  const truncatedLength =
    useBreakpointValue<number>({ base: 10, sm: 20 }) || 15;

  return (
    <Flex
      minHeight="60px"
      minWidth={{ base: "100%", sm: "600px" }}
      p={4}
      alignItems="center"
      justifyContent="space-between"
      border="1px"
      borderRadius="lg"
      borderColor="teal.100"
      mb={2}
      gap={4}
    >
      {isEditing ? (
        <Input
          value={editedData.title}
          onChange={(e) =>
            setEditedData({ ...editedData, title: e.target.value })
          }
        />
      ) : (
        <Text flex={1} fontWeight="bold" isTruncated noOfLines={1}>
          {todo.title.length > 20
            ? `${todo.title.substring(0, 10)}...`
            : todo.title}
        </Text>
      )}
      {isEditing ? (
        <Input
          value={editedData?.description}
          onChange={(e) =>
            setEditedData({ ...editedData, description: e.target.value })
          }
        />
      ) : (
        <Text flex={1}>
          {todo?.description?.length > truncatedLength
            ? `${todo.description.substring(0, truncatedLength)}...`
            : todo.description}
        </Text>
      )}
      <HStack spacing={2}>
        {isEditing ? (
          <>
            <IconButton
              colorScheme="teal"
              aria-label="Call Segun"
              isRound
              size="sm"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              }
              onClick={handleUpdateTodo}
            />
            <IconButton
              bg={"transparent"}
              aria-label="close"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#ce3636"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              }
              onClick={() => setIsEditing(false)}
            />
          </>
        ) : (
          <>
            <IconButton
              aria-label="Edit"
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1f1e1e"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              }
              boxSize={4}
              onClick={handleEdit}
            />
            <IconButton
              aria-label="Delete"
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1f1e1e"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              }
              boxSize={4}
              onClick={() => handleDelete(todo?.id)}
            />
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default TodoListItem;
