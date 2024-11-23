import { MainMenu } from "@excalidraw/excalidraw";

export default function ExcalidrawMainMenu() {
  return (
    <MainMenu>
      <MainMenu.DefaultItems.LoadScene />
      <MainMenu.DefaultItems.SaveToActiveFile />
      <MainMenu.DefaultItems.Export />
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
    </MainMenu>
  );
}
