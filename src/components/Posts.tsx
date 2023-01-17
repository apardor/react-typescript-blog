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
      <h1 className='heading__1'> Posts </h1>
      {Object.keys(Tags).map(el => {
        
        
        return (<>  
        <section>
          <h2  className='heading__2' onClick={() => toggleAccordion(el)} >{el[0].toUpperCase() + el.slice(1)}</h2>
          
          
          <ul className={isActive === el ? 'card__grid' : 'hidden'}> 

          {post.length > 0 && post.map( post => {
            
            if(post.tags.find( tag => el === tag)) { 
              
              return   <li key={post.id} className='card'>
                          <h3 className='heading__3'>{post.title}</h3>
                          <p>{post.body}</p>
                          <p>{post.userId}</p>
                          <p>tags: {post.tags.join(', ')}</p>
                          <p>{post.reactions}</p>
                          </li> 
                  }

              }
            )
          }
        
          </ul> 
        

        </section>  
        </>)
      } )}
    </div>
  )
}

export default Posts

