import Navbar from '@/components/admin/Navbar'
import React from 'react'

const Index = () => {
  return (
   <>
       <style global jsx >{`
        .Navbar{
        display:none;
        }
        .Footer{
        display:none;
        }
      `}</style>
      <Navbar/>
    </> 
  )
}

export default Index
