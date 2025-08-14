import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

export const LoginBox = styled.div`
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  width: 380px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 1%.2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #111827;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1.5rem;

  &:hover {
    background: #1f2937;
  }
`;

export const Logo = styled.img`
  width: 180px;
  height: 70px;
  margin-bottom: 40px;
  align-items: center;
`

export const Link = styled.a`
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    } 
`

export const Paragraph = styled.p`
    text-align: start;
    font-size: 13px;
    line-height: 80%;
    font-weight: 600;
    //height: 5px;
    margin-bottom: 20px;
`
    