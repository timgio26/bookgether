import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Homepage, Layout,Register,Login,Profile,AddBook,FindBook,FindBookAvail,
  OrderPage,ProfileEdit, ProtectedPage,Confirm,MyOrderLend,MyOrderRent, MyOrderLayout,EditBook} from './pages';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from './pages/ThemeProvider';
import { NoMatch } from './pages/NoMatch';

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
            <Route path="editbook" element={<ProtectedPage><EditBook /></ProtectedPage>} />

            <Route path="profile">
              <Route index element={<ProtectedPage><Profile /></ProtectedPage>} />
              <Route path="edit" element={<ProtectedPage><ProfileEdit /></ProtectedPage>} />
            </Route>

            <Route path='my-order' element={<ProtectedPage><MyOrderLayout/></ProtectedPage>}>
              <Route path='rent' element={<MyOrderRent />} />
              <Route path="lend" element={<MyOrderLend />} />
            </Route>

            <Route path="order/:id" element={<ProtectedPage><OrderPage /></ProtectedPage>} />
            <Route path="order/confirm" element={<ProtectedPage><Confirm /></ProtectedPage>} />
            
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NoMatch/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App
