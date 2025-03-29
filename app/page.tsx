import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";



export default async function Home(){
  const user = await currentUser();
  
  return(
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-4">
        {/* sidebar */}
        <Sidebar user = {user}></Sidebar>
        {/* feed */}
        <Feed user={user}></Feed>
        {/* news */}
        <News></News>
      </div>
      Home 
    </div>
  )
}