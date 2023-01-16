import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IPosts } from '../models/IPosts';



interface IState{
    loading: boolean,
    post: IPosts[],
    errorMsg: string
}


const Posts: React.FC = () => {

    const [posts, setPosts ] = useState<IState>({
        loading: false,
        post: [] as IPosts[],
        errorMsg: ''
    });

    const [error, setError] = useState({});
  
    useEffect(()=>{
        setPosts({...posts, loading: true})
        axios.get('https://dummyjson.com/posts')
        .then((res) => setPosts({
            ...posts,
            loading: false,
            post: res.data.posts
        }))
        .catch(err => setPosts({
            ...posts,
            loading: false,
            errorMsg: err.message
        }))
    }, []);

const {loading, post, errorMsg } = posts;

console.log(posts.post);

  return (
    <div>
          { errorMsg && (<p>{errorMsg}</p>)}
          { loading && (<h1>loading....</h1>)}
      <ul>
      {post.length > 0 && post.map( post => {
        return <li key={post.id}>
                 <h2>{post.title}</h2>
                 <p>{post.body}</p>
                 <p>{post.userId}</p>
                 <p>{post.tags}</p>
                 <p>{post.reactions}</p>
                </li>
      })
      }

      </ul>

    </div>
  )
}

export default Posts