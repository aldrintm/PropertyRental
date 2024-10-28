'use server'

import connectDB from '@/config/db'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'

async function bookmarkProperty(propertyId) {
  // connect to DB
  await connectDB()

  // get sessionUser from login
  const sessionUser = await getSessionUser()

  // lets validate sessionUser
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required')
  }

  // destructure userId from sessionsUser
  const { userId } = sessionUser

  // lets get user from our database
  const user = await User.findById(userId)

  // lets check if this property is already in the user bookmark
  let isBookmarked = user.bookmarks.includes(propertyId)

  let message

  if (isBookmarked) {
    // if already bookmarked then remove
    user.bookmarks.pull(propertyId)
    message = 'Bookmarks Removed'
    isBookmarked = false
  } else {
    // if not bookmarked then add
    user.bookmarks.push(propertyId)
    message = 'Bookmarks Added'
    isBookmarked = true
  }

  // add this to the database
  await user.save()
  revalidatePath('/properties/saved', 'page')
  return {
    message,
    isBookmarked,
  }
}
export default bookmarkProperty
