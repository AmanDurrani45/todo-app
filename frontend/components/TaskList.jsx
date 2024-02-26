import React, { useState } from 'react';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import ListIcon from '@/assets/icons/ListIcon';
import TaskItems from './ TaskItems';

const TaskList = ({ tasks, getTasks, isLoading }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-[19.7%] min-w-[289px] mt-5">
            <button
                onClick={toggleDropdown}
                className="text-white bg-[#a18c66] hover:bg-[#615336] relative focus:outline-none font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center w-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                type="button"
            >
                <ListIcon />
                Your Scheduled Todos/Tasks
                <span className='w-6 h-6 absolute left-[88%]'>
                    <ChevronIcon />
                </span>
            </button>

            {isDropdownOpen && (
                <TaskItems tasks={tasks} getTasks={getTasks} isLoading={isLoading} />
            )}
        </div>
    );
};

export default TaskList;
