import { ClientFormUI } from '../ui/ClientFormUI'
import { useAuthenticate } from '@/hooks/useAuthenticate'
import { Inputs } from '../ui/Inputs'
import { Buttons } from '../ui/Buttons'
import { ErrorMessage } from '../ui/ErrorMessage'

export const AuthenticateForm = () => {

    const { formData, handleChange, handleSubmit, errors } = useAuthenticate()

    const inputs = [
        { name: "username", placeholder: "Enter your username here", type: "text", value: formData.username },
        { name: "password", placeholder: "Enter your password here", type: "password", value: formData.password }
    ]

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-xl">
                <ClientFormUI title="Sign in">
                    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 w-full">
                        {inputs.map((field) => (
                            <div key={field.name} className="w-full">
                                <Inputs
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={field.value}
                                    onChange={handleChange}
                                    className={`w-full p-5 border rounded 
                                        ${errors[field.name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                                />
                                <ErrorMessage message={errors[field.name]} />
                            </div>
                        ))}
                        <Buttons type="submit" className="w-full p-5">
                            Sign In
                        </Buttons>
                    </form>
                </ClientFormUI>
            </div>
        </div>
    )
}