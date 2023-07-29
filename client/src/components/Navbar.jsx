import { Badge, Button } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { persistor } from "../redux/store";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 24px;
  ${mobile({ fontSize: "18px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Btn = styled.button`
  background-color: #c5c4c4;
  border-radius: 5px;
  height: 30px;
  border: none;
  &:hover,
  &:focus{
    background-color: #7e7e7e;
  }
`;
const MenuItem = styled.div`
  font-size: 14px;
  color: black;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser)
  const logout = () => {
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
  }
  return (
    <Container>
      <Wrapper>
        {user ? <>
          <Left>
            <UserName>
              {user.username}
            </UserName>
          </Left>
          <Center>
            <Link style={{ textDecoration: 'none' }} to="/">
              <Logo>ULI</Logo>
            </Link>
          </Center>
          <Right>
            <Btn onClick={() => {
              logout()
              window.location.reload()
            }}>
              <MenuItem>Sign out</MenuItem>
            </Btn>
            <Link style={{ textDecoration: 'none' }} to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </> :
          <>
            <Left>
            </Left>
            <Center>
              <Link style={{ textDecoration: 'none' }} to="/">
                <Logo>ULI</Logo>
              </Link>
            </Center>
            <Right>
              <Link style={{ textDecoration: 'none' }} to="/register">
                <MenuItem>Register</MenuItem>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/login">
                <MenuItem>Sign in</MenuItem>
              </Link>
            </Right>
          </>
        }
      </Wrapper>
    </Container>
  );
};

export default Navbar;
