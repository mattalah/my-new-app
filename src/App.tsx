import { useMemo } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SignInPage } from "Pages/SignInPage";
import { ErrorPage } from "Pages/ErrorPage";
import { RegisterPage } from "Pages/RegisterPage";
import { ArticlePage } from "Pages/ArticlePage";

import { SharedLayout } from "Layout/SharedLayout";
import { AuthLayout } from "Layout/AuthLayout";

import { routes } from "Config/routes";

import './App.css'
import { ConfigPage } from "Pages/ConfigPage";

const queryClient = new QueryClient();

function App() {
  const routeList = useMemo(() => [
    {
      path: routes.articles,
      component: <ArticlePage />
    },
    {
      path: routes.configs,
      component: <ConfigPage />
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
