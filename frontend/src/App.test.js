import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from './App';
import Register from './components/Register';
import UpdateProduct from './components/UpdateProduct';
import UpdateUser from './components/UpdateUser';
import AddUser from './components/AddUser';
import AddProduct from './components/AddProduct';


test('renders Navbar links', () => {
  render(<App />);
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Cart")).toBeInTheDocument();
  expect(screen.getByText("WishList")).toBeInTheDocument();
});

describe('Testing Event Handlers of Components', () => {
  test('testing onChange Listeners on Regsiter.js', () => {
    render(<Register/>)
    const input = screen.getByRole('textbox');
    UserEvent.type(input, 'Testing Input');
    expect(input.value).toBe('Testing Input');
  })
  
  test('testing onChange Listeners on UpdateProduct.js', () => {
    render(<UpdateProduct/>)
    const input = screen.getByRole('textbox');
    UserEvent.type(input, 'Testing Input');
    expect(input.value).toBe('Testing Input');
  })

  test('testing onChange Listeners on UpdateUser.js', () => {
    render(<UpdateUser/>)
    const input = screen.getByRole('textbox');
    UserEvent.type(input, 'Testing Input');
    expect(input.value).toBe('Testing Input');
  })

  test('testing onChange Listeners on AddUser.js', () => {
    render(<AddUser/>)
    const input = screen.getByRole('textbox');
    UserEvent.type(input, 'Testing Input');
    expect(input.value).toBe('Testing Input');
  })

  test('testing onChange Listeners on AddProduct.js', () => {
    render(<AddProduct/>)
    const input = screen.getByRole('textbox');
    UserEvent.type(input, 'Testing Input');
    expect(input.value).toBe('Testing Input');
  })

})

