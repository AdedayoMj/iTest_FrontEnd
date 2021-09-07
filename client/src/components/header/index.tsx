import React from 'react';
import { Col, Container, Row } from 'reactstrap';

export interface IHeaderProps {
    title: string;
    color?: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const { children, title, color } = props;

    const headerStyle = {
        width: '100%',
        height: '100%',
        color: color
    };

    return (
        <header style={headerStyle}>
            <Container>
                <Row className="align-items-center text-center">
                    <Col>
                        <h1 style={{ textAlign: 'center', marginBottom: 40 }} className="display-4 text-white mt-5 mb-2">
                            {title}
                        </h1>
                        {children}
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
