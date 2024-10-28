'use server'
import connectDB from '@/config/db'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function updateProperty(propertyId, formData) {
  // connect to DB
  await connectDB()

  // create a variable for sessionUser
  const sessionUser = await getSessionUser()

  // check if sessionUser exist
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  // lets get the userId from sessionUser
  const { userId } = sessionUser

  // check if the logged in user is allowed to update
  const existingProperty = await Property.findById(propertyId)

  // verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current User not allowed to change details')
  }

  // grab all the propertyData
  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: 'CA',
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities: formData.getAll('amenities'),
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  }
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  )

  revalidatePath('/', 'layout')

  redirect(`/properties/${updatedProperty._id}`)
}

export default updateProperty
