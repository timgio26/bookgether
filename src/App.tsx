import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Homepage, Layout,Register,Login,Profile,AddBook,FindBook,FindBookAvail} from './pages';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />

            <Route path="findBook">
              <Route index element={<FindBook />} />
              <Route path='available' element={<FindBookAvail />} />
            </Route>

            <Route path="addbook" element={<AddBook />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
