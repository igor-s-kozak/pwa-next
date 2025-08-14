import { act } from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, createEvent, screen } from '@testing-library/react'
import { Task } from "../../src/app/components/Task";
import { addTodo, getAllTodos } from '../../api';
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
    addTodo: jest.fn((task) => Promise.resolve().then(() => todos.push(task))),
    deleteTodo: jest.fn((id) => Promise.resolve().then(() => todos = todos.filter(todo => todo.id !== id))),
    editTodo: jest.fn(task => Promise.resolve().then(() => {
        todos = todos.map(todo => {
            if (todo.id === task.id) {
                return { ...todo, text: task.text }
            }
            return todo;
        })
    }))
})
);

describe('Task testing', () => {
    const TaskWrapped = () => (
        <table><tbody><Task task={{ id, text }} /></tbody></table>
    )
    it('Edit task input has default value of current todo', () => {
        render(<TaskWrapped />)
        const input = screen.getByPlaceholderText('Your todo item');
        const value = input.getAttribute('value');
        expect(value).toEqual(text)
    })

    it('Delete button delete task', async () => {
        await addTodo({ id, text })
        render(<TaskWrapped />)
        const deleteIconTitle = screen.getByText('Delete item');
        const deleteIconSVGElement = deleteIconTitle.parentNode;
        const mouseEvent = createEvent.click(deleteIconSVGElement!)
        await fireEvent(deleteIconSVGElement!, mouseEvent);
        const res = await getAllTodos();
        expect(res).not.toContainEqual({ id, text })
    })

    it('Edit button click open modal', () => {
        render(<TaskWrapped />)
        const editIconTitle = screen.getByText('Edit item');
        const editIconSVGElement = editIconTitle.parentNode;
        const mouseEvent = createEvent.click(editIconSVGElement!);
        fireEvent(editIconSVGElement!, mouseEvent);
        const dialogEl = document.querySelector('dialog');
        expect(dialogEl?.classList).toContain('modal-open');
    })

    it('Editing task', async () => {
        await addTodo({ id, text })
        render(<TaskWrapped />)
        await act(() => {
            const submitButton = screen.getByText('Submit');
            const input = screen.getByPlaceholderText('Your todo item');
            const mouseEvent = createEvent.click(submitButton);
            fireEvent.change(input, { target: { value: 'New value' } })
            fireEvent(submitButton, mouseEvent);
        })
        const res = await getAllTodos();
        expect(res[0].text).toBe('New value');
    })

})


