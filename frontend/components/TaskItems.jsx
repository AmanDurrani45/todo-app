import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { Circles } from 'react-loader-spinner';

const TaskItems = ({ tasks, getTasks, isLoading }) => {


  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section className='mt-3 w-full text-black rounded-[7px]' style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
      {isLoading ? (
        <div className='w-full h-32 text-gray-500 flex items-center justify-center'>
          <Circles
            height="80"
            width="80"
            color="#615336"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : tasks.length === 0 ? (
        <div className='w-full h-32 text-gray-500 flex items-center justify-center'>
          No Task/Todo Today
        </div>
      ) : (
        tasks.map(task => (
          <TaskItem key={task._id} task={task} getTasks={getTasks} />
        ))
      )}
    </section>
  );
};

export default TaskItems;
