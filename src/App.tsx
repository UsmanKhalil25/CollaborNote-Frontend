import { Button } from "./components/ui/button";

function App() {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Button variant={"default"} onClick={handleClick}>
          Click me
        </Button>
      </div>
    </>
  );
}

export default App;
