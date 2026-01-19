import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={() => alert("Hello!")}>Hello React!</Button>
    </div>
  );
}

export default App;
