import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const PageNotFound: React.FunctionComponent = () => {
    const headerStyle = {
        width: '100%',
        height: '100%'
    };

    return (
        <header style={headerStyle}>
            <Container>
                <Row className="align-items-center text-center">
                    <Col>
                        <h1 style={{ textAlign: 'center', marginBottom: 40, fontSize: 100 }} className="display-4 text-white mt-5 mb-2">
                            404
                        </h1>
                        <p style={{ textAlign: 'center', fontSize: 25 }}>Oops!!!. Page you are looking for does not exit</p>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default PageNotFound;
