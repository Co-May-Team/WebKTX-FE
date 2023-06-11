/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import { fetchCategories } from "~/store/categories/actions"
import { fetchTags } from "~/store/tags/actions"

const PostsSection = React.lazy(() => import("./sections/PostsSection"))
const ImagesSection = React.lazy(() => import("./sections/ImagesSection"))
const VideosSection = React.lazy(() => import("./sections/VideosSection"))

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchCategories())
  }, [])
  return (
    <Motion>
      <SeoHelmet title='Trang chủ' />
      {/* Hero section */}
      {/*
        <HeroSection />
      */}

      {/* Posts section */}
      <PostsSection />

      {/* image */}
      <ImagesSection />

      {/* Videos */}
      {/* <VideosSection /> */}
    </Motion>
  )
}
