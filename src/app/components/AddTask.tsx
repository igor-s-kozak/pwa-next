'use client'

import { FormEventHandler, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {Modal} from './Modal'
import { addTodo } from "../../../api";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from 'uuid'


export const AddTask = () => {
    const router = useRouter();
    const [newTextValue, setNewTextValue] = useState<string>('')
    const handleSumbitNewTodo:FormEventHandler<HTMLFormElement> =  async(e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTextValue,
        })
        setNewTextValue('');
        setModalOpen(false);
        router.refresh();

    }
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <div>
            <button onClick = {() => setModalOpen(true)} className="btn btn-primary w-full">Add new task <FaPlus className="ml-2" size={18} /></button>
            <Modal setModalOpen = {setModalOpen} modalOpen={modalOpen} >
              <form onSubmit={handleSumbitNewTodo}>
                <h3 className='font-bold text-lg'>Add new task</h3>
                <div className="modal-action">
                <input value = {newTextValue} onChange = {(e) => setNewTextValue(e.target.value)}type="text" placeholder="Your todo item" className="input input" />
                <button type='submit' className="btn">Submit</button>
                </div>
              </form>
            </Modal>
        </div>
    )
}