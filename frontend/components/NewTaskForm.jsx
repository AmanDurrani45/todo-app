'use client'
import { useState } from "react"
import PlusIcon from '../assets/icons/PlusIcon'
import TaskList from "./TaskList";
import axios from 'axios'
import { ColorRing } from "react-loader-spinner";

export function NewTaskForm() {
    const [newItem, setNewItem] = useState("");
    const [postLoading, setPostLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    const getTasks = () => {
        // Use Axios to make a GET request to fetch todos from your API
        setIsLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`)
            .then(response => {
                // Filter todos to include only those of the same day
                const today = new Date();
                const filteredTasks = response.data.filter(task => {
                    const taskDate = new Date(task.createdAt);
                    return (
                        taskDate.getFullYear() === today.getFullYear() &&
                        taskDate.getMonth() === today.getMonth() &&
                        taskDate.getDate() === today.getDate()
                    );
                });
                // Set the filtered todos in the component's state
                setTasks(filteredTasks);
            })
            .catch(error => {
                console.error('Error fetching your tasks:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        if (newItem === "") {
            alert('Invalid Input');
            return;
        }

        const data = {
            name: newItem,
            isCompleted: false
        };

        try {
            setPostLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, data);
            setNewItem("");
            getTasks();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the task. Please try again later.');
        } finally {
            setPostLoading(false);
        }
    }

    return (
        <section className="w-72 ">
            <form onSubmit={handleSubmit}>
                <div className="h-10 w-full relative">
                    <input
                        className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-white text-gray-700 px-3 pt-3 pb-3.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:outline-0 disabled:border-0 pl-2 shadow-lg"
                        placeholder="Add New Task"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-[6px] top-[6px] w-7 h-7 bg-[#cdb78e] rounded-md flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {postLoading ? (
                            <ColorRing
                                visible={true}
                                height={80}
                                width={80}
                                ariaLabel="Loading..."
                                colors={['#7c6f5a']}
                            />
                        ) : (
                            <span className="w-6 h-6">
                                <PlusIcon />
                            </span>
                        )}
                    </button>
                </div>
            </form>
            <TaskList tasks={tasks} getTasks={getTasks} isLoading={isLoading} />
        </section>
    )
}
