import Image from 'next/image'
import connectDB from '@/config/db'
import Link from 'next/link'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import profileDefault from '@/assets/images/profile.png'
import ProfileProperties from '@/components/ProfileProperties'
import { convertToSerializeableObject } from '@/utils/convertToObject'

const ProfilePage = async () => {
  await connectDB()

  // get session
  const sessionUser = await getSessionUser()

  // destructure the "userId" from sessionUser
  const { userId } = sessionUser

  // validate if there's no user
  if (!userId) {
    throw new Error('User id is required')
  }

  // now lets do the properties area; but since we have an toJSON server error then we will need to change this along with converToObject function
  // const properties = await Property.find({ owner: userId }).lean()
  // console.log(properties)

  const propertiesDocs = await Property.find({ owner: userId }).lean()
  // have to use .map due to the number of properties in the owner listing
  const properties = propertiesDocs.map(convertToSerializeableObject)

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={sessionUser.user.image || profileDefault}
                  alt='User'
                  width={200}
                  height={200}
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span>
                {sessionUser.user.name}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span>
                {sessionUser.user.email}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
