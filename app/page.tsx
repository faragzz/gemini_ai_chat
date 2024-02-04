import styles from './page.module.css';
import NavBar from './components/NavBar'
import SideBar from "./components/SideBar";
import Chat from "./components/chat";
import NavBarU from "./components/NavBarU";

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="h-screen" >

        <div className="fixed z-10 w-full">
            <NavBarU/>
            {/*<NavBar/>*/}
        </div>
        {/*contacts*/}
      <div className="flex py-14 h-screen bg-gray-700">
        {/*<SideBar/>*/}
        {/*chat*/}
        <Chat/>
      </div>
    </div>
  );
}
