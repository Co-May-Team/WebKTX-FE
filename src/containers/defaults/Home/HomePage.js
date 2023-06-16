/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Motion from "~/components/Motion"
import SeoHelmet from "~/components/SeoHelmet"
import { fetchCategories } from "~/store/categories/slice"
import { fetchTags } from "~/store/tags/slice"

const PostsSection = React.lazy(() => import("./PostsSection"))
const ImagesSection = React.lazy(() => import("./ImagesSection"))
const VideosSection = React.lazy(() => import("./VideosSection"))

export default function HomePage() {
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
