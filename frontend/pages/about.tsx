import {useEffect, useState} from 'react';

import { useSelector, shallowEqual } from 'react-redux'
import { initializeApollo } from '../lib/apollo';
import { initializeStore } from '../lib/redux';

const useUser = () => {
  return useSelector(
    (state) => ({
      posts: state.posts,
    }),
    shallowEqual
  )
}

function About() {
  const { posts } = useUser()

  console.log(posts);

  // useEffect(() => {
  //   // code to run on component mount
  // }, [])

  // const [posts, setPosts] = useState(null);

  // useEffect(async () => {
  //   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  //   const postss = await res.json()

  //   setPosts(postss)

  // }, []);


  return (
    <ul>
      {[].map((post) => (
        <li>{post.id}</li>
      ))}
    </ul>
  )

}


// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const posts = await res.json()

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }
// export async function getStaticProps(){

//   const reduxStore = initializeStore();
//   const { dispatch } = reduxStore

//   const apolloClient = initializeApollo()



//   // dispatch({
//   //   type: 'ADD_POSTS',
//   //   posts: status.posts
//   // })

//   // await apolloClient.query({
//   //   query: User_Query,
//   // })

//   return {
//     props: {
//       initialReduxState: reduxStore.getState(),
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 1,
//   }



// }
export default About
