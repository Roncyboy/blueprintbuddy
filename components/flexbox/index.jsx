import styled from "styled-components";

const FlexBox = styled.div`
    display: flex;
    flex-direction: ${props => props.direction || "row"};
    justify-content: ${props => props.justify || "center"};
    align-items: ${props => props.align || "center"};
    flex-wrap: ${props => props.wrap || "nowrap"};
    flex-grow: ${props => props.grow || "0"};
    flex-shrink: ${props => props.shrink || "1"};
    flex-basis: ${props => props.basis || "auto"};
    max-width: ${props => props.maxWidth || "100%"};
    padding: ${props => props.padding || "0"};
    margin: ${props => props.margin || "0"};
`;

export default FlexBox;