import PropTypes from "prop-types";
import {ContainerButton } from "./styles";

export function Button({children, ...props}){
    return <ContainerButton type="submit" {...props}>{children}</ContainerButton>;
}

Button.propTypes ={
    children: PropTypes.string,
}