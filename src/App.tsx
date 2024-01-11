import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "Config/routes";
import { SignInPage } from "Pages/SignInPage";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css'
import { ErrorPage } from "Pages/ErrorPage";
import { useMemo } from "react";
import { ArticlePage, ArticleDetailPage } from "Pages/ArticlePage";
import { SharedLayout } from "SharedLayout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const routeList = useMemo(() => [{
    path: routes.articles,
    component: <ArticlePage />,
    errorBoundary: true
  }, {
    path: `${routes.articleDetails}/:id`,
    component: <ArticleDetailPage />,
    errorBoundary: true
  },
  ], [])
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.signIn} element={<SignInPage />} />
          <Route path="*"
            element={
              <ErrorPage
                error={{
                  statusCode: "404",
                  title: "Page Not Found",
                  message: "Sorry, we couldn’t find the page you’re looking for.",
                }}
              />
            }
          />
          <Route element={<SharedLayout />}>
            {routeList.map(route =>
              <Route path={route.path}
                key={route.path}
                element={route.component}
              />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
