import { Bell, BriefcaseBusiness, Home, MessageCircleMore, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

//TODO: method-1 To define a type
// type NAVITEMS = {
  //   src: string,
  //   icon: React.ReactNode,
  //   text: string,
  // }
  
  //TODO: method-2 To define a type
interface NAVITEMS  {
  src: string,
  icon: React.ReactNode,
  text: string,
}

const navItems: NAVITEMS[] = [
  {
    src: "/home",
    icon: <Home />,
    text: "Home",
  },
  {
    src: "/networks",
    icon: <User />,
    text: "My Network",
  },
  {
    src: "/job",
    icon: <BriefcaseBusiness />,
    text: "Jobs",
  },
  {
    src: "/message",
    icon: <MessageCircleMore />,
    text: "Messages",
  },
  {
    src: "/notification",
    icon: <Bell/>,
    text: "Notification",
  },
]

const NavItems = () => {
  return (
    <div className='flex gap-5'>
      {
        navItems.map((item, index) =>{
          return(
            <div key={index} className='flex flex-col items-center cursor-pointer text-[#666666] hover:text-black'>
                <span>{item.icon}</span>
                <Link className='text-xs' href={item.src}>{item.text}</Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default NavItems
