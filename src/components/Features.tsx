import React from 'react'
import FeaturesCard from './FeaturesCard'

const data=[
    {
        img:"/feature/sls.png",
        title:"SLS Free",
        desc:"SLS Free"
    },
    {
        img:"/feature/fda.png",
        title:"FDA Approved",
        desc:"Natural and organic products",
    },
    {
        img:"/feature/dermo.png",
        title:"Lab Tested",
        desc:"Safe Products",
    },
    {
        img:"/feature/plastic.png",
        title:"Plastic Free",
        desc:"Environmental Friendly",
    }
]
const Features = () => {
  return (
    <div className='container pt-16'>
        <div className='grid md:grid-cols-3 gap-y-8 lg:gap-4 lg:grid-cols-4 gap-4'>
            {data.map(item=><FeaturesCard key={item.title} img={item.img} title={item.title} desc={item.desc}/>)}
        </div>
    </div>
  )
}

export default Features