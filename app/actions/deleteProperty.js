'use server'
import cloudinary from '@/config/cloudinary'
import connectDB from '@/config/db'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'


async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser()
  // check is the user owns the record/listing
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }
  // lets get the ID and destructure
  const { userId } = sessionUser

  await connectDB()

  const property = await Property.findById(propertyId)

  if (!property) throw new Error('Property Not Found')

  // verify property ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized')
  }

  // lets delete the image from cloudinary
  // 1. Extract public ID from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/')
    return parts.at(-1).split('.').at(0)
  })

  // 2. Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('ADU_Rental/' + publicId)
    }
  }

  // once all checks out then we can proceed to delete the listing
  await property.deleteOne()

  revalidatePath('/', 'layout')
}

export default deleteProperty
