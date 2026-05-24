import React from 'react'
import FeaturesCard from './FeaturesCard'

const data = [
    {
        img: "/feature/sls.png",
        title: "SLS Free",
        desc: "Safe & clean formula"
    },
    {
        img: "/feature/fda.png",
        title: "FDA Approved",
        desc: "Natural & organic products",
    },
    {
        img: "/feature/dermo.png",
        title: "Lab Tested",
        desc: "Safe & dermatologist certified",
    },
    {
        img: "/feature/plastic.png",
        title: "Plastic Free",
        desc: "Eco-friendly packaging",
    }
]

const Features = () => {
  return (
    <section className='container pt-16 relative'>
        <div className='glass-card rounded-3xl border border-white/5 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-xl shadow-black/40'>
            {data.map(item => (
                <FeaturesCard 
                    key={item.title} 
                    img={item.img} 
                    title={item.title} 
                    desc={item.desc}
                />
            ))}
        </div>
    </section>
  )
}

export default Features