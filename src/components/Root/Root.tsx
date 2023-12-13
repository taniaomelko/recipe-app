import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export default function Root() {
  return (
    <main>
      <Header />
      <Outlet/>
    </main>
  )
}
