import { exportData } from "../../../utils/FairyWynnUtil";

export default function ExportButton() {


    const doCopy = text => {
        // 흐음 1.
        if (navigator.clipboard) {
          // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
          navigator.clipboard
            .writeText(text)
            .then(() => {
              alert("copy to clipboard!");
            })
            .catch(() => {
              alert("please export again");
            });
        } else {
          // 흐름 2.
          if (!document.queryCommandSupported("copy")) {
            return alert("this browser doesn't support clipboard");
          }
    
          // 흐름 3.
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.top = 0;
          textarea.style.left = 0;
          textarea.style.position = "fixed";
    
          // 흐름 4.
          document.body.appendChild(textarea);
          // focus() -> 사파리 브라우저 서포팅
          textarea.focus();
          // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
          textarea.select();
          // 흐름 5.
          document.execCommand("copy");
          // 흐름 6.
          document.body.removeChild(textarea);
          alert("copy to clipboard!");
        }
      };

    return (
        <div className="exportbutton" onClick={() => doCopy(exportData())}>
            Export Build
        </div>
    )
}