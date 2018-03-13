"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component {
    componentDidMount(){
        //Dispatch an action
        this.props.getBooks();
    }
    render () {
        const booksList = this.props.books.map(function(booksArray){
            return (
               <Col xs={12} sm ={6} md={4} key={booksArray._id}>
                    <BookItem
                        _id = {booksArray._id}
                        title = {booksArray.title}
                        description = {booksArray.description}
                        images = {booksArray.images}
                        price = {booksArray.price}/>
               </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={6000} height={4000} alt="6000x4000" src="/images/home1.JPG" />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={6000} height={4000} alt="6000x4000" src="/images/home2.JPG" />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row>
                    <Cart/>
                </Row>
                <Row style={{marginTop:'15px'}}>
                    {booksList}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
   return bindActionCreators({getBooks:getBooks}, dispatch) 
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);