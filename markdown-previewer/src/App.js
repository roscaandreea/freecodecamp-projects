import React from 'react';
import './App.css';
import marked from 'marked';

const initialState =`
  This is a paragraph
  
  **This is bolded text**
  
  > Block Quotes!
  
  # Heading
  ## Heading 2
  
  - list item 1
  - list item 2
  - list item 3
  
  [Visit this webiste](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer)
  
  This is an inline \`<div></div>\`
  
  This is a block of code
  \`\`\`
    let x=10;
    let y=20;
    let t=x+y;
  \`\`\`
  
`
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      markdown: initialState
    };
    this.previewMarkdown = this.previewMarkdown.bind(this);
  }
  
  updateMarkdown = (event) => {
    this.setState({
      markdown: event.target.value
    });
  }

  previewMarkdown() {
    let markup = marked(this.state.markdown,{breaks: true});
    return { __html: markup };
  }

 
  render(){
    return(
      <div className="bid">
        <h2 className="text-center m-4"><i className="fa fa-code"></i>Convert your Markdown</h2>
        <div className="row">
          <div className="col-6">
            <h6 className="text-center">Enter your markdown here:</h6>
            <div className="toolbar tool_left">
              <h5 className="textEditor"><i className="fa fa-edit"></i>editor</h5>
            <textarea className="form-control p-2" id="editor"  value={this.state.markdown} onChange={this.updateMarkdown}></textarea>
            </div>
          </div>
          <div className="col-6">
            <h6 className="text-center">See the result:</h6>
             <div className="toolbar tool_right ">
               <h5 className="textEditor"><i className="fa fa-eye"></i>previewer</h5>
            <div dangerouslySetInnerHTML={this.previewMarkdown()} className="preview p-2" id="preview" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
