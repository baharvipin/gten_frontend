import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import utils from '../../utils/utils';


import './GetImage.scss';

class GetImage extends Component {
    constructor() {
        super();
        this.state={}
    }

    componentDidMount() {
        // axios
        //   .get('https://api.imgur.com/3/image/Z6i97xY')
        //   .then(data => {
        //     console.log('Got data', data);
        //   })
        //   .catch(error => {
        //     console.log('Error', error);
        //   });
      }
 
      // start getter
      getImageData(){
          const {data} = this.state;
          if(
              utils.isDataEmpty(data) ||
              utils.isDataEmpty(data.data) ||
              utils.isDataEmpty(data.data.data)
          ){
              return {}
          }
          return data.data.data;
      }


      // Handler function start 

      handleForm = (name, value) => {
        this.setState({
          [name]: value
        });
        console.log('this.state', this.state);
      };

      
      handleSubmit = e => {
        e.preventDefault(); 

        const {imageURL }= this.state;

        axios
        .get(`https://api.imgur.com/3/image/${imageURL}`)
        .then(data => {
          console.log('Got data', data);
          this.setState({
              data: data
          })
        })
        .catch(error => {
          console.log('Error', error);
        });
      };


      handleComments = ()=>{
        const {imageURL }= this.state;

        axios
        .get(`https://api.imgur.com/3/gallery/${imageURL}/comments`)
        .then(data => {
          console.log('Got comments  ', data);
          this.setState({
              comments: data.data.data
          })
        })
        .catch(error => {
          console.log('Error', error);
        });
      }

      // handler function end  

    renderImageUrlInput() {
        const formField = [
          {
            controlId: 'formBasicImage',
            type: 'string',
            placeholder: 'Enter image Id*',
            stateName: 'imageURL'
          }
        ];
        return (
          <Form noValidate onSubmit={e => this.handleSubmit(e)}>
            {formField.map((item, index) => {
              return (
                <Form.Group controlId={item.controlId} key={'str_' + index}>
                  <Form.Control
                    type={item.type}
                    placeholder={item.placeholder}
                    onChange={e => this.handleForm(item.stateName, e.target.value)}
                  />
                </Form.Group>
              );
            })}
            <Button variant="primary" type="submit">
               Submit
            </Button>
          </Form>
        );
      }
    
    renderImage(){
        const data = this.getImageData();
        const comments = this.state.comments;
          return (
              <div className="image-layout"> 
               {
                   !utils.isDataEmpty(data)&&
               <div>
                  <Image src={data.link} rounded />
                  {
                       !utils.isDataEmpty(comments)&&
                       comments.map((item , index)=>{
                           return(
                               <ul key={`comment-${index}`}>
                                   <li>{item.comment}</li>
                               </ul>
                           );
                       })
                  }
                  <div className="comments">
                    <Button variant="primary" type="submit" onClick={()=> this.handleComments()}>
                        Show Comments
                    </Button>
                  </div>
               </div>
               }
              </div>
          );
      }

    render() {
        return (
            <div className="iamge-url">
                <h2>Enter your Imgur image ID</h2>
                {this.renderImageUrlInput()}
                {this.renderImage()}
            </div>
        );
    }
}

export default GetImage;