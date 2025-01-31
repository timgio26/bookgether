import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Homepage, Layout,Register,Login,Profile,AddBook,FindBook,FindBookAvail, OrderPage,ProfileEdit, ProtectedPage,Confirm,MyOrderLend,MyOrderRent} from './pages';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from './pages/ThemeProvider';

const queryClient = new QueryClient()

function App() {

  return (
    <ThemeProvider>

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

            <Route path="/" element={<Homepage />} />

            <Route path="findBook">
              <Route index element={<FindBook />} />
              <Route path="available" element={<FindBookAvail />} />
            </Route>

            <Route path="addbook" element={<ProtectedPage><AddBook /></ProtectedPage>} />

            <Route path="profile">
              <Route index element={<ProtectedPage><Profile /></ProtectedPage>} />
              <Route path="edit" element={<ProtectedPage><ProfileEdit /></ProtectedPage>} />
            </Route>

            <Route path='my-order'>
              <Route path='rent' element={<ProtectedPage><MyOrderRent /></ProtectedPage>} />
              <Route path="edit" element={<ProtectedPage><MyOrderLend /></ProtectedPage>} />
            </Route>

            <Route path="order/:id" element={<ProtectedPage><OrderPage /></ProtectedPage>} />
            <Route path="order/confirm" element={<ProtectedPage><Confirm /></ProtectedPage>} />
            
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App
