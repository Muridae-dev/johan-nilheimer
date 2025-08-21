import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0]{
  title,
  homePagePhoto{
    ...,
    asset->{
      url
    },
    caption,
    alt
  }
}`);

export const ALBUMS_QUERY_ALL = defineQuery(`*[_type == "album"]{
  title,
  slug,
  albumImage{
    ...,
    asset->{
      url
    },
    alt
  }
}`);

export const ALBUM_QUERY_SLUG =
  defineQuery(`*[_type == "album" && slug.current == $slug][0]{
  title,
  description,
  photos[]{
    ...,
    asset->{
      url
    },
    caption,
    alt
  }
}`);
