'use client'

import { useState, FormEventHandler } from 'react';
import { ITask } from "@/types/tasks"

import { Modal } from "./Modal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { editTodo, deleteTodo } from '../../../api';



export const Task = ({ task }: { task: ITask }) => {

    const router = useRouter();
    const handleSumbitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: newTextValue,
        })
        setNewTextValue('');
        setOpenModalEdit(false);
        router.refresh()

    }
    const [newTextValue, setNewTextValue] = useState(task.text)

    const [openModalEdit, setOpenModalEdit] = useState(false);



    return (
        
        <tr key={task.id}>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit id={`edit-icon-${task.id}`} title='Edit item' onClick={() => setOpenModalEdit(true)} cursor='pointer' size={25} />
                <Modal setModalOpen={setOpenModalEdit} modalOpen={openModalEdit} >
                    <form onSubmit={handleSumbitEditTodo}>
                        <h3 className='font-bold text-lg'>Edit your task</h3>
                        <div className="modal-action">
                            <input value={newTextValue} onChange={(e) => setNewTextValue(e.target.value)} type="text" placeholder="Your todo item" className="input" />
                            <button type='submit' className="btn">Submit</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 title='Delete item' onClick={() => { deleteTodo(task.id); router.refresh() }} className='text-red-500' cursor='pointer' size={25} />
            </td>
        </tr>
    )
}