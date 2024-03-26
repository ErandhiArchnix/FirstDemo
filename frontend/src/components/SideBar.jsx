import { AiOutlineDashboard } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { SiGooglechat } from "react-icons/si";
// import { TbWorld } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo.png";
import {
  BottomSection,
  Container,
  Icon,
  Link,
  LinkText,
  Logo,
  LogoContainer,
  LogoutBtn,
  SidebarContainer,
  StyledLink,
  TopSection,
} from "../styles/componentStyles/SideBarStyles";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Sidebar({ setQuery }) {
  const handleClick = (name) => {
    console.log(name);
    setQuery(name);
  };

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      path: "/find",
      name: "Find",
      icon: <ImBooks />,
    },
    {
      path: "/timeline",
      name: "Timeline",
      icon: <SiGooglechat />,
    },
  ];

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/api/auth/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <SidebarContainer>
        <TopSection>
          <NavLink to="/dashboard">
            <LogoContainer>
              <Logo src={logo} alt="logo" />
            </LogoContainer>
          </NavLink>
        </TopSection>
        <Link>
          {menuItem.map((item, index) => (
            <StyledLink
              to={item.path}
              key={index}
              className="linkItem"
              activeclassname="active"
              onClick={() => handleClick(item.name)}

            >
              <Icon>{item.icon}</Icon>
              <LinkText>{item.name}</LinkText>
            </StyledLink>
          ))}
        </Link>
        <BottomSection>
          <NavLink to="/" style={{textDecoration:'none'}}>
            <LogoutBtn
              onClick={handleLogout}
            >
              <Icon>
                <BiLogOut />
              </Icon>
              <LinkText>Log Out</LinkText>
            </LogoutBtn>
          </NavLink>
        </BottomSection>
      </SidebarContainer>
    </Container>
  );
}

export default Sidebar;