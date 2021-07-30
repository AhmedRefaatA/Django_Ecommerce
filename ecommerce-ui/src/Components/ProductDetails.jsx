import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import  { Button, Icon, Item, Container, Dimmer, Loader, Segment, Message, Grid, Card, Form, Select } from 'semantic-ui-react';
import axios from 'axios';
import { ProductDetail, localHost } from "./constant";



class ProductDetails extends Component{
    state = {
        loading: false,
        error: null,
        data: [],
        formVisable: false
    }
    componentDidMount(){
        this.handleFetchItems();
    }
    handleFetchItems = () => {
        const {match: {params} } = this.props
        this.setState({loading: true})
        axios.get(ProductDetail(params.id))
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
    handleToggleForm = () => {
        const {formVisable} = this.state;
        this.setState({
            formVisable: !formVisable
        })
    }
    handleChange = (e, {name, value}) => {
        console.log(name)
        console.log(value)
    }
    render(){
        const {data, loading, error, formVisable} = this.state;
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

                {data && 
                        <Grid columns={2} divided>
                        <Grid.Row>
                          <Grid.Column>
                            <Card
                                image= {data.image}
                                header= {data.title}
                                meta= {data.discount_price}
                                description= {
                                    <Item.Description>
                                        {data.describtion}    
                                    </Item.Description>
                                }
                                extra={
                                    <Item.Extra>
                                        <Button fluid icon labelPosition= "right" primary floated='right' onClick={this.handleToggleForm}>
                                            Add to Cart  
                                            <Icon name='cart plus' />
                                        </Button>
                                    </Item.Extra>
                                }
                            />
                            {formVisable && 
                                <Form>
                                    <Form.Field>
                                    {data.variations && 
                                        data.variations.map(v => {
                                            const name = v.name;

                                            return(<Select
                                                key= {v.id}
                                                onChange= {this.handleChange}
                                                placeholder= {`Choose a ${name}`}
                                                options=
                                                    {v.item_variations.map(item_v => {
                                                            return{
                                                                key: item_v.id,
                                                                text: item_v.value,
                                                                value: item_v.id
                                                            }
                                                    })}

                                                
                                                selection
                                            />
                                            )
                                        })
                                    }
                                    </Form.Field>
                                    <Form.Button primary>Submit</Form.Button>
                                </Form>
                            }
                            
                          </Grid.Column>
                          <Grid.Column>
                            {data.variations && 
                                data.variations.map(v => {
                                    return(
                                        <Item.Group key= {v.id}>
                                            <Item.Header as='a'>{v.name}</Item.Header>
                                            {v.item_variations.map(item_v => {
                                                return(
                                                <Item key={item_v.id}>
                                                    {item_v.attachment && 
                                                        <Item.Image size='tiny' src={`${localHost}${item_v.attachment}`} />
                                                    }
                                                    <Item.Content verticalAlign='middle'>
                                                        <Item.Header as='a'>{item_v.value}</Item.Header>
                                                    </Item.Content>
                                                </Item>
                                                );
                                            })}
                                            
                                        </Item.Group>
                                    );
                                })
                            
                            }
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    
                }
                
            </Container>
        
        );
    }
}
export default ProductDetails
