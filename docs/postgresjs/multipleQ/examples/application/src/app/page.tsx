import ListTasks from "@/components/listTasks"
import LoginForm from "@/components/loginForm"
import SignupForm from "@/components/singupForm"
import { NextPage } from "next"

const Page: NextPage = () => {

  return (
    <main>
      <LoginForm path="/"/>
      <ListTasks/>
    </main>
  )
}

export default Page