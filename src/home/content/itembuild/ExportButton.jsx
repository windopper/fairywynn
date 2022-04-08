import { exportData } from "../../../utils/FairyWynnUtil";

export default function ExportButton() {
    return (
        <div className="exportbutton" onClick={() => console.log(exportData())}>
            Export Build
        </div>
    )
}