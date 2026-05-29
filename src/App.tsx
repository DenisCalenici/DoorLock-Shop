import Layout from "./components/Layout/Layout";
import "./App.css";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="App">
      <Layout title="Магазин">
        <Main />
      </Layout>
    </div>
  );
}

export default App;
