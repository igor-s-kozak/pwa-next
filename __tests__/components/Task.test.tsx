import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Task } from "../../src/app/components/Task";
import { addTodo, deleteTodo, getAllTodos } from '../../api';
import { v4 as uuidv4 } from 'uuid'
import { ITask } from '@/types/tasks';

const id = uuidv4();
const text = 'Some testing text';
let todos: ITask[] = []

jest.mock("next/navigation", () => (
    {
        useRouter: () => ({
            push: jest.fn(),
            replace: jest.fn(),
            refresh: jest.fn(),
        }),

    }));

jest.mock('../../api', () => ({
    getAllTodos: jest.fn(() => Promise.resolve(todos)),
    addTodo: jest.fn((task) => todos.push(task)),
    deleteTodo: jest.fn((id) => { todos = todos.filter(todo => todo.id !== id) })
})
);



describe('Task testing', () => {
    it('Edit task input has default value of current todo', () => {
        render(<table><tbody><Task task={{ id, text }} /></tbody></table>)
        const input = screen.getByPlaceholderText('Your todo item');
        const value = input.getAttribute('value');
        expect(value).toEqual(text)
    })

    // it('Delete button works', async () => {
    //     await addTodo({ id, text })

    //     render(<Task task={{ id, text }} />)
    //     const deleteIcon = screen.getByText('Delete item');
    //     const mouseEvent = new MouseEvent('click')
    //     fireEvent(deleteIcon, mouseEvent);
    //     const res = await getAllTodos()
    //     console.log(res)
    //     expect(res).not.toContainEqual({ id, text })
    // })

    it('Delete button works', async () => {
        await addTodo({ id, text })
        // await addTodo({id: id2, text})

        render(<table><tbody><Task task={{ id, text }} /></tbody></table>)
        const deleteIconTitle = screen.getByText('Delete item');
        // deleteIcon.onclick = async () => {await deleteTodo(id); console.log('hello')};
        const deleteIconSVGElement = deleteIconTitle.parentNode

        const mouseEvent = new MouseEvent('click')

        // deleteIcon.addEventListener('click', () => {deleteTodo(id); console.log('hi')})

        // Array.from(deleteIcon.children).forEach(child => console.log(child.onClick))

        fireEvent(deleteIconSVGElement!, mouseEvent);
        const res = await getAllTodos();

        expect(res.length).toEqual(0);
        // .toContainEqual({ id, text })
    })




})


