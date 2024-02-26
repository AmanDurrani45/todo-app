import Image from 'next/image'
import profileImage from '../assets/images/profile.jpg'
import { NewTaskForm } from './NewTaskForm'

const UserImage = () => {
    return (
        <section className="w-full h-full flex flex-col items-center text-white backdrop-brightness-50 pb-[23rem]">
            <div className="w-24 h-24 mt-28 mb-12 rounded-full border-2 border-gray-100 shadow-sm overflow-hidden">
                <Image
                    src={profileImage}
                    width={500}
                    height={500}
                    alt="User Image"
                />
            </div>
            <NewTaskForm />
        </section>
    )
}

export default UserImage
