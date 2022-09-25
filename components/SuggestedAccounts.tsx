import React,{useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';

const SuggestedAccounts = () => {
  const {fetchAllUsers, allUsers} = useAuthStore();
  useEffect(()=>{
    fetchAllUsers()
  },[fetchAllUsers]);
  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Account</p>

      <div>
        {allUsers.slice(0,5).map((user:IUser)=>(
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>

              {/* user image */}
              <div className='w-8 h-8'>
                <Image 
                src={user.image}
                width={34}
                height={34}
                className="rounded-full"
                alt="user profile"
                layout='responsive'>
                </Image>
              </div>
              {/* user name */}
              <div className='hidden xl:block'>
                <p className='gap-1 items-center text-md font-bold text-primary lowercase'>{user.userName}</p>
              </div>
              <div className='hidden xl:block text-blue-400'><GoVerified /></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts