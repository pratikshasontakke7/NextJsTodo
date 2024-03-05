import { useMutation } from "react-query";
import { supabase } from "../../supabase";
import { ADD_TODO_PAYLOAD } from "@/types/payload";

export const fetchTodos = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });;
    if (error) throw error;
    return data;
  } catch (error:any) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
};

export const addTodo = 
async (props:ADD_TODO_PAYLOAD) => {
  const { title, description } = props
  if (!title || !description) return null;

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description }])

    if (error) {
      throw error;
    }
    return data ? data[0] : null;
  } catch (error) {
    return null;
  }
}


export const deleteTodo = async (todoId:number) => {
  try {
    const { error } = await supabase.from('tasks').delete().eq('id', todoId);
    if (error) {
      throw error;
    }
    return true;
  } catch (error:any) {
    console.error("Error deleting todo:", error.message);
    return false;
  }
};


export const updateTodo = async (todoId:number, updatedData:any) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        title: updatedData.title,
        description: updatedData.description
      })
      .eq('id', todoId);
    if (error) {
      throw error;
    }
    return data ? data[0] : null;
  } catch (error:any) {
    console.error("Error updating todo:", error.message);
    return null;
  }
};

