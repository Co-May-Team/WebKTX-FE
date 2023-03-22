/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCategories } from '~/store/categories/actions'
import { fetchTags } from '~/store/tags/actions'
import { ImagesSection, VideosSection } from './sections'
import PostsSection from './sections/PostsSection'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchCategories())
  }, [])
  return (
    <>
      {/* Hero section */}
      {/* <div>
        <HeroSection />
      </div> */}

      {/* Posts section */}
      <PostsSection />

      {/* image */}
      <ImagesSection />

      {/* Videos */}
      <VideosSection />

      {/* Google map */}
    </>
  )
}
