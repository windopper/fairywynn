import AddToBuild from "./AddToBuild";
import ItemDetails from "./ItemDetails";
import './ItemButton.scss'

export default function ItemButtonContainer(props) {
    return (
        <div className="itembuttoncontainer">
            <AddToBuild data={props.data}/>
            <ItemDetails />
        </div>
    )
}