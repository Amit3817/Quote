import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import Layout from "./components/layout/Layout.jsx";
import Spinner from "./components/loading/Spin.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthContext from "./store/AuthContext.jsx";
const Quotes = lazy(() => import("./pages/Quotes.jsx"));
const QuoteDetails = lazy(() => import("./pages/QuoteDetails.jsx"));
const AddQuote = lazy(() => import("./pages/AddQuote.jsx"));
const Comments = lazy(() => import("./components/comments/Comment.jsx"));
const Notfound = lazy(() => import("./pages/Notfound.jsx"));
const Auth = lazy(() => import("./pages/AuthPage.jsx"));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Router>
        <Layout>
          <Suspense fallback=<Spinner />>
            <Routes>
              <Route path="/" element={<Navigate to="/quotes" replace />} />
              {!authCtx.isLoggedIn && (
                <Route path="/auth" element={<AuthPage />} />
              )}
              <Route path="quotes" element=<Quotes /> />
              {authCtx.isLoggedIn && (
                <Route path="addquote" element=<AddQuote /> />
              )}
              <Route path="quotes/:qid" element=<QuoteDetails />>
                {authCtx.isLoggedIn && (
                  <Route path="comments" element=<Comments /> />
                )}
              </Route>

              {authCtx.isLoggedIn ? (
                <Route path="*" element={<Navigate to="./quotes" replace />} />
              ) : (
                <Route path="*" element={<Navigate to="./auth" replace />} />
              )}
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </>
  );
}

export default App;
