import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IPosts, IState, Tags } from '../models/IPosts';
import './Posts.css'


const Posts: React.FC = () => {

    const [posts, setPosts ] = useState<IState>({
        loading: false,
        post: [] as IPosts[],
        errorMsg: ''
    });

    const [isActive, setIsActive] = useState<string>();
  
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

 const toggleAccordion = (el: string) => {
    if(el === isActive) {
      setIsActive('')
      return
    }
    setIsActive(el)
 }

  return (
    <div>
      {errorMsg && (<p>{errorMsg}</p>)}
      {loading && <h1>Loading... </h1>}
      <h1 className='heading__1'> Posts </h1>
      {Object.keys(Tags).map((el, index) => {
        
        
        return (<>  
        <section key={index}>
          <div className='title__tab' onClick={() => toggleAccordion(el)}>
          <h2 className='heading__2'>{el[0].toUpperCase() + el.slice(1)}</h2>
          <div className='plus__minus'>{isActive === el ? (
              <span>-</span>
          ) : (
            <span>+</span>
          )}</div>
          </div>
          <ul key={index} className={isActive === el ? 'card__grid' : 'hidden'}> 
          {post.length > 0 && post.map( post => {
            if(post.tags.find( tag => el === tag)) { 
              return   <li key={post.id} className='card'>
                          <h3 className='heading__3'>{post.title}</h3>
                          <p className='parragraph'>{post.body}</p>
                          <p className='parragraph'>userId: {post.userId}</p>
                          <p className='parragraph'>tags: {post.tags.join(', ')}</p>
                          <p className='parragraph'>reactions: {post.reactions}</p>
                          </li> 
                  }})
          }
          </ul> 
        </section>  
        </>)
      })}

    </div>
  )
}

export default Posts

