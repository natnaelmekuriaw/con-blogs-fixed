import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./App.css";
import Navbar from "./features/components/layout/Navbar";
import Home from "./features/components/blog/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Create from "./features/components/blog/Create";
import BlogDetail from "./features/components/blog/BlogDetail";
import PageNotFound from "./features/components/blog/PageNotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
