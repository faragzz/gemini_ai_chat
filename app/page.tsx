import styles from '../page.module.css';
import NavBar from '../components/NavBar'
import SideBar from "../components/SideBar";
import Chat from "../components/chat";
const Index = ()=> {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <NavBar/>
        {/*contacts*/}
      <div className="flex">
        <SideBar/>
        {/*chat*/}
        <Chat/>
      </div>
    </div>
  );
}
export default Index;