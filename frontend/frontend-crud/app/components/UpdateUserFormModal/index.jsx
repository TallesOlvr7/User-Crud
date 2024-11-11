import { useForm } from "react-hook-form"

export default function UpdateUserForm({ user, status, closeModal, method, action }) {
    const [open, setOpen] = useState(status)
    const [register, handleSubmit] = useForm()
    return (
        <Dialog open={open} onClose={() => {
            setOpen
            closeModal()
        }} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex-col justify-center sm:flex sm:items-start w-full">
                                <div className='w-full flex justify-center items-center flex-col'>
                                    <div className=" mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <UserCircleIcon />
                                    </div>

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Informações do usuário
                                        </DialogTitle>
                                        <div className="mt-2 flex flex-col w-full text-center">
                                            <form className="flex flex-col justify-start g-3" action="">
                                                <div className="flex flex-col g-1">
                                                    <label htmlFor="nome">Nome</label>
                                                    <input type="text"id="nome" {...register('nome', {
                                                        required:true,
                                                        maxLength:255
                                                    })} />
                                                </div>
                                                <div className="flex flex-col g-1">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email"id="nome" {...register('email', {
                                                        required:true,
                                                        maxLength:255
                                                    })} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}