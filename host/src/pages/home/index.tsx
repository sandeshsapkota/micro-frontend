import React, { Suspense } from 'react';

const RemoteTodo = () => {
    const TodoApp = React.lazy(() => import('remote_app/TodoApp'));

    return (
        <div>
            <Suspense fallback={<div>Loading Todo App...</div>}>
                <TodoApp title={"Todo App - from HOST app"}/>
            </Suspense>
        </div>
    );
};

export default RemoteTodo;