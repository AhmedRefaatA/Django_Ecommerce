import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import  { Button, Icon, Item, Label, Container, Dimmer, Loader, Segment, Message } from 'semantic-ui-react';
import axios from 'axios';
import { productList } from "./constant";
import { Link } from 'react-router-dom';



class Home extends Component{
    state = {
        loading: false,
        error: null,
        data: [],
    }
    componentDidMount(){
        this.handleFetchItems();
    }
    handleFetchItems = () => {
        this.setState({loading: true})
        axios.get(productList)
        .then((res) => {
            this.setState({
                loading: false,
                data: res.data,
            })
        })
        .catch(err => {
            this.setState({
                loading: false,
                error: err,
            })
        })
    }
    render(){
        const {data, loading, error} = this.state;
        return(
            <Container text style={{marginTop:'5em'}}>
                {loading && 
                        <Segment>
                            <Dimmer active inverted>
                                <Loader size='medium'>Loading</Loader>
                            </Dimmer>
                        </Segment>
                }
                
                {error && 
                    <Message negative>
                        <Message.Header>We're sorry we can't apply your submissions</Message.Header>
                        <p>{JSON.stringify(error)}</p>
                    </Message>
                }

                {data && data.map(item => {
                    return(
                        <Item.Group divided key={item.id}>  
                            <Item>
                                <Item.Image src={item.image} />
                                <Item.Content>
                                    <Link to={`product/${item.id}`}>
                                        <Item.Header as='a'>{item.title}</Item.Header>
                                    </Link>
                                    <Item.Meta>
                                        <span className='cinema'>${item.discount_price}</span>
                                    </Item.Meta>
                                    <Item.Description>{item.describtion}</Item.Description>
                                    <Item.Extra>
                                        <Button primary floated='right'>
                                            {item.label}
                                            <Icon name='right chevron' />
                                        </Button>
                                        <Label>{item.category}</Label>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    )
                })}
                
            </Container>
        
        );
    }
}
export default Home;