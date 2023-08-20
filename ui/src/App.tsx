import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./features/components/blog/Home";
import Navbar from "./features/components/layout/Navbar";

import BlogDetail from "./features/components/blog/BlogDetail";
import Create from "./features/components/blog/Create";
import PageNotFound from "./features/components/blog/PageNotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<Create />} />
            <Route path="blogs/:id/*" element={<BlogDetail />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/test" element={<p>Test page</p>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
