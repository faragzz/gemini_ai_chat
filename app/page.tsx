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
    <div>
        {/*<NavBar/>*/}
        <div className="fixed z-10 w-full">
            <NavBarU/>
        </div>
        {/*contacts*/}
      <div className="flex pt-20">
        {/*<SideBar/>*/}
        {/*chat*/}
        <Chat/>
      </div>
    </div>
  );
}
