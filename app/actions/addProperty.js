'use server'
import connectDB from '@/config/db'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import cloudinary from '@/config/cloudinary'

// this action is added to the form to perform tasks
async function addProperty(formData) {
  // connect to DB
  await connectDB()

  // create a variable for sessionUser
  const sessionUser = await getSessionUser()

  // check if sessionUser exist
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  //lets get the userId from sessionUser
  const { userId } = sessionUser

  // access all values from amenities and images
  const amenities = formData.getAll('amenities')

  // check input to match names on each item for images
  const images = formData.getAll('images').filter((image) => image.name !== '')
  // .map((image) => image.name) - this was pulling images from the public folder now we are using Cloudinary so this is changed to secureUrls

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
    amenities,
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
    // images (this images is also taken out due to Cloudinary; we will be adding it directly to DB below)
  }
  //  console.log(propertyData)

  // lets workout all our TOBESAVED images here
  const imageUrls = []
  // loop over all our image file and convert to base64
  // we still have our const images from above holding images from the form
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer()
    const imageArray = Array.from(new Uint8Array(imageBuffer))
    const imageData = Buffer.from(imageArray)

    // convert imageData to base64
    const imageBase64 = imageData.toString('base64')

    // make request to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        // pass an object to specify folder
        folder: 'ADU_Rental',
      }
    )

    // lets update our imageUrls
    imageUrls.push(result.secure_url)
  }

  // add the images to the propertyData object
  propertyData.images = imageUrls

  // lets check the server to see all items uploaded to the DB
  console.log(propertyData)

  // lets plug all the date using the property model
  const newProperty = new Property(propertyData)
  // save it in our DB
  await newProperty.save()

  // this will clear cached data in our form/memory
  revalidatePath('/', 'layout')

  // redirect to newly created property page details
  redirect(`/properties/${newProperty._id}`)
}

export default addProperty
