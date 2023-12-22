import { useState } from 'react';
import { Modal } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useCreateNoteMutation } from '../context/redux/slices/NoteSlices';
import toast from 'react-hot-toast';
import { MdAddCircle } from 'react-icons/md';
const NoteModel = () => {
    const [createNote] = useCreateNoteMutation();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const initialValues = {
        title: '',
        description: '',
        date: '',
        time: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('title is required'),
        description: Yup.string().required('description is required'),
        date: Yup.date().required('date is required'),
        time: Yup.string().required('time is required')
    })
    const handleSubmit = async (values, { resetForm }) => {
        const { title, description, date, time } = values;
        createNote({ title: title, description: description, date: date, time: time })
            .then((res) => {
                const status = res.data.status;
                const message = res.data.message
                if (status) {
                    toast.success(message);
                    resetForm();
                } else {
                    toast.error(message);
                }
            }).catch((err) => {
                console.log(err);
            })


    }
    return (
        <div>
            <button className='w-full bg-[#004C42] text-white rounded px-3 py-2 shadow space-x-1' onClick={handleOpen}>
                <MdAddCircle className='inline' size={20} />
                <span>Note</span>
            </button>
            <Modal open={open} onClose={handleClose}>
                <div className="w-[100%] fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg w-[90%] md:w-[40%] lg:w-[30%]">
                        <Formik
                            enableReinitialize
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                            validationSchema={validationSchema}>
                            <Form className='space-y-3 w-full p-4'>
                                <div className='w-full grid grid-cols-1 gap-3'>
                                    <Field type="text" placeholder='Enter title' name='title' className='w-full p-3 rounded shadow outline-[#004C42]' />
                                    <ErrorMessage component="div" name='title' className='text-red-500' />
                                </div>
                                <div className='w-full grid grid-cols-1 gap-3'>
                                    <Field as="textarea" placeholder='Enter description' rows='4' name='description' className='w-full p-3 rounded shadow outline-[#004C42]' />
                                    <ErrorMessage component="div" name='description' className='text-red-500' />
                                </div>
                                <div className='w-full grid grid-cols-1 gap-3'>
                                    <Field type="date" name='date' className='w-full p-3 rounded shadow outline-[#004C42]' />
                                    <ErrorMessage component="div" name='date' className='text-red-500' />
                                </div>
                                <div className='w-full grid grid-cols-1 gap-3'>
                                    <Field type="text" name='time' placeholder='Enter time' className='w-full p-3 rounded shadow outline-[#004C42]' />
                                    <ErrorMessage component="div" name='time' className='text-red-500' />
                                </div>
                                <div className='w-full flex flex-row justify-start items-center gap-5'>
                                    <button className='px-3 py-2 border border-[#004C42] rounded text-[#004C42]' onClick={handleClose}>Close</button>
                                    <button className='px-3 py-2 bg-[#004C42] rounded text-white' type='submit'>Add Note</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default NoteModel