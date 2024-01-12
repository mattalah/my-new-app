import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "Config/routes";
import { SignInPage } from "Pages/SignInPage";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css'
import { ErrorPage } from "Pages/ErrorPage";
import { useMemo } from "react";
import { ArticlePage } from "Pages/ArticlePage";
import { SharedLayout } from "Layout/SharedLayout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RegisterPage } from "Pages/RegisterPage";
import { AuthLayout } from "Layout/AuthLayout";

const queryClient = new QueryClient();

function App() {
  const routeList = useMemo(() => [{
    path: routes.articles,
    component: <ArticlePage />
  }
  ], [])
  const routeAuthList = useMemo(() => [{
    path: routes.signIn,
    component: <SignInPage />
  }, {
    path: routes.register,
    component: <RegisterPage />
  },
  ], [])
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            {routeAuthList.map(route =>
              <Route path={route.path}
                key={route.path}
                element={route.component}
              />
            )}
          </Route>
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
